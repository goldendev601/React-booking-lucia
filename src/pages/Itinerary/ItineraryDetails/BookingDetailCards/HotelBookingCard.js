import React, {useState} from "react";
import {Text} from "../Text";
import BookingTitle from "./BookingDetailCardComponents/BookingTitle";
import BookingGeneralInformation from "./BookingDetailCardComponents/BookingGeneralInformation";
import {Grid, Box, useMediaQuery, useTheme} from "@material-ui/core";
import GridSpacing from "./BookingDetailCardComponents/GridSpacing";
import BookingCard from "./BookingDetailCardComponents/BookingCard";
import BookingCardOptions from "./BookingDetailCardComponents/BookingCardOptions";
import BookingCardHeaderContent from "./BookingDetailCardComponents/BookingCardHeaderContent";
import {BookingCardHeader} from "./BookingDetailCardComponents/BookingCardHeader";
import {dateToMyDate} from "utils";
import {Draggable} from "./BookingDetailCardComponents/Draggable";
import HotelRooms from "../../PublicItinerary/Cards/HotelRoom";
import { formatPhoneNumberIntl } from 'react-phone-number-input';

const HotelBookingCard = ({booking, dragHandleProps, ...rest}) => {
    const {
        bookingId,
        title,
        address,
        phone,
        checkInDate,
        checkOutDate,
        rooms,
        category,
        categoryId
    } = booking;

    

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
        defaultMatches: true
    });

    const option = {
        day : '2-digit',
        month : '2-digit',
        year : 'numeric'
    }

    const [showExpand, setShowExpand] = useState(false)

    return (
        <BookingCard {...rest}>
            <BookingCardHeader>
                <Draggable dragHandleProps={dragHandleProps}/>
                <BookingCardHeaderContent>
                    <BookingTitle>{title}</BookingTitle>
                    <BookingCardOptions category={category} bookingId={bookingId} showExpand={showExpand} setShowExpand={setShowExpand} rooms={rooms} categoryId={categoryId} />
                </BookingCardHeaderContent>
            </BookingCardHeader>
            <Text mb="10px">{address}</Text>
            <Text mb="20px">{formatPhoneNumberIntl(phone)}</Text>
            <BookingGeneralInformation>
                <GridSpacing>
                    <Grid container spacing={isMobile ? 2 : 6}>
                        <Grid item >
                            <Text bold>Check In:</Text>
                        </Grid>
                        <Grid item>
                            <Text>{dateToMyDate(checkInDate).toLocaleDateString('en-US', option)}</Text>
                        </Grid>
                        <Grid item>
                            <Text bold>Check Out:</Text>
                        </Grid>
                        <Grid item>
                            <Text>{dateToMyDate(checkOutDate).toLocaleDateString('en-US', option)}</Text>
                        </Grid>
                    </Grid>
                    {
                        showExpand && (
                            <HotelRooms rooms={rooms} borderTop={true}/>
                        )
                    }
                </GridSpacing>
            </BookingGeneralInformation>
        </BookingCard>
    );
}

export default HotelBookingCard;
