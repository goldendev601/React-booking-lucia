import React, {useEffect, useState} from "react";
import {StepByStepDialog} from "@core/components";
import {createEditItineraryTravelersTabsDock} from "./editItineraryTravelersTabsDock";
import {useFormik} from "formik";
import {addedDiff, updatedDiff} from "deep-object-diff";
import {
    dialogFormsStateSelector, setEdit, setEditItineraryTravelersOpen,
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {createErrorMessage, snakeNestedKeys} from "utils";
import {
    addItineraryPassenger, clearItineraryUpdated, itinerariesSelector,
    updateItineraryPassenger
} from "redux/features/itineraries/itinerariesSlice";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {setEditTab} from "redux/features/dialogForms/itineraryFormSlice";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar';
import {isEqual} from "lodash";

const validationSchema = yup.object({
    passengers: yup.array()
        .of(
            yup.object().shape({
                name: yup.string(),
                passengerTypeId: yup.string(),
            })
        )
});

const EditItineraryTravelersDialog = ({...props}) => {
    const dispatch = useDispatch();
    const {
        itineraryId,
        passengers,
        isItineraryUpdated, errorMessage, isItineraryUpdatedError
    } = useSelector(itinerariesSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const {edit} = useSelector(dialogFormsStateSelector);

    const [initialValues, setInitialValues] = useState([]);

    const updatePassengers = (changedPassengers) => {
        if (edit) {
            if (changedPassengers.length !== 0) {
                changedPassengers.forEach((passenger) => {
                    const {id, passengerTypeId, name} = passenger;
                    const apiPayload = {
                        itineraryId: itineraryId,
                        passengerId: id,
                        passenger: snakeNestedKeys({
                            name: name,
                            passengerTypeId
                        }),
                    }
                    dispatch(updateItineraryPassenger(apiPayload));
                });
            }
        }
    }

    const addNewPassengers = (newPassengers) => {
        if (edit) {
            if (newPassengers.length !== 0) {
                newPassengers.forEach((passenger) => {
                    const {passengerTypeId, name} = passenger;
                    const apiPayload = {
                        itineraryId: itineraryId,
                        passenger: snakeNestedKeys({
                            name: name,
                            passengerTypeId
                        }),
                    }
                    dispatch(addItineraryPassenger(apiPayload))
                });
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            passengers: []
        },
        validationSchema: validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            if (edit) {
                const keys = Object.keys(updatedDiff(initialValues, values.passengers));
                const changedPassengers = keys.map((i) => values.passengers[i]);
                updatePassengers(changedPassengers);
                addNewPassengers(Object.values(addedDiff(initialValues, values.passengers)));
                if (isEqual(values.passengers, passengers)) {
                    dispatch(setEditItineraryTravelersOpen(false));
                    dispatch(setEdit(false));
                }
            }
        }
    });

    useEffect(() => {
        if (isItineraryUpdated) {
            dispatch(setEditItineraryTravelersOpen(false));
            dispatch(setEditTab(null));
            openSnackbarSuccess('Travelers information has been updated');
            dispatch(setEdit(false));
            dispatch(clearItineraryUpdated());
        }
        if (isItineraryUpdatedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearItineraryUpdated());
        }
    }, [dispatch, errorMessage, isItineraryUpdated, isItineraryUpdatedError, openSnackbarError, openSnackbarSuccess]);

    useEffect(() => {
        if (edit && passengers) {
            setInitialValues([...passengers]);
            formik.setValues({
                passengers: [
                    ...passengers
                ]
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, passengers]);

    return (
        <form id="editItineraryTravelers" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Edit Itinerary Travelers"
                id="edit-itinerary-travelers"
                createTabsDock={createEditItineraryTravelersTabsDock}
                {...props}
                formik={formik}
            />
        </form>
    );
}

export default EditItineraryTravelersDialog;
