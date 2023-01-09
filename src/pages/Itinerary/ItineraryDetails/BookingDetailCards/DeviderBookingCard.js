import React from "react";
import {Text} from "../Text";
import BookingTitle from "./BookingDetailCardComponents/BookingTitle";
import BookingGeneralInformation from "./BookingDetailCardComponents/BookingGeneralInformation";
import {Grid, useMediaQuery, useTheme} from "@material-ui/core";
import GridSpacing from "./BookingDetailCardComponents/GridSpacing";
import BookingCard from "./BookingDetailCardComponents/BookingCard";
import BookingCardDividerOptions from "./BookingDetailCardComponents/BookingCardDividerOptions";
import {BookingCardHeader} from "./BookingDetailCardComponents/BookingCardHeader";
import BookingCardHeaderContent from "./BookingDetailCardComponents/BookingCardHeaderContent";
import {Draggable} from "./BookingDetailCardComponents/Draggable";
import { formatPhoneNumberIntl } from 'react-phone-number-input';

const DeviderBookingCard = ({booking, dragHandleProps, ...rest}) => {
    const {
        bookingId,
        category,
        categoryId
    } = booking;

    const theme = useTheme();

    return (
        <BookingCard {...rest}>
            <BookingCardHeader>
                <Draggable dragHandleProps={dragHandleProps}/>
                <BookingCardHeaderContent>
                    <div style={{width: '100%'}}>
                        <hr style={{border: '1px solid #000000', opacity: 0.4, marginTop: '12px'}}  />
                    </div>
                    <BookingCardDividerOptions category={category} bookingId={bookingId} categoryId={categoryId}/>
                </BookingCardHeaderContent>
            </BookingCardHeader>
            <Text mb="10px"></Text>
            <Text mb="20px"></Text>
            <BookingGeneralInformation>
            </BookingGeneralInformation>
        </BookingCard>
    );
}

export default DeviderBookingCard;
