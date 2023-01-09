import React, {useEffect} from "react";
import {StepByStepDialog} from "@core/components";
import {createImportBookingTabsDock} from "./importBookingTabsDock";
import {useFormik} from "formik";
import {
    clearItineraryBookingImported,
    itinerariesSelector,
    importBooking
} from "redux/features/itineraries/itinerariesSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    setImportBookingOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {createErrorMessage, snakeNestedKeys} from "utils";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar';

const ImportBookingDialog = ({...props}) => {
    const dispatch = useDispatch();
    const {itineraryId, isItineraryBookingImported, errorMessage, isItineraryBookingImportedError} = useSelector(itinerariesSelector);

    const formik = useFormik({
        initialValues: {
            document: null,
        },
        onSubmit: (values) => {
            const formData = new FormData();
            var documents = values?.document;
            for(let index = 0; index < documents.length; index ++ ) {
                formData.append(`booking_document[${index}]`, documents[index])
            }
            const apiPayload = {
                itineraryId: itineraryId,
                data: formData,
            }
            dispatch(importBooking(apiPayload));
        }
    });

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    useEffect(() => {
        if (isItineraryBookingImported) {
            dispatch(setImportBookingOpen(false));
        }
    }, [dispatch, isItineraryBookingImported]);

    useEffect(() => {
        if (isItineraryBookingImportedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearItineraryBookingImported());
        }
        if (isItineraryBookingImported) {
            openSnackbarSuccess(createErrorMessage('We will notify you by email once it is completed!'));
            dispatch(clearItineraryBookingImported());
        }
    }, [dispatch, errorMessage, isItineraryBookingImported, isItineraryBookingImportedError, openSnackbarError, openSnackbarSuccess]);

    return (
        <form id="importBooking" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="PDF Import"
                id="edit-itinerary-abstract"
                createTabsDock={createImportBookingTabsDock}
                {...props}
                formik={formik}
            />
        </form>
    );
}

export default ImportBookingDialog;
