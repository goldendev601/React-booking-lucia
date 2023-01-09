import React, {useEffect, useState} from "react";
import {createFlightTabsDock} from "./flightTabsDock";
import {StepByStepDialog} from "@core/components";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
    addItineraryBooking,
    addItineraryBookingPassenger,
    bookingsSelector,
    updateItineraryBooking, 
    updateItineraryBookingPassenger,
    updateItineraryBookingSegment,
    addItineraryBookingSegment
} from "redux/features/itineraries/bookings/bookingsSlice";
import {useFormik} from "formik";
import {convertDate, convertDateToTime, removeProperty, snakeNestedKeys, dateToMyDate} from "utils";
import moment from "moment";
import {addedDiff, updatedDiff} from "deep-object-diff";
import {bookingFormSelector} from "redux/features/dialogForms/bookingFormSlice";
import {getAirlines, getAirports} from "redux/features/constants/constantsSlice";


const validationSchema = yup.object({
    // customHeaderTitle: yup
    //     .string('Enter flight title')
    //     .required('Flight title is required'),
    segments: yup.array()
        .of(
            yup.object().shape({
                airline: yup.string().required('Airline is required'),
                departureTime: yup.string().required('Departure Time is required'),
                arrivalTime: yup.string().required('Arrival Time is required'),
                departureDay: yup.string().required('Departure Date is required'),
                arrivalDay: yup.string().required('Arrival Date is required'),   
                from: yup.string().required('Departure City is required'),   
                to: yup.string().required('Arrival City is required'),    
                flightNumber: yup.string().required('Flight Number is required'),           
            })
        ),
    passengers: yup.array()
        .of(
            yup.object().shape({
                name: yup.string().required(),
                seat: yup.string(),
                class: yup.string(),
                frequent_flyer_number: yup.string(),
                ticket_number: yup.string(),
            })
        )
});

