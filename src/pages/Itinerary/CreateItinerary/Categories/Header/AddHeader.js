import React, {useEffect} from "react";
import {StepByStepDialog} from "@core/components";
import {createHeaderTabsDock} from "./headerTabsDock";
import * as yup from "yup";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    addItineraryBooking,
    bookingsSelector,
    updateItineraryBooking
} from "redux/features/itineraries/bookings/bookingsSlice";
import { suppliersSelector } from "redux/features/suppliers/suppliersSlice";
import {snakeNestedKeys} from "utils";

const validationSchema = yup.object({
    customHeaderTitle: yup
        .string('Enter a title')
        .required('title is required'),
});

const AddHeader = ({...props}) => {
    const dispatch = useDispatch();
    const {edit, apiPayload} = props;
    const {booking, startDate} = useSelector(bookingsSelector);

    const formik = useFormik({
        initialValues: {
            customHeaderTitle: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = {...apiPayload};
            payload.data = snakeNestedKeys(values);
            payload.data.target_date = startDate;
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
            setValues({
                customHeaderTitle: booking.customHeaderTitle,
            });
        }
    }, [edit, booking]);

    return (
        <form id="others" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Add Header"
                id="add-header"
                createTabsDock={createHeaderTabsDock}
                {...props}
                formik={formik}
            />
        </form>
    )
}

export default AddHeader;
