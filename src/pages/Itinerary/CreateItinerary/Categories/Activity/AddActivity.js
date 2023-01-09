import React, {useEffect} from "react";
import {StepByStepDialog} from "@core/components";
import {createActivityTabsDock} from "./activityTabsDock";
import {useDispatch, useSelector} from "react-redux";
import {
    addItineraryBooking,
    bookingsSelector,
    updateItineraryBooking
} from "redux/features/itineraries/bookings/bookingsSlice";
import {useFormik} from "formik";
import {convertDate, convertDateToTime, removeProperty, snakeNestedKeys, dateToMyDate} from "utils";
import moment from "moment";
import * as yup from "yup";

const notesFieldNames = ['notes', 'description'];

const validationSchema = yup.object({
    customHeaderTitle: yup
        .string('Enter title')
        .required('title is required'),
    startDay: yup
        .string('Select start day')
        .required('start day is required'),
    // startTime: yup
    //     .string('Select start time')
    //     .required('start time is required'),
    endDay: yup
        .string('Select end day')
        .required('end day is required'),
    // endTime: yup
    //     .string('Select end time')
    //     .required('end time is required'),
    providerWebsite: yup.string(),
    providerEmail: yup.string('Enter valid email address').email(),
    providerPhone: yup
        .string()
        // .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value)),
});

const AddActivity = ({...props}) => {
    const dispatch = useDispatch();
    const {edit, apiPayload} = props;
    const {startDate, booking} = useSelector(bookingsSelector);

    const {
        confirmationReference,
        customHeaderTitle,
        meetingPoint,
        payment,
        price,
        supplier,
        startDatetimeLocale,
        endDatetimeLocale,
        notes, 
        cancelPolicy, 
        description
    } = booking || {};

    const {saveToLibrary, name, address, email, phone, website} = supplier || {};

    const formik = useFormik({
        initialValues: {
            providerName: '',
            customHeaderTitle: '',
            startDay: '',
            startTime: '',
            endDay: '',
            endTime: '',
            price: '',
            payment: '',
            confirmationReference: '',
            meetingPoint: '',
            saveToLibrary: true,
            providerAddress: '',
            providerPhone: '',
            providerWebsite: '',
            providerEmail: '',
            [notesFieldNames[0]]: '',
            [notesFieldNames[1]]: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let data = {...values};
            data.startDay = convertDate(data.startDay);
            data.endDay = convertDate(data.endDay);
            data.price = parseFloat(data.price);
            data.startTime = convertDateToTime(data.startTime);
            data.endTime = convertDateToTime(data.endTime);
            data.providerPhone = data.providerPhone.replace(/\s/g, "");

            if (data.providerName === '' || data.providerName === null) {
                data = removeProperty('providerName', data);
            }

            if (!data.price) {
                data = removeProperty('price', data);
                data = removeProperty('payment', data);
            }

            if (!data.endTime) {
                data = removeProperty('endTime', data);
            }

            if (!data.startTime) {
                data = removeProperty('startTime', data);
            }

            const payload = {...apiPayload};

            if (edit) {
                payload.data = snakeNestedKeys(data);
                dispatch(updateItineraryBooking(payload));
            } else {
                payload.data = snakeNestedKeys(data);
                dispatch(addItineraryBooking(payload));
            }
        }
    });

    useEffect(() => {
        if (edit) {
            const phoneNumber = "+" + phone?.replace(/\D+/g, '');
            formik.setValues({
                providerName: name,
                price: price,
                customHeaderTitle: customHeaderTitle,
                payment: payment,
                confirmationReference: confirmationReference,
                meetingPoint: meetingPoint,
                saveToLibrary: saveToLibrary,
                startDay: startDatetimeLocale ? dateToMyDate(startDatetimeLocale) : null,
                endDay: endDatetimeLocale ? dateToMyDate(endDatetimeLocale) : null,
                startTime: moment(startDatetimeLocale).isValid() ? moment.parseZone(startDatetimeLocale) : null,
                endTime: moment(endDatetimeLocale).isValid() ? moment.parseZone(endDatetimeLocale) : null,
                providerAddress: address,
                providerPhone: phone ? phoneNumber : '',
                providerWebsite: website,
                providerEmail: email,
                [notesFieldNames[0]]: notes,
                [notesFieldNames[1]]: cancelPolicy || description,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [booking, edit]);

    useEffect(() => {
        if (startDate) {
            formik.setFieldValue('startDay', dateToMyDate(startDate));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);

    return (
        <form id="tours" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Add Tour/Activity"
                id="add-activity"
                createTabsDock={createActivityTabsDock}
                {...props}
                formik={formik}
                unlockTabs={true}
            />
        </form>
    );
}

export default AddActivity;
