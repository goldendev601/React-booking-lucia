import React, {useEffect} from "react";
import {StepByStepDialog} from "@core/components";
import {createOtherTabsDock} from "./otherTabsDock";
import * as yup from "yup";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    addItineraryBooking,
    bookingsSelector,
    updateItineraryBooking
} from "redux/features/itineraries/bookings/bookingsSlice";
import { autocompleteNotes } from "redux/features/notes/notesSlice";
import { suppliersSelector } from "redux/features/suppliers/suppliersSlice";
import {snakeNestedKeys} from "utils";

const validationSchema = yup.object({
    title: yup
        .string('Enter a title')
        .required('title is required'),
    // priorityId: yup
    //     .string('Select priority')
    //     .required('priority is required'),
});

const AddOther = ({...props}) => {
    const dispatch = useDispatch();
    const {edit, apiPayload} = props;
    const {booking} = useSelector(bookingsSelector);
    const {noteInfo} = useSelector(suppliersSelector);

    const formik = useFormik({
        initialValues: {
            // priorityId: '',
            title: '',
            notes: '',
            saveToLibrary: true,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = {...apiPayload};
            if (values.saveToLibrary === undefined) {
                values.saveToLibrary = false;
            }
            payload.data = snakeNestedKeys(values);

            if (edit) {
                dispatch(updateItineraryBooking(payload));
            } else {
                dispatch(addItineraryBooking(payload));
            }
        }
    });

    const {setValues} = formik;

    useEffect(() => {
        if (edit && booking) {
            const noteDescription = booking.notes;
            const replacedNoteDescription = noteDescription.replaceAll('&lt;p&gt;', '').replaceAll('&lt;/p&gt;', '');
            setValues({
                // priorityId: booking.priorityId,
                title: booking.title,
                notes: replacedNoteDescription,
                saveToLibrary: booking.saveToLibrary,
            });
        }
    }, [edit, booking]);

    useEffect(() => {
        if (noteInfo) {
            const noteDescription = noteInfo.notes;
            const replacedNoteDescription = noteDescription.replaceAll('&lt;p&gt;', '').replaceAll('&lt;/p&gt;', '');
            setValues({
                title: noteInfo.title,
                // priorityId: noteInfo.priorityId,
                notes: replacedNoteDescription,
                saveToLibrary: noteInfo.saveToLibrary,
            });
        } 
    }, [noteInfo]);

    return (
        <form id="others" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Add Notes/Other"
                id="add-other"
                createTabsDock={createOtherTabsDock}
                {...props}
                formik={formik}
            />
        </form>
    )
}

export default AddOther;
