import React, {useEffect, useState} from "react";
import {StepByStepDialog} from "@core/components";
import {createHotelTabsDock} from "./hotelTabsDock";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
    addHotelAmenity,
    addItineraryBooking,
    bookingsSelector,
    updateHotelAmenity,
    updateItineraryBooking,
    resetImages,
    resetBooking
} from "redux/features/itineraries/bookings/bookingsSlice";
import {useFormik} from "formik";
import {convertDate, convertDateToTime, dateToMyDate, removeProperty, snakeNestedKeys} from "utils";
import moment from "moment";
import {addedDiff, updatedDiff} from "deep-object-diff";
import {addHotelRoom, updateHotelRoom } from "redux/features/rooms/roomsSlice";
import {getAmenities} from "redux/features/constants/constantsSlice";

const notesFieldNames = ['notes', 'cancelPolicy'];

const validationSchema = yup.object({
    providerName: yup
        .string('Enter hotel name')
        .required('hotel name is required'),
    checkInDate: yup
        .string('Select check in date')
        .required('check in date is required'),
    checkOutDate: yup
        .string('Select check out date')
        .required('check out date is required'),
    // checkInTime: yup
    //     .string('Select check in time')
    //     .required('check in time is required'),
    // checkOutTime: yup
    //     .string('Select check out time')
    //     .required('check out time is required'),
    passengers: yup.array()
        .of(
            yup.object().shape({
                name: yup.string(),
                room: yup.string(),
            })
        ),
    amenities: yup.array()
        .of(
            yup.object().shape({
                amenity: yup.string(),
            })
        ),
    rooms: yup.array()
        .of(
            yup.object().shape({
                roomType: yup.string().required(),
                beddingType: yup.string().required(),
            })
        )
});

