import React, {useEffect} from "react";
import {StepByStepDialog} from "@core/components";
import {createEditItineraryInformationTabsDock} from "./editItineraryInformationTabsDock";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
    clearItineraryUpdated,
    itinerariesSelector,
    updateItineraryInformation
} from "redux/features/itineraries/itinerariesSlice";
import {useFormik} from "formik";
import {convertDate, createErrorMessage, removeProperty, snakeNestedKeys} from "utils";
import {
    dialogFormsStateSelector, setEdit,
    setEditItineraryInformationOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {setEditTab} from "redux/features/dialogForms/itineraryFormSlice";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar';

const validationSchema = yup.object({
    title: yup
        .string('Enter itinerary name')
        .required('itinerary name is required'),
    clientName: yup
        .string('Enter full name')
        .required('full name is required'),
    clientPhone: yup
        .string()
        .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value))
});

const EditItineraryInformationDialog = ({...props}) => {
    const dispatch = useDispatch();
    const {edit} = useSelector(dialogFormsStateSelector)
    const {packedItinerary, itineraryId, isItineraryUpdated, errorMessage, isItineraryUpdatedError} = useSelector(itinerariesSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const {
        title,
        startDate,
        endDate,
        client,
        clientPhone,
        showPriceOnShare,
        markAsClientApproved,
        currencyId,
        totalPrice
    } = packedItinerary || {};

    const formik = useFormik({
        initialValues: {
            title: '',
            dates: [],
            clientName: '',
            clientPhone: '',
            clientEmails: '',
            showPriceOnShare: false,
            markAsClientApproved: false,
            propertyDesignId: 1,
            totalPrice: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = removeProperty('dates', values);
            data.startDate = convertDate(values.dates[0]);
            data.endDate = convertDate(values.dates[1]);

            if (edit) {
                dispatch(updateItineraryInformation({
                    itineraryId: itineraryId,
                    data: snakeNestedKeys(data),
                }));
            }
        }
    });

    useEffect(() => {
        if (isItineraryUpdated) {
            dispatch(setEdit(false));
            dispatch(setEditItineraryInformationOpen(false));
            dispatch(setEditTab(null));
        }
    }, [dispatch, isItineraryUpdated]);

    useEffect(() => {
        if (edit) {
            const dates = [
                new Date(startDate),
                new Date(endDate),
            ]
            const phoneNumber = "+" + clientPhone?.replace(/\D+/g, '');
            formik.setValues({
                title: title,
                currencyId: currencyId ? currencyId : 144,
                totalPrice: totalPrice,
                dates: dates,
                clientName: client.name,
                clientPhone: clientPhone ? phoneNumber : '',
                showPriceOnShare: showPriceOnShare || false,
                markAsClientApproved: markAsClientApproved || false,
                clientEmails: client.emails,
                propertyDesignId: packedItinerary.itineraryTheme.propertyDesignId ? packedItinerary.itineraryTheme.propertyDesignId : 1
            });
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, packedItinerary]);

    useEffect(() => {
        if (isItineraryUpdatedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearItineraryUpdated());
        }
        if (isItineraryUpdated) {
            openSnackbarSuccess(createErrorMessage('Itinerary information has been updated'));
            dispatch(clearItineraryUpdated());
        }
    }, [dispatch, errorMessage, isItineraryUpdated, isItineraryUpdatedError, openSnackbarError, openSnackbarSuccess]);

    return (
        <form id="editItineraryInformation" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Edit Itinerary Information"
                id="edit-itinerary-information"
                createTabsDock={createEditItineraryInformationTabsDock}
                {...props}
                formik={formik}
            />
        </form>
    );
}

export default EditItineraryInformationDialog;
