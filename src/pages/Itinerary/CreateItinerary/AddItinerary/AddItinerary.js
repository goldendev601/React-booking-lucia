import React, {useEffect} from "react";
import {createItineraryTabsDock} from "./itineraryTabsDock";
import {useDispatch, useSelector} from "react-redux";
import {addItinerary, itinerariesSelector} from "redux/features/itineraries/itinerariesSlice";
import {convertDate, createErrorMessage, removeProperty, snakeNestedKeys} from "utils";
import {clearState} from "redux/features/itineraries/itinerariesSlice";
import {useSnackbar} from 'react-simple-snackbar'
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {
    resetItineraryState, setEditTab
} from "redux/features/dialogForms/itineraryFormSlice";
import {
    dialogFormsStateSelector,
    setCategoryFormOpen, setEdit,
    setItineraryFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {StepByStepDialog} from "@core/components";
import {useFormik} from "formik";
import * as yup from "yup";
import {
    addItineraryPicture,
    clearPicturesState,
    picturesSelector,
    updateItineraryLogoPicture
} from "redux/features/pictures/picturesSlice";

const validationSchema = yup.object({
    title: yup
        .string('Enter itinerary name')
        .required('itinerary name is required'),
    clientName: yup
        .string('Enter full name')
        .required('full name is required'),
    clientPhone: yup
        .string()
        .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value)),
    dates: yup.array().min(2, "date range is required").required("date range is required"),
    passengers: yup.array()
        .of(
            yup.object().shape({
                name: yup.string().required(),
                passengerTypeId: yup.string(),
            })
        ),
    abstractNote: yup
        .string('Enter abstract note'),
    hideAbstract: yup
        .boolean()
});

const AddItinerary = ({open}) => {
    const dispatch = useDispatch();

    const {edit} = useSelector(dialogFormsStateSelector)
    const {itinerary, addedSuccess, addedError, errorMessage} = useSelector(itinerariesSelector);
    const {itineraryLogoPicture} = useSelector(picturesSelector);

    const formik = useFormik({
        initialValues: {
            title: '',
            dates: [],
            clientName: '',
            clientPhone: '',
            clientEmails: [],
            showPriceOnShare: false,
            markAsClientApproved: false,
            passengers: [],
            abstractNote: '',
            hideAbstract: false,
            propertyDesignId: 1,
            currencyId: 144,
            totalPrice: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = removeProperty('dates', values);
            data.startDate = convertDate(values.dates[0]);
            data.endDate = convertDate(values.dates[1]);

            dispatch(addItinerary(snakeNestedKeys(data)));
        }
    });

    const {pictures} = useSelector(picturesSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    useEffect(() => {
        dispatch(setEdit(false));
        dispatch(setEditTab(null));
    }, [dispatch]);

    useEffect(() => {
        if (!edit) {
            if (addedError) {
                openSnackbarError(createErrorMessage(errorMessage));
                dispatch(clearState());
                dispatch(resetItineraryState());
            }
            if (addedSuccess && !edit) {
                if (pictures && pictures.length !== 0) {
                    const formData = new FormData();
                    formData.append("image_url[]", pictures[0]?.imageFile);

                    const picturePayload = {
                        itineraryId: itinerary.id,
                        images: formData,
                    }
                    dispatch(addItineraryPicture(picturePayload));
                    dispatch(clearPicturesState());
                }
                if (itineraryLogoPicture.length !== 0) {
                    const formData = new FormData();
                    formData.append('itinerary_logo', itineraryLogoPicture[0]?.imageFile);
                    const logoPayload = {
                        itineraryId: itinerary.id,
                        logo: formData,
                    }
                    dispatch(updateItineraryLogoPicture(logoPayload));
                }
                openSnackbarSuccess('Continue with selecting booking category');
                dispatch(clearState());
                setTimeout(() => dispatch(setItineraryFormOpen(false)), 200);
                setTimeout(() => dispatch(setCategoryFormOpen(true)), 400);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addedError, addedSuccess, edit]);

    return (
        <form id="addItinerary" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Add Itinerary"
                id="add-itinerary"
                createTabsDock={createItineraryTabsDock}
                open={open}
                alertType="discard"
                formik={formik}
                unlockTabs={true}
                formId="addItinerary"
            />
        </form>
    );
}

export default AddItinerary;