const AddHotel = ({...props}) => {
    const dispatch = useDispatch();
    const {startDate, booking, passengers, amenities} = useSelector(bookingsSelector);
    const {edit, apiPayload} = props;

    const {
        confirmationReference,
        checkInTime,
        checkOutTime,
        checkInDate,
        checkOutDate,
        customHeaderTitle,
        supplier,
        rooms
    } = booking || {};


    const {name} = supplier || {};    
    const {saveToLibrary} = supplier || {};
    const {address, email, phone, website} = supplier || {};
    const {notes, cancelPolicy} = booking || {};

    const [roomsInitialValues, setRoomsInitialValues] = useState([]);
    const [amenitiesInitialValues, setAmenitiesInitialValues] = useState([]);

    const addNewAmenities = (newAmenities) => {
        if (edit) {
            if (newAmenities.length !== 0) {
                newAmenities.forEach((newAmenity) => {
                    const {amenity} = newAmenity;
                    const apiPayload = {
                        itineraryId: booking?.itineraryId,
                        bookingId: booking?.id,
                        amenity: snakeNestedKeys({
                            amenity: amenity,
                        })
                    }
                    dispatch(addHotelAmenity(apiPayload));
                });
            }
        }
    }

    const updateAmenities = (changedAmenities) => {
        if (edit) {
            if (changedAmenities.length !== 0) {
                changedAmenities.forEach((changedAmenity) => {
                    const {id, amenity} = changedAmenity;
                    const apiPayload = {
                        itineraryId: booking?.itineraryId,
                        bookingId: booking?.id,
                        hotelAmenityId: id,
                        amenity: snakeNestedKeys({
                            amenity: amenity,
                        })
                    }
                    dispatch(updateHotelAmenity(apiPayload))
                });
            }
        }
    }

    const addNewRooms = (newRooms) => {
        if (edit) {
            if (newRooms.length !== 0) {
                newRooms.forEach((room) => {
                    const {
                        roomType,
                        beddingType,
                        guestName,
                        roomRate,
                        currencyId,
                        roomDescription,
                        numberOfGuests,
                        imageUrl
                    } = room || {};

                    const formData = new FormData();

                    if (imageUrl) {
                        formData.append('image_url', imageUrl)
                    }
                    
                    formData.append('room_type', roomType)
                    formData.append('bedding_type', beddingType)
                    formData.append('guest_name', guestName)
                    formData.append('room_rate', roomRate)
                    formData.append('currency_id', currencyId)
                    formData.append('room_description', roomDescription)

                    if (numberOfGuests) {
                        formData.append('number_of_guests', numberOfGuests)
                    } else {
                        formData.append('number_of_guests', 0)
                    }

                    const apiPayload = {
                        itineraryId: booking?.itineraryId,
                        bookingId: booking?.id,
                        room: formData,
                    }
                    
                    dispatch(addHotelRoom(apiPayload));
                });
            }
        }
    }

    const updateRooms = (changedRooms) => {
        if (edit) {
            
            if (changedRooms.length !== 0) {
                changedRooms.forEach((room) => {
                    const {
                        id,
                        roomType,
                        beddingType,
                        guestName,
                        roomRate,
                        currencyId,
                        roomDescription,
                        numberOfGuests,
                        imageUrl
                    } = room || {};

                    const formData = new FormData();
                    if (imageUrl instanceof File) {
                        formData.append('image_url', imageUrl)
                    }
                    formData.append('room_type', roomType)
                    formData.append('bedding_type', beddingType)
                    formData.append('guest_name', guestName)
                    if (roomRate) {
                        formData.append('room_rate', roomRate)
                    } else {
                        formData.append('room_rate', "")
                    }
                    
                    formData.append('currency_id', currencyId)
                    formData.append('room_description', roomDescription)

                    if (numberOfGuests) {
                        formData.append('number_of_guests', numberOfGuests)
                    } else {
                        formData.append('number_of_guests', 0)
                    }
                    
                    const apiPayload = {
                        itineraryId: booking?.itineraryId,
                        bookingId: booking?.id,
                        hotelRoomId: id,
                        room: formData,
                    }
                    dispatch(updateHotelRoom(apiPayload));
                });
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            providerName: '',
            checkInTime: null,
            checkOutTime: null,
            checkInDate: null,
            checkOutDate: null,
            customHeaderTitle: '',
            confirmationReference: '',
            saveToLibrary: true,
            providerAddress: '',
            providerPhone: '',
            providerWebsite: '',
            providerEmail: '',
            passengers: [],
            amenities: [],
            rooms: [],
            notes: '',
            cancelPolicy: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let data = {...values}
            
            if (data.providerPhone) {
                data.providerPhone = data.providerPhone.replace(/\s/g, "");
            } else {
                data.providerPhone = '';
            }

            data.checkInDate = convertDate(values.checkInDate);
            data.checkOutDate = convertDate(values.checkOutDate);
            
            if (moment(data.checkInTime).isValid()) {
                data.checkInTime = convertDateToTime(values.checkInTime);
            }
            if (moment(data.checkOutTime).isValid()) {
                data.checkOutTime = convertDateToTime(values.checkOutTime);
            }
            let payload = {...apiPayload};

            if (edit) {
                const roomsKeys = Object.keys(updatedDiff(roomsInitialValues, values.rooms));
                const changedRooms = roomsKeys.map((i) => values.rooms[i]);
                updateRooms(changedRooms);
                const imageUpdatedRooms = [];
                for(let i = 0; i < roomsInitialValues.length; i ++ ) {
                    if (roomsInitialValues[i].imageUrl !== values.rooms[i].imageUrl) {
                        imageUpdatedRooms.push(values.rooms[i])
                    }
                }
                updateRooms(imageUpdatedRooms);
                addNewRooms(Object.values(addedDiff(roomsInitialValues, values.rooms)));

                const amenitiesKeys = Object.keys(updatedDiff(amenitiesInitialValues, values.amenities));
                const changedAmenities = amenitiesKeys.map((i) => values.amenities[i]);
                updateAmenities(changedAmenities);
                addNewAmenities(Object.values(addedDiff(amenitiesInitialValues, values.amenities)));

                payload.data = snakeNestedKeys(data);
                payload = removeProperty('passengers', payload);

                dispatch(updateItineraryBooking(payload));
            } else {
                const formData = new FormData();
                formData.append('check_in_date', data.checkInDate)
                formData.append('check_out_date', data.checkOutDate)
                formData.append('confirmation_reference', data.confirmationReference)
                formData.append('provider_name', data.providerName)
                formData.append('provider_address', data.providerAddress)
                formData.append('provider_website', data.providerWebsite)
                formData.append('provider_phone', data.providerPhone)
                formData.append('provider_email', data.providerEmail)
                formData.append('save_to_library', data.saveToLibrary)
                if (data.checkInTime) {
                    formData.append('check_in_time', data.checkInTime)
                }
                if (data.checkOutTime) {
                    formData.append('check_out_time', data.checkOutTime)
                }
                formData.append('notes', data.notes)
                formData.append('custom_header_title', data.customHeaderTitle)
                var rooms = data.rooms;
                for(let index = 0; index < rooms.length; index ++ ) {
                    formData.append(`rooms[${index}][room_type]`, rooms[index].roomType)
                    formData.append(`rooms[${index}][bedding_type]`, rooms[index].beddingType)
                    formData.append(`rooms[${index}][guest_name]`, rooms[index].guestName)
                    formData.append(`rooms[${index}][room_rate]`, rooms[index].roomRate)
                    if (rooms[index].imageUrl) {
                        formData.append(`rooms[${index}][image_url]`, rooms[index].imageUrl)
                    }
                    formData.append(`rooms[${index}][currency_id]`, rooms[index].currencyId)
                    formData.append(`rooms[${index}][room_description]`, rooms[index].roomDescription)
                    formData.append(`rooms[${index}][number_of_guests]`, rooms[index].numberOfGuests)
                }

                var amenities = data.amenities;
                for(let index = 0; index < amenities.length; index ++ ) {
                    formData.append(`amenities[${index}]`, amenities[index].amenity)
                }
                
                payload.data = formData;
                dispatch(addItineraryBooking(payload));
            }
        }
    });

    useEffect(() => {
        console.log(edit);
        console.log(booking, passengers, amenities, supplier, rooms);

        if (edit && passengers && amenities && rooms && supplier) {
            const phoneNumber = "+" + phone?.replace(/\D+/g, '');

            setRoomsInitialValues([...rooms]);

            const data = amenities.map(({amenity, id}) => ({
                amenity,
                id
            }));
            setAmenitiesInitialValues([...data]);

            formik.setValues({
                providerName: name,
                checkInTime: moment(checkInTime, 'hh:mm A').isValid() ? moment(checkInTime, 'hh:mm A') : null,
                checkOutTime: moment(checkOutTime, 'hh:mm A').isValid() ? moment(checkOutTime, 'hh:mm A') : null,
                // checkInDate: new Date(checkInDate),
                // checkOutDate: new Date(checkOutDate),
                checkInDate: dateToMyDate(checkInDate),
                checkOutDate: dateToMyDate(checkOutDate),
                customHeaderTitle: customHeaderTitle,
                confirmationReference: confirmationReference,
                saveToLibrary: saveToLibrary,
                rooms: [
                    ...rooms
                ],
                amenities: [
                    ...data
                ],
                providerAddress: address,
                providerPhone: phone ? phoneNumber : '',
                providerWebsite: website,
                providerEmail: email,
                notes: notes,
                cancelPolicy: cancelPolicy,
            });
        }
        if (!edit) {
            dispatch(resetBooking())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [booking, edit, passengers, amenities, supplier, rooms]);

    useEffect(() => {
        if (startDate) {
            formik.setFieldValue('checkInDate', dateToMyDate(startDate));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);

    useEffect(() => {
        dispatch(getAmenities());
        dispatch(resetImages());
    }, [dispatch]);

    return (
        <form id="hotels" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Add Hotel Booking"
                id="add-hotel"
                createTabsDock={createHotelTabsDock}
                {...props}
                formik={formik}
                unlockTabs={true}
            />
        </form>
    );
}

export default AddHotel;