const AddFlight = ({...props}) => {
    const dispatch = useDispatch();
    const {booking, passengers, segments} = useSelector(bookingsSelector);
    const {category} = useSelector(bookingFormSelector)
    // const {airline, flightNumber, flightFrom, flightTo, departureDateTime, arrivalDateTime, terminal} = flights || {};
    const {edit, apiPayload} = props;
    const [initialValues, setInitialValues] = useState([]);
    const [initialSegments, setInitialSegments] = useState([])

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

    const addNewSegments = (newSegments) => {
        if (edit) {
            if (newSegments.length !== 0) {
                newSegments.forEach((segment) => {
                    const {id} = segment;
                    const apiPayload = {
                        itineraryId: booking?.itineraryId,
                        bookingId: booking?.id,
                        flightSegmentId: id,
                        bookingCategory: category,
                        segment: snakeNestedKeys({
                            airline: segment.airline,
                            airlineOperator: segment.airlineOperator,
                            flightFrom: segment.from,
                            flightTo: segment.to,
                            flightNumber: segment.flightNumber,
                            departureTime: convertDateToTime(segment.departureTime),
                            arrivalTime: convertDateToTime(segment.arrivalTime),
                            departureDay: convertDate(segment.departureDay),
                            arrivalDay: convertDate(segment.arrivalDay),
                            durationInMinutes: segment.durationInMinutes,
                        })
                    }
                    dispatch(addItineraryBookingSegment(apiPayload))
                });
            }
        }
    }

    const updateSegments = (changedSegments) => {
        if (edit) {
            if (changedSegments.length !== 0) {
                changedSegments.forEach((segment) => {
                    const {id} = segment;
                    const apiPayload = {
                        itineraryId: booking?.itineraryId,
                        bookingId: booking?.id,
                        flightSegmentId: id,
                        bookingCategory: category,
                        segment: snakeNestedKeys({
                            airline: segment.airline,
                            airlineOperator: segment.airlineOperator,
                            flightFrom: segment.from,
                            flightTo: segment.to,
                            flightNumber: segment.flightNumber,
                            departureTime: convertDateToTime(segment.departureTime),
                            arrivalTime: convertDateToTime(segment.arrivalTime),
                            departureDay: convertDate(segment.departureDay),
                            arrivalDay: convertDate(segment.arrivalDay),
                            durationInMinutes: segment.durationInMinutes,
                        })
                    }
                    dispatch(updateItineraryBookingSegment(apiPayload))
                });
            }
        }
    }

    const {
        price,
        confirmationNumber,
        // customHeaderTitle,
        checkInUrl,
        cancelPolicy,
        notes
    } = booking || {};

    const formik = useFormik({
        initialValues: {
            price: '',
            confirmationNumber: '',
            // customHeaderTitle: '',
            checkInUrl: '',
            notes: '',
            cancelPolicy: '',
            segments: [],
            passengers: [],           
        },
        
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let data = {...values};

            if (data.price === '' || data.price === null) {
                data = removeProperty('price', data);
            }

            let payload = {...apiPayload};

            if (edit) {

                const keys = Object.keys(updatedDiff(initialValues, values.passengers));
                const changedPassengers = keys.map((i) => values.passengers[i]);
                updatePassengers(changedPassengers);
                addNewPassengers(Object.values(addedDiff(initialValues, values.passengers)));

                const segmentKeys = Object.keys(updatedDiff(initialSegments, values.segments));
                const changedSegments = segmentKeys.map((i) => values.segments[i]);
                updateSegments(changedSegments);
                addNewSegments(Object.values(addedDiff(initialSegments, values.segments)));

                payload.data = snakeNestedKeys(data);

                payload = removeProperty('passengers', payload);
                payload = removeProperty('segments', payload);

                dispatch(updateItineraryBooking(payload))

            } else {
                const formData = new FormData();
                
                formData.append('price', data.price)
                if (data.confirmationNumber) {
                    formData.append('confirmation_number', data.confirmationNumber)
                }
                // formData.append('custom_header_title', data.customHeaderTitle)
                formData.append('check_in_url', data.checkInUrl)
                formData.append('notes', data.notes)
                formData.append('cancel_policy', data.cancelPolicy)      

                // formData.append('passengers', data.passengers)

                var passengers = data.passengers;
                for(let index = 0; index < passengers.length; index ++ ) {
                    formData.append(`passengers[${index}][name]`, passengers[index].name)
                    formData.append(`passengers[${index}][class]`, passengers[index].class)
                    formData.append(`passengers[${index}][seat]`, passengers[index].seat)
                    formData.append(`passengers[${index}][frequent_flyer_number]`, passengers[index].frequentFlyerNumber)
                    if (passengers[index].ticketNumber) {
                        formData.append(`passengers[${index}][ticket_number]`, passengers[index].ticketNumber)
                    }
                }

                var segments = data.segments;
                for(let index = 0; index < segments.length; index ++ ) {
                    formData.append(`segments[${index}][airline]`, segments[index].airline)
                    if (segments[index].airlineOperator) {
                        formData.append(`segments[${index}][airline_operator]`, segments[index].airlineOperator)
                    }
                    formData.append(`segments[${index}][flight_from]`, segments[index].from)
                    formData.append(`segments[${index}][flight_to]`, segments[index].to)
                    formData.append(`segments[${index}][flight_number]`, segments[index].flightNumber)
                    if (moment(segments[index].departureTime).isValid()) {
                        formData.append(`segments[${index}][departure_time]`, convertDateToTime(segments[index].departureTime))
                    }
                    if (moment(segments[index].arrivalTime).isValid()) {
                        formData.append(`segments[${index}][arrival_time]`, convertDateToTime(segments[index].arrivalTime))
                    }
                    formData.append(`segments[${index}][departure_day]`, convertDate(segments[index].departureDay))
                    formData.append(`segments[${index}][arrival_day]`, convertDate(segments[index].arrivalDay))
                    if (segments[index].durationInMinutes && segments[index].durationInMinutes !== 0 && segments[index].durationInMinutes !== "0") {
                        formData.append(`segments[${index}][duration_in_minutes]`, segments[index].durationInMinutes)
                    }
                }
                payload.data = formData;
                dispatch(addItineraryBooking(payload));
            }
        }
    });

    useEffect(() => {
        if (edit && passengers && segments) {
            setInitialValues([...passengers]);
            const currentSegments = [
                ...segments.map(segment => {
                    return {
                        ...segment,
                        departureDay: segment.startDateLocale ? dateToMyDate(segment.startDateLocale) : null,
                        arrivalDay: segment.endDateLocale ? dateToMyDate(segment.endDateLocale) : null,
                        departureTime: moment(segment.startDateLocale).isValid() ? moment.parseZone(segment.startDateLocale) : null,
                        arrivalTime: moment(segment.endDateLocale).isValid() ? moment.parseZone(segment.endDateLocale) : null,
                    }
                })
            ]
            setInitialSegments([...currentSegments]);
            formik.setValues({
                confirmationNumber: confirmationNumber,
                // customHeaderTitle: customHeaderTitle,
                price: price,
                checkInUrl: checkInUrl,
                passengers: [
                    ...passengers
                ],
                segments: [
                    ...currentSegments
                ],
                notes: notes,
                cancelPolicy: cancelPolicy
            });
        }
    }, [booking, edit, passengers, segments]);

    useEffect(() => {
        dispatch(getAirlines());
        dispatch(getAirports());
    }, [dispatch]);

    return (
        <form id="flights" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Add Flight"
                id="add-flight"
                createTabsDock={createFlightTabsDock}
                {...props}
                formik={formik}
                unlockTabs={true}
            />
        </form>
    );
}


export default AddFlight;
