import React, {useEffect} from "react";
import {StepByStepDialog} from "@core/components";
import {createConciergeTabsDock} from "./conciergeTabsDock";
import * as yup from "yup";
import {useFormik} from "formik";
import {convertDate, convertDateToTime, removeProperty, snakeNestedKeys, dateToMyDate} from "utils";

import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {
    addItineraryBooking,
    bookingsSelector,
    updateItineraryBooking
} from "redux/features/itineraries/bookings/bookingsSlice";

const notesFieldNames = ['notes', 'cancelPolicy'];

const validationSchema = yup.object({
    // providerName: yup
    //     .string('Enter service provider name')
    //     .required('service provider name is required'),
    serviceType: yup
        .string('Enter service type'),
    startDay: yup
        .string('Enter start day')
        .required('Start day is required'),
    startTime: yup
        .string('Select start time'),        
    providerWebsite: yup.string(),
    providerEmail: yup.string('Enter valid email address').email(),
    providerPhone: yup
        .string(),
        // .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value)),
    [notesFieldNames[0]]: yup
        .string(`Enter ${[notesFieldNames[0]]}`),
    [notesFieldNames[1]]: yup
        .string(`Enter ${[notesFieldNames[1]]}`),
});

const AddConcierge = ({...props}) => {
    const dispatch = useDispatch();
    const {startDate, booking} = useSelector(bookingsSelector);
    const {edit, apiPayload} = props;

    const {
        confirmationReference,
        customHeaderTitle,
        confirmedFor,
        confirmedBy,
        payment,
        price,
        serviceType,
        startDatetimeLocale,
        endDatetimeLocale,
        notes, 
        cancelPolicy, 
        description,
        supplier
    } = booking || {};

    const {saveToLibrary, name, address, email, phone, website} = supplier || {};

    const formik = useFormik({
        initialValues: {
            providerName: '',
            customHeaderTitle: '',
            serviceType: '',
            startDay: '',
            startTime: '',
            endDay: '',
            endTime: '',
            price: '',
            payment: '',
            confirmationReference: '',
            confirmedFor: '',
            confirmedBy: '',
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
            let data = {...values}
            data.startDay = convertDate(data.startDay);
            data.endDay = convertDate(data.endDay);
            data.startTime = convertDateToTime(data.startTime);
            data.endTime = convertDateToTime(data.endTime);
            data.providerPhone = data.providerPhone.replace(/\s/g, "");
            const payload = {...apiPayload};

            if (data.price === '' || data.price === null) {
                data = removeProperty('price', data);
            }

            if (data.providerName === '' || data.providerName === null) {
                data = removeProperty('providerName', data);
            }

            if (data.endDay === '' || data.endDay === null) {
                data = removeProperty('endDay', data);
            }

            if (data.startTime === '' || data.startTime === null) {
                data = removeProperty('startTime', data);
            }

            if (data.endTime === '' || data.endTime === null) {
                data = removeProperty('endTime', data);
            }

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
                serviceType: serviceType,
                startDay: startDatetimeLocale ? dateToMyDate(startDatetimeLocale) : null,
                endDay: endDatetimeLocale ? dateToMyDate(endDatetimeLocale) : null,
                price: price,
                customHeaderTitle: customHeaderTitle,
                payment: payment,
                confirmationReference: confirmationReference,
                confirmedFor: confirmedFor,
                confirmedBy: confirmedBy,
                saveToLibrary: saveToLibrary,
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
        <form id="concierges" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Add Concierge"
                id="add-concierge"
                createTabsDock={createConciergeTabsDock}
                {...props}
                formik={formik}
                unlockTabs={true}
            />
        </form>
    );
}

export default AddConcierge;
