import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {ItineraryFormContainer, TimePickerField, DatePickerField} from "@core/components";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { requestSelector } from "redux/features/request/requestSlice";
import {useSelector} from "react-redux";

const StyledP = styled.p`
  font-size: 12px; 
  text-align: center;
`;

const StyledP2 = styled.p`
  font-size: 12px; 
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #242424;
`;

const Browser = ({formik}) => {

    const { selectedMyRequest } = useSelector(requestSelector);

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const useStyles = makeStyles({
        contentDiv: {
            width: '100%',
            marginBottom: '20px'
        },
        validationErrorNotification: {
            fontStyle: 'italic',
            color: 'red',
            marginTop: '5px !important',
            marginBottom: '5px !important',
            fontSize: '12px'
        },
    });

    const classes = useStyles();

    return (
        <ItineraryFormContainer>
            <div className={classes.contentDiv}>
                <StyledP2>
                    If the request is not completed by this date, then it will be automatically cancelled. Please note that concierges will do their best to get requests done quickly, but it is ultimately determined by supplier response times.
                </StyledP2>
            </div>
            <Grid container spacing={4} justify="space-between">
                {
                    (selectedMyRequest && selectedMyRequest.deadlineLocale) ? (
                        <Grid item xs={6}>
                            <DatePickerField
                                name="deadlineDate"
                                placeholder="Select Date"
                                formik={formik}
                                width={'100%'}
                                startDate={ new Date(selectedMyRequest.deadlineLocale) }      
                            />
                            {formik.touched.deadlineDate && formik.errors.deadlineDate && <div className={classes.validationErrorNotification}>deadline date is required</div>}
                        </Grid>
                    ) : (
                        <Grid item xs={6}>
                            <DatePickerField
                                name="deadlineDate"
                                placeholder="Select Date"
                                formik={formik}
                                width={'100%'}
                                startDate={tomorrow}      
                            />
                            {formik.touched.deadlineDate && formik.errors.deadlineDate && <div className={classes.validationErrorNotification}>deadline date is required</div>}
                        </Grid>
                    )
                }
                
                <Grid item xs={6}>
                    <TimePickerField
                        name="deadlineTime"
                        placeholder="Select Time"
                        formik={formik}
                        width={'100%'}
                    />
                    {formik.touched.deadlineTime && formik.errors.deadlineTime && <div className={classes.validationErrorNotification}>deadline time is required</div>}
                </Grid>
            </Grid>
            
        </ItineraryFormContainer>
    );
}

export default Browser;

