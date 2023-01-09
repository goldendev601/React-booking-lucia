import React, {useEffect, useState} from "react";
import {StepByStepDialog} from "@core/components";
import {createEditItineraryTasksTabsDock} from "./editItineraryTasksTabsDock";
import {useFormik} from "formik";
import {addedDiff, updatedDiff} from "deep-object-diff";
import {
    dialogFormsStateSelector, setEdit, setEditItineraryTasksOpen,
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {createErrorMessage, snakeNestedKeys, convertDate} from "utils";
import {
    addItineraryTask, 
    fetchPackedItinerary, 
    itinerariesSelector,
    clearItineraryTaskAdded    
} from "redux/features/itineraries/itinerariesSlice";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar';

const validationSchema = yup.object({
    title: yup
        .string('Enter task name')
        .required('Task name is required'),
});

const EditItineraryTasksDialog = ({...props}) => {
    const dispatch = useDispatch();
    const {
        itineraryId,
        isItineraryTaskAdded, 
        errorMessage, 
        isItineraryTaskAddedError
    } = useSelector(itinerariesSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const {edit} = useSelector(dialogFormsStateSelector);


    const formik = useFormik({
        initialValues: {
            title: '',
            is_completed: false,
            deadline: '',
            notes: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let data = {...values};
            const formData = new FormData();
            formData.append('title', data.title)
            formData.append('is_completed', false)
            if (data.deadline) {
                formData.append('deadline', convertDate(data.deadline))
            }
            if (data.notes) {
                formData.append('notes', data.notes)
            }
            const apiPayload = {
                itineraryId: itineraryId,
                data: formData,
            }
            dispatch(addItineraryTask(apiPayload));
        }
    });

    useEffect(() => {
        if (isItineraryTaskAdded) {
            dispatch(setEditItineraryTasksOpen(false));
            dispatch(fetchPackedItinerary(itineraryId));
        }
    }, [dispatch, isItineraryTaskAdded]);

    useEffect(() => {
        if (isItineraryTaskAddedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearItineraryTaskAdded());
        }
        if (isItineraryTaskAdded) {
            openSnackbarSuccess(createErrorMessage('Your itinerary task has been added successfully!'));
            dispatch(clearItineraryTaskAdded());
        }
    }, [dispatch, errorMessage, isItineraryTaskAdded, isItineraryTaskAdded, openSnackbarError, openSnackbarSuccess]);
    

    return (
        <form id="editItineraryTasks" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Add new task"
                id="add-new-task"
                createTabsDock={createEditItineraryTasksTabsDock}
                {...props}
                formik={formik}
            />
        </form>
    );
}

export default EditItineraryTasksDialog;
