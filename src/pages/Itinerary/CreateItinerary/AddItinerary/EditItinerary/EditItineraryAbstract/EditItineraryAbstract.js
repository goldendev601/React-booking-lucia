import React, {useEffect} from "react";
import {StepByStepDialog} from "@core/components";
import {createEditItineraryAbstractTabsDock} from "./editItineraryTabsDock";
import {useFormik} from "formik";
import * as yup from "yup";
import {
    clearItineraryUpdated,
    itinerariesSelector,
    updateItineraryAbstract
} from "redux/features/itineraries/itinerariesSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    dialogFormsStateSelector, setEdit,
    setEditItineraryAbstractOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {createErrorMessage, snakeNestedKeys} from "utils";
import {setEditTab} from "redux/features/dialogForms/itineraryFormSlice";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar';

const validationSchema = yup.object({
    abstractNote: yup
        .string('Enter abstract note'),
    hideAbstract: yup
        .boolean()
});

const EditItineraryAbstractDialog = ({...props}) => {
    const dispatch = useDispatch();
    const {itineraryId, packedItinerary, isItineraryUpdated, errorMessage, isItineraryUpdatedError} = useSelector(itinerariesSelector);
    const {edit} = useSelector(dialogFormsStateSelector);

    const {itineraryTheme, abstractNote} = packedItinerary || {};

    const {hideAbstract} = itineraryTheme || {};

    const formik = useFormik({
        initialValues: {
            abstractNote: '',
            hideAbstract: false,
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            const apiPayload = {
                itineraryId: itineraryId,
                abstract: snakeNestedKeys(values),
            }
            dispatch(updateItineraryAbstract(apiPayload));
        }
    });

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    useEffect(() => {
        if (isItineraryUpdated) {
            dispatch(setEdit(false));
            dispatch(setEditItineraryAbstractOpen(false));
            dispatch(setEditTab(null));
        }
    }, [dispatch, isItineraryUpdated]);

    useEffect(() => {
        if (edit) {
            formik.setValues({
                abstractNote: abstractNote,
                hideAbstract: hideAbstract,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [abstractNote, hideAbstract, edit]);

    useEffect(() => {
        if (isItineraryUpdatedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearItineraryUpdated());
        }
        if (isItineraryUpdated) {
            openSnackbarSuccess(createErrorMessage('Itinerary abstract has been updated'));
            dispatch(clearItineraryUpdated());
        }
    }, [dispatch, errorMessage, isItineraryUpdated, isItineraryUpdatedError, openSnackbarError, openSnackbarSuccess]);

    return (
        <form id="editItineraryAbstract" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Edit Itinerary Abstract"
                id="edit-itinerary-abstract"
                createTabsDock={createEditItineraryAbstractTabsDock}
                {...props}
                formik={formik}
            />
        </form>
    );
}

export default EditItineraryAbstractDialog;
