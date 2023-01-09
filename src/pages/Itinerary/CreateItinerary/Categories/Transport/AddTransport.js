import React, {useEffect, useState} from "react";
import {StepByStepDialog} from "@core/components";
import {createTransportTabsDock} from "./transportTabsDock";
import {useDispatch, useSelector} from "react-redux";
import {
    addItineraryBooking,
    addItineraryBookingPassenger,
    bookingsSelector, updateItineraryBooking,
    updateItineraryBookingPassenger
} from "redux/features/itineraries/bookings/bookingsSlice";
import {useFormik} from "formik";
import {convertDate, convertDateToTime, removeProperty, snakeNestedKeys, dateToMyDate} from "utils";
import moment from "moment";
import * as yup from "yup";
import {bookingFormSelector} from "redux/features/dialogForms/bookingFormSlice";
import {addedDiff, updatedDiff} from "deep-object-diff";

const initialFormikValues = {
    transitTypeId: '',
    price: '',
    customHeaderTitle: '',
    providerName: '',
    departureDay: '',
    departureTime: '',
    transportFrom: '',
    arrivalDay: '',
    arrivalTime: '',
    transportTo: '',
    saveToLibrary: true,
}

const validationSchema = yup.object({
    transitTypeId: yup
        .string('Select transit type')
        .required('transit type is required'),
    // providerName: yup
    //     .string('Enter provider name')
    //     .required('provider name is required'),
    departureDay: yup
        .string('Enter departure day')
        .required('departure day is required'),
    // departureTime: yup
    //     .string('Select departure time')
    //     .required('departure time is required'),
    arrivalDay: yup
        .string('Select arrival day')
        .required('arrival day is required'),
    // arrivalTime: yup
    //     .string('Select arrival time')
    //     .required('arrival time is required'),
    providerWebsite: yup.string(),
    providerEmail: yup.string('Enter valid email address').email(),
    providerPhone: yup
        .string(),
        // .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value)),
    // notes: yup
    //     .string('Enter type'),
});

const AddTransport = ({...props}) => {
    const dispatch = useDispatch();

    const {category} = useSelector(bookingFormSelector);
    const {startDate, booking, passengers} = useSelector(bookingsSelector);
    const [initialValues, setInitialValues] = useState([]);

    const {edit, apiPayload} = props;

    const {
        transitTypeId,
        price,
        customHeaderTitle,
        supplier,
        departureDatetime,
        arrivalDatetime,
        transportFrom,
        transportTo,
        vehicle,
        departureDatetimeLocale,
        arrivalDatetimeLocale,
        notes
    } = booking || {};

    const {name, address, email, phone, website, saveToLibrary} = supplier || {};

    const addNewPassengers = (newPassengers) => {
        if (edit) {
            if (newPassengers.length !== 0) {
                newPassengers.forEach((passenger) => {
                    const apiPayload = {
                        itineraryId: booking?.itineraryId,
                        bookingId: booking?.id,
                        bookingCategory: category,
                        passenger: snakeNestedKeys({
                            name: passenger.name,
                            seat: passenger.seat,
                            class: passenger.class,
                            frequentFlyerNumber: passenger.frequentFlyerNumber,
                            ticketNumber: passenger.ticketNumber,
                        }),
                    }
                    dispatch(addItineraryBookingPassenger(apiPayload))
                });
            }
        }
    }

    const updatePassengers = (changedPassengers) => {
        if (edit) {
            if (changedPassengers.length !== 0) {
                changedPassengers.forEach((passenger) => {
                    const {id} = passenger;
                    const apiPayload = {
                        itineraryId: booking?.itineraryId,
                        bookingId: booking?.id,
                        passengerId: id,
                        bookingCategory: category,
                        passenger: snakeNestedKeys({
                            name: passenger.name,
                            seat: passenger.seat,
                            class: passenger.class,
                            frequentFlyerNumber: passenger.frequentFlyerNumber,
                            ticketNumber: passenger.ticketNumber,
                        })
                    }
                    dispatch(updateItineraryBookingPassenger(apiPayload))
                });
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            ...initialFormikValues,
            providerAddress: '',
            providerPhone: '',
            providerWebsite: '',
            providerEmail: '',
            passengers: [],
            notes: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let data = {...values};
            data.departureDay = convertDate(data.departureDay);
            data.arrivalDay = convertDate(data.arrivalDay);
            data.departureTime = convertDateToTime(data.departureTime);
            data.arrivalTime = convertDateToTime(data.arrivalTime);
            data.providerPhone = data.providerPhone.replace(/\s/g, "");

            if (data.price === '' || data.price === null) {
                data = removeProperty('price', data);
            }

            if (!data.departureTime) {
                data = removeProperty('departureTime', data);
            }

            if (!data.arrivalTime) {
                data = removeProperty('arrivalTime', data);
            }

            let payload = {...apiPayload};

            if (edit) {
                const keys = Object.keys(updatedDiff(initialValues, values.passengers));
                const changedPassengers = keys.map((i) => values.passengers[i]);
                updatePassengers(changedPassengers);
                addNewPassengers(Object.values(addedDiff(initialValues, values.passengers)));

                payload.data = snakeNestedKeys(data);
                payload = removeProperty('passengers', payload);
                dispatch(updateItineraryBooking(payload));
            } else {
                payload.data = snakeNestedKeys(data);
                dispatch(addItineraryBooking(payload));
            }
        }
    });

    useEffect(() => {
        if (transitTypeId === 3 || 4) {
            formik.setFieldValue('vehicle', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transitTypeId]);

    useEffect(() => {
        if (edit && transitTypeId && passengers) {
            setInitialValues([...passengers]);

            const phoneNumber = "+" + phone?.replace(/\D+/g, '');

            formik.setValues({
                transitTypeId: transitTypeId,
                customHeaderTitle: customHeaderTitle,
                departureDay: dateToMyDate(departureDatetimeLocale),
                departureTime: moment(departureDatetimeLocale).isValid() ? moment.parseZone(departureDatetimeLocale) : null,
                transportFrom: transportFrom,
                arrivalDay: dateToMyDate(arrivalDatetimeLocale),
                arrivalTime: moment(arrivalDatetimeLocale).isValid() ? moment.parseZone(arrivalDatetimeLocale) : null,
                transportTo: transportTo,
                price: price,
                saveToLibrary: saveToLibrary,
                providerName: name,
                providerAddress: address,
                providerPhone: phone ? phoneNumber : '',
                providerWebsite: website,
                providerEmail: email,
                passengers: [
                    ...passengers
                ],
                notes: notes,
            });
            if (transitTypeId === 3 || 4) {
                formik.setFieldValue('vehicle', vehicle);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [booking, transitTypeId, booking, edit, departureDatetime, transportFrom, arrivalDatetime, transportTo, price, name, saveToLibrary, vehicle, notes, passengers]);

    useEffect(() => {
        if (startDate) {
            formik.setFieldValue('departureDay', new Date(startDate));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);

    return (
        <form id="transports" onSubmit={formik.handleSubmit}>
            {
                edit ? (
                    <StepByStepDialog
                        description="Edit Transportation"
                        id="add-transport"
                        createTabsDock={createTransportTabsDock}
                        {...props}
                        formik={formik}
                        unlockTabs={true}
                    />
                ) : (
                    <StepByStepDialog
                        description="Add Transportation"
                        id="add-transport"
                        createTabsDock={createTransportTabsDock}
                        {...props}
                        formik={formik}
                        unlockTabs={true}
                    />
                )
            }
            
        </form>
    );
}


export default AddTransport;
