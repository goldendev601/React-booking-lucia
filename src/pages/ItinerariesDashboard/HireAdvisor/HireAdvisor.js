import { useEffect, useState } from 'react';
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { Button } from "@core/components";
import { useDispatch, useSelector } from "react-redux";
import { Cancel } from "iconoir-react";
import {useSnackbar} from 'react-simple-snackbar'
import { makeStyles } from "@material-ui/core/styles";
import { advisorRequestsHire, clearAdvisorId, clearStripeKey, clearState, itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import { deleteRequest } from "redux/features/request/requestSlice";
import { convertDate, convertDateToTime } from "utils";
import RequestType from "./RequestType";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import RequestContent from "./RequestContent";
import AdvisorPay from "./AdvisorPay";
import RequestSummary from "./RequestSummary";
import Final from "./Final";
import { useFormik } from "formik";
import * as yup from "yup";
import {useLocation} from 'react-router-dom'
import {
    dialogFormsStateSelector,
    setItineraryFormOpen,
    setHireCopilotFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {createErrorMessage} from "../../../utils";


const validationSchema = yup.object({
    requestTitle: yup
        .string('Enter request title')
        .required('Request title is required'),
    tasks: yup.array()
        .of(
            yup.object().shape({
                advisorRequestTypeId: yup.string().required('You should select at least a task'),
            })
        ),
});


export const HireAdvisorContainer = styled.div`
    position: fixed;
    bottom: 0;
    right: 10px;
    width: 492px;
    background: #FFFFFF;
    box-shadow: 0px 24px 34px rgba(0, 0, 0, 0.35);
    height: calc(100% - 75px);
    display: flex;
    overflow: hidden;
    flex-direction: column;
`;

export const HireAdvisorContainerHide = styled.div`
    position: fixed;
    bottom: 0;
    right: 10px;
    width: 492px;
    height: 55px;
    background: #FFFFFF;
    box-shadow: 0px 24px 34px rgba(0, 0, 0, 0.35);
`;

export const HireAdvisorTitleContainer = styled.div`
    width: 492px;
    height: 55px;
    background: #FFFFFF;    
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    padding-left: 27px;
    position: relative;
    z-index: 1;
    &:hover {
        cursor: pointer;
    }
`;

export const HireAdvisorMainContentContainer = styled.div`
    width: 492px;
    background: #FFFFFF;
    padding: 24px;
    height: 94%;
    overflow-y: auto;
`;

export const HireAdvisorStepContainer = styled.div`
    width: 492px;
    background: #FFFFFF;    
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;

    padding: 24px;

    & > div .step {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        border: 1px solid #BA886E;
        color: #BA886E;
        background: #FFF;
        z-index: 2;

        margin-bottom: 12px;
    }

    & > div {
        width: 64px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    & > div.active .step {
        background: #BA886E;
        color: #fff
    }

    &:before {
        content: "";
        position: absolute;
        top: 42px;
        left: 48px;
        right: 48px;
        height: 0px;
        border-top: 1px solid #BA886E;
    }
`;

const HireAdvisor = ({ showHireAdvisor, setShowHireAdvisor }) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const locationPath = location.pathname;

    const { hireCopilotFormOpen } = useSelector(dialogFormsStateSelector);
    const {hiredError, hiredSuccess, errorMessage, advisorRequestId} = useSelector(itinerariesSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const [stepIndex, setStepIndex] = useState(0);

    const closeAdvisorContainer = () => {
        if (step === 'summary') {
            dispatch(deleteRequest({advisorId: advisorRequestId}));
        }
        setShowHireAdvisor(false);
        setStep("requestType");
        dispatch(clearStripeKey())
        dispatch(clearAdvisorId())
        dispatch(setHireCopilotFormOpen(false))
    }
    const openAdvisorContainer = () => setShowHireAdvisor(true);
    const [step, setStep] = useState("requestType");
    
    useEffect(() => {
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        if (clientSecret) {
            setStep('advisorPay')
            setShowHireAdvisor(true)
        } else {
            dispatch(clearStripeKey())
            dispatch(clearAdvisorId())
        }
    }, [])

    useEffect(() => {
        if (hiredError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState())
        }
        if (hiredSuccess) {
            openSnackbarSuccess('A new request for hire copilot has been created successfully!');
            dispatch(clearState())
        }
    }, [hiredError, hiredSuccess]);

    const formik1 = useFormik({
        initialValues: {
            requestTitle: '',
            copilotId: 0,
            notes: '',
            attachments: [],
            tasks: [],
            deadlineDay: undefined,
            deadlineTime: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            if (values && values.copilotId > 0) {
                formData.append('copilot_id', values.copilotId)
            }
            if (values && values.deadlineDay) {
                formData.append('deadline_day', convertDate(values.deadlineDay))
            }
            if (values && values.deadlineTime) {
                formData.append('deadline_time', convertDateToTime(values.deadlineTime))
            }
            formData.append('request_title', values.requestTitle)
            formData.append('notes', values.notes)
            for (const file of Array.from(values.attachments)) {
                formData.append('attachments[]', file)
            }
            var tasks = values.tasks;
            for(let index = 0; index < tasks.length; index ++ ) {
                formData.append(`tasks[${index}][advisor_request_type_id]`, tasks[index].advisorRequestTypeId)
                let taskExplanations = tasks[index].explanation;
                if (taskExplanations && taskExplanations.length > 0) {
                    for(let k = 0; k < taskExplanations.length; k ++ ) {
                        formData.append(`tasks[${index}][explanation][${k}]`, taskExplanations[k])
                    }
                }
            }
            dispatch(advisorRequestsHire(formData));
        }
    });

    const useStyles = makeStyles({
        hireadvisorTitle: {
            color: '#242424',
            fontSize: 17,
            fontWeight: '600',
            fontFamily: 'Raleway'
        }
    });

    const classes = useStyles();

    return (
        <>
            {
                (showHireAdvisor || hireCopilotFormOpen) && (
                    <HireAdvisorContainer>
                        <HireAdvisorTitleContainer>
                            <Typography component="h6" className={classes.hireadvisorTitle}>Hire CoPilot</Typography>
                            <Button
                                transparent={true}
                                onClick={closeAdvisorContainer}
                                iconstart={<Cancel width={'20px'} color={'#000'} />}
                                style={{ width: 20, marginLeft: "auto" }}
                            >
                            </Button>
                        </HireAdvisorTitleContainer>
                        <HireAdvisorStepContainer>
                            <div className={stepIndex >= 0 ? "active" : ""}>
                                <div className="step">1</div>
                                <p>Select Your CoPilot</p>
                            </div>
                            <div className={stepIndex >= 1 ? "active" : ""}>
                                <div className="step">2</div>
                                <p>Request Details</p>
                            </div>
                            <div className={stepIndex >= 2 ? "active" : ""}>
                                <div className="step">3</div>
                                <p>Summary</p>
                            </div>
                            <div className={stepIndex >= 3 ? "active" : ""}>
                                <div className="step">4</div>
                                <p>Payment</p>
                            </div>
                        </HireAdvisorStepContainer>
                        <HireAdvisorMainContentContainer>
                            <form id="hireAdvisor" onSubmit={formik1.handleSubmit}>
                                {
                                    step === 'requestType' && (
                                        <RequestType stepChange={setStep} stepIndexChange={setStepIndex} formik={formik1} />
                                    )
                                }
                                {
                                    step === 'requestContent' && (
                                        <RequestContent stepChange={setStep} stepIndexChange={setStepIndex} formik={formik1} />
                                    )
                                }
                            </form>
                            {
                                step === 'summary' && (
                                    <RequestSummary stepChange={setStep} stepIndexChange={setStepIndex}/>
                                )
                            }
                            {
                                step === 'advisorPay' && (
                                    <AdvisorPay stepChange={setStep} stepIndexChange={setStepIndex} locationPath={locationPath}/ >
                                )
                            }
                            {
                                step === 'final' && (
                                    <Final />
                                )
                            }
                        </HireAdvisorMainContentContainer>
                    </HireAdvisorContainer>
                )
            }

            {
                locationPath === '/advisor-requests' && !showHireAdvisor && (
                    <HireAdvisorContainerHide onClick={openAdvisorContainer}>
                        <HireAdvisorTitleContainer>
                            <Typography component="h6" className={classes.hireadvisorTitle}>Hire CoPilot</Typography>
                        </HireAdvisorTitleContainer>
                    </HireAdvisorContainerHide>
                )
            }
        </>
    )
}

export default HireAdvisor;