import React, {useState} from "react";
import {IconButton} from "@material-ui/core";
import {EditPencil, Trash, NavArrowDown, NavArrowUp, Copy} from "iconoir-react";
import {colors} from "styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {AlertDialog, NotificationHandler} from "@core/components";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {
    bookingsSelector,
    clearState,
    deleteItineraryBooking, getHotelAmenities, duplicateItineraryBooking,
    getItineraryBooking, getItineraryBookingPassengers,
    getItineraryBookingSegments
} from "redux/features/itineraries/bookings/bookingsSlice";
import {setBookingCategory} from "redux/features/dialogForms/bookingFormSlice";
import {setBookingFormOpen, setEdit} from "redux/features/dialogForms/dialogFormsOpenStateSlice";

const BookingCardOptionsContainer = styled.div`
//   position: absolute;
//   right: 0;
`;

const BookingCardOptionsIconContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
`

const BookingCardDividerOptions = ({bookingId, category, categoryId}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [openAlert, setOpenAlert] = useState(false);

    const bookingsThatHasPassengers = ['hotels', 'cruises', 'flights', 'transports'];
    const bookingsThatHasSegments = ['flights'];
    const bookingsThatHasAmenities = ['hotels'];

    const {isDeletedSuccess, isDeletedError, errorMessage} = useSelector(bookingsSelector);

    const handleOpenAlert = () => setOpenAlert(prevState => !prevState);

    const bookingCategorySwitch = (category) => {
        switch (category) {
            case 'Hotel':
                return 'hotels'
            case 'Flight':
                return 'flights'
            case 'Cruise':
                return 'cruises'
            case 'Other Notes':
                return 'others'
            case 'Concierge':
                return 'concierges'
            case 'Tour Activity':
                return 'tours'
            case 'Insurance':
                return 'insurances'
            case 'Transportation':
                return 'transports'
            case 'Divider':
                return 'dividers'
            default:
                return null
        }
    }

    const deleteSelectedItineraryBooking = () => {
        console.log(bookingId)
        const apiPayload = {
            bookingId: bookingId,
            itineraryId: id,
            bookingCategory: bookingCategorySwitch(category)
        }
        dispatch(deleteItineraryBooking(apiPayload));
        handleOpenAlert();
    }

    const copyBooking = () => {
        dispatch(setBookingCategory(bookingCategorySwitch(category)));
        dispatch(setEdit(true));
        const apiPayload = {
            itineraryId: id,
            data: {
                booking_id: bookingId,
                category_id: categoryId
            }
        }
        dispatch(duplicateItineraryBooking(apiPayload));
    }

    const editBooking = () => {
        dispatch(setBookingCategory(bookingCategorySwitch(category)));
        dispatch(setEdit(true));
        dispatch(setBookingFormOpen(true));
        const apiPayload = {
            itineraryId: id,
            bookingId: bookingId,
            bookingCategory: bookingCategorySwitch(category),
        }
        dispatch(getItineraryBooking(apiPayload));
        if (bookingsThatHasPassengers.some(word => bookingCategorySwitch(category).includes(word))) {
            dispatch(getItineraryBookingPassengers(apiPayload));
        }
        if (bookingsThatHasAmenities.some(word => bookingCategorySwitch(category).includes(word))) {
            dispatch(getHotelAmenities(apiPayload));
        }
        if (bookingsThatHasSegments.some(word => bookingCategorySwitch(category).includes(word))) {
            dispatch(getItineraryBookingSegments(apiPayload));
        }
    }

    return (
        <BookingCardOptionsContainer>
            <NotificationHandler
                clearState={clearState}
                isSuccess={isDeletedSuccess}
                isError={isDeletedError}
                errorMessage={errorMessage}
                successMessage="Itinerary Booking is successfully deleted"
            >
                <AlertDialog
                    open={openAlert}
                    handleClose={handleOpenAlert}
                    handleClick={deleteSelectedItineraryBooking}
                    type="remove"
                />
                <BookingCardOptionsIconContainer>
                    <IconButton
                        color="secondary"
                        aria-label="delete-action"
                        onClick={handleOpenAlert}
                        style={{paddingRight: '0px'}}
                    >
                        <Trash width="18px" height="18px" color={colors.brand} />
                    </IconButton>
                </BookingCardOptionsIconContainer>
            </NotificationHandler>
        </BookingCardOptionsContainer>
    );
};

export default React.memo(BookingCardDividerOptions);
