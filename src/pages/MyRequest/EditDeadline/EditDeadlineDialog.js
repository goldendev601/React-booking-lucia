import React, {useEffect} from "react";
import {StepByStepDialog} from "@core/components";
import {createEditDeadlineTabsDock} from "./EditdeadlineTabsDock";
import * as yup from "yup";
import {useFormik} from "formik";
import { requestSelector, selectMyRequest, clearDeadlineExtended, advisorRequestsExtendDeadline } from "redux/features/request/requestSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    setEdit, setDeadlineFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import { convertDate, convertDateToTime, createErrorMessage } from "utils";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar';

const validationSchema = yup.object({
    deadlineDate: yup
        .string('Select deadline date')
        .required('deadline date is required'),
    deadlineTime: yup
        .string('Select deadline time')
        .required('deadline time is required'),
});

const EditDeadlineDialog = ({...props}) => {
    const dispatch = useDispatch();
    const { selectedMyRequest, isExtendedDeadlineSuccess, isExtendedDeadlineError, errorMessage} = useSelector(requestSelector);

    
    const formik = useFormik({
        initialValues: {
            deadlineTime: null,
            deadlineDate: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            if (values && values.deadlineDate) {
                formData.append('deadline_day', convertDate(values.deadlineDate))
            }
            if (values && values.deadlineTime) {
                formData.append('deadline_time', convertDateToTime(values.deadlineTime))
            }
            const apiPayload = {
                advisorId: selectedMyRequest.id,
                data: formData,
            }
            dispatch(advisorRequestsExtendDeadline(apiPayload));
        }
    });

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    useEffect(() => {
        dispatch(setEdit(true));
    }, []);

    useEffect(() => {
        if (isExtendedDeadlineError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearDeadlineExtended());
            dispatch(setDeadlineFormOpen(false));
        }
        if (isExtendedDeadlineSuccess) {
            openSnackbarSuccess(createErrorMessage('Deadline has been updated successfully!'));
            dispatch(clearDeadlineExtended());
            dispatch(setDeadlineFormOpen(false));
        }
    }, [dispatch, errorMessage, isExtendedDeadlineError, isExtendedDeadlineSuccess, openSnackbarError, openSnackbarSuccess]);

    return (
        <form id="editDeadline" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Edit Deadline for Task"
                id="edit-deadline-task"
                createTabsDock={createEditDeadlineTabsDock}
                {...props}
                formik={formik}
            />
        </form>
    );
}

export default EditDeadlineDialog;
