import React, {useEffect} from "react";
import {StepByStepDialog} from "@core/components";
import {createUploadDocumentTabsDock} from "./uploadDocumentTabsDock";
import {useFormik} from "formik";
import {
    clearItineraryDocumentAdded,
    itinerariesSelector,
    addItineraryDocument,
    fetchPackedItinerary
} from "redux/features/itineraries/itinerariesSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    setFileUploadOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {createErrorMessage, snakeNestedKeys} from "utils";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar';

const UploadDocumentDialog = ({...props}) => {
    const dispatch = useDispatch();
    const {itineraryId, isItineraryDocumentAdded, errorMessage, isItineraryDocumentAddedError} = useSelector(itinerariesSelector);

    const formik = useFormik({
        initialValues: {
            document: [],
        },
        onSubmit: (values) => {
            const formData = new FormData();
            var documents = values?.document;
            for(let index = 0; index < documents.length; index ++ ) {
                formData.append(`document[${index}]`, documents[index])
            }
            // formData.append("document", values?.document);
            const apiPayload = {
                itineraryId: itineraryId,
                data: formData,
            }
            dispatch(addItineraryDocument(apiPayload));
        }
    });

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    useEffect(() => {
        if (isItineraryDocumentAdded) {
            dispatch(setFileUploadOpen(false));
            dispatch(fetchPackedItinerary(itineraryId));
        }
    }, [dispatch, isItineraryDocumentAdded]);

    useEffect(() => {
        if (isItineraryDocumentAddedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearItineraryDocumentAdded());
        }
        if (isItineraryDocumentAdded) {
            openSnackbarSuccess(createErrorMessage('Your document has been uploaded successfully!'));
            dispatch(clearItineraryDocumentAdded());
        }
    }, [dispatch, errorMessage, isItineraryDocumentAdded, isItineraryDocumentAddedError, openSnackbarError, openSnackbarSuccess]);

    return (
        <form id="uploadDocument" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Upload Document"
                id="edit-itinerary-abstract"
                createTabsDock={createUploadDocumentTabsDock}
                {...props}
                formik={formik}
            />
        </form>
    );
}

export default UploadDocumentDialog;
