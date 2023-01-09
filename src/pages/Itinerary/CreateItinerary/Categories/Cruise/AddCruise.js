import React, {useEffect, useState} from "react";
import {StepByStepDialog} from "@core/components";
import {createCruiseTabsDock} from "./cruiseTabsDock";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
    addItineraryBooking,
    addItineraryBookingCabin,
    bookingsSelector,
    updateItineraryBooking, updateItineraryBookingCabin, getItineraryBookingCabins
} from "redux/features/itineraries/bookings/bookingsSlice";
import {useFormik} from "formik";
import {convertDate, convertDateToTime, removeProperty, snakeNestedKeys, dateToMyDate} from "utils";
import moment from "moment";
import {bookingFormSelector} from "redux/features/dialogForms/bookingFormSlice";
import {addedDiff, updatedDiff} from "deep-object-diff";

const notesFieldNames = ['notes', 'cancelPolicy'];

const validationSchema = yup.object({
    cruiseShipName: yup
        .string('Enter cruise ship name')
        .required('cruise ship name is required'),
    departurePortCity: yup
        .string('Enter departure port city')
        .required('departure port city is required'),
    departureDay: yup
        .string('Select departure day')
        .required('departure day is required'),
    departureTime: yup
        .string('Select departure time')
        .required('departure time is required'),
    providerName: yup
        .string('Enter provider name')
        .required('provider name is required'),
    arrivalPortCity: yup
        .string('Enter arrival port city')
        .required('arrival port city is required'),
    disembarkationDay: yup
        .string('Select disembarkation day')
        .required('disembarkation day is required'),
    disembarkationTime: yup
        .string('Select disembarkation time')
        .required('disembarkation time is required'),
    // [notesFieldNames[0]]: yup
    //     .string(`Enter ${[notesFieldNames[0]]}`),
    // [notesFieldNames[1]]: yup
    //     .string(`Enter ${[notesFieldNames[1]]}`),
});

const AddCruise = ({...props}) => {
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState([]);

    const {startDate, booking} = useSelector(bookingsSelector);
    // const {cabins} = useSelector(bookingsSelector);
    const {edit, apiPayload} = props;
    const {category} = useSelector(bookingFormSelector);

    const {
        cruiseShipName,
        customHeaderTitle,
        departurePortCity,
        departureDatetime,
        arrivalPortCity,
        disembarkationDatetime,
        supplier,
        cabins,
        departureDatetimeLocale,
        disembarkationDatetimeLocale
    } = booking || {};

    const {name, saveToLibrary, address, email, phone, website} = supplier || {};
    const {notes, cancelPolicy} = booking || {};

    const addNewCabins = (newCabins) => {
        if (edit) {
            if (newCabins.length !== 0) {
                newCabins.forEach((cabin) => {
                    const {id, ...rest} = cabin;
                    const apiPayload = {
                        itineraryId: booking?.itineraryId,
                        bookingId: booking?.id,
                        bookingCategory: category,
                        cabin: snakeNestedKeys({
                            ...rest
                        }),
                    }
                    dispatch(addItineraryBookingCabin(apiPayload))
                });
            }
        }
    }

    const updateCabins = (changedCabins) => {
        if (edit) {
            if (changedCabins.length !== 0) {
                changedCabins.forEach((cabin) => {
                    const {id, ...rest} = cabin;
                    const apiPayload = {
                        itineraryId: booking.itineraryId,
                        bookingId: booking.id,
                        cabinId: id,
                        bookingCategory: category,
                        cabin: snakeNestedKeys(rest)
                    }
                    dispatch(updateItineraryBookingCabin(apiPayload))
                });
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            cruiseShipName: '',
            customHeaderTitle: '',
            departurePortCity: '',
            departureDay: '',
            departureTime: '',
            providerName: '',
            arrivalPortCity: '',
            disembarkationDay: '',
            disembarkationTime: '',
            saveToLibrary: true,
            cabins: [],
            providerAddress: '',
            providerPhone: '',
            providerWebsite: '',
            providerEmail: '',
            [notesFieldNames[0]]: '',
            cancelPolicy: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {...values};
            data.departureDay = convertDate(data.departureDay);
            data.disembarkationDay = convertDate(data.disembarkationDay);
            data.departureTime = convertDateToTime(data.departureTime);
            data.disembarkationTime = convertDateToTime(data.disembarkationTime);
            data.providerPhone = data.providerPhone.replace(/\s/g, "");

            let payload = {...apiPayload};

            if (edit) {
                if (values.cabins) {
                    const keys = Object.keys(updatedDiff(initialValues, values.cabins));
                    const changedCabins = keys.map((i) => values.cabins[i]);
                    updateCabins(changedCabins);
                    addNewCabins(Object.values(addedDiff(initialValues, values.cabins)));
                }
                payload.data = snakeNestedKeys(data);
                payload = removeProperty('cabins', payload);
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
                cruiseShipName: cruiseShipName,
                customHeaderTitle: customHeaderTitle,
                departurePortCity: departurePortCity,
                departureDay: new Date(departureDatetimeLocale),
                providerName: name,
                arrivalPortCity: arrivalPortCity,
                disembarkationDay: new Date(disembarkationDatetimeLocale),
                departureTime: moment(departureDatetimeLocale).isValid() ? moment.parseZone(departureDatetimeLocale) : null,
                disembarkationTime: moment(disembarkationDatetimeLocale).isValid() ? moment.parseZone(disembarkationDatetimeLocale) : null,
                saveToLibrary: saveToLibrary,
                providerAddress: address,
                providerPhone: phone ? phoneNumber : '',
                providerWebsite: website,
                providerEmail: email,
                [notesFieldNames[0]]: notes,
                [notesFieldNames[1]]: cancelPolicy,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, arrivalPortCity, booking, cancelPolicy, cruiseShipName, departureDatetime, departureDatetimeLocale, departurePortCity, disembarkationDatetime, disembarkationDatetimeLocale, edit, email, name, notes, cabins, phone, saveToLibrary, website]);

    useEffect(() => {
        if (cabins && edit) {
            setInitialValues([...cabins]);
            formik.setFieldValue('cabins', [
                ...cabins
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, cabins]);

    useEffect(() => {
        if (startDate) {
            formik.setFieldValue('departureDay', dateToMyDate(startDate));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);

    return (
        <form id="cruises" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Add Cruise"
                id="add-cruise"
                createTabsDock={createCruiseTabsDock}
                {...props}
                formik={formik}
                unlockTabs={true}
            />
        </form>
    );
}


export default AddCruise;
