import React from "react";
import BookingTitle from "./BookingDetailCardComponents/BookingTitle";
import BookingCard from "./BookingDetailCardComponents/BookingCard";
import BookingCardOptions from "./BookingDetailCardComponents/BookingCardOptions";
import BookingCardHeaderContent from "./BookingDetailCardComponents/BookingCardHeaderContent";
import {BookingCardHeader} from "./BookingDetailCardComponents/BookingCardHeader";
import {Draggable} from "./BookingDetailCardComponents/Draggable";
import GridSpacing from "./BookingDetailCardComponents/GridSpacing";
import {Typography, Grid, useMediaQuery, useTheme} from "@material-ui/core";
import {Text} from "../Text";
import BookingGeneralInformation from "./BookingDetailCardComponents/BookingGeneralInformation";

const HeaderBookingCard = ({booking, dragHandleProps, ...rest}) => {
    const {bookingId, customHeaderTitle, categoryId, category} = booking;

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
        defaultMatches: true
    });    

    return (
        <BookingCard {...rest}>
            <BookingCardHeader>
                <Draggable dragHandleProps={dragHandleProps}/>
                <BookingCardHeaderContent>
                    <BookingTitle>{customHeaderTitle}</BookingTitle>
                    <BookingCardOptions category={category} bookingId={bookingId} categoryId={categoryId}/>
                </BookingCardHeaderContent>
            </BookingCardHeader>
            <BookingGeneralInformation>
                <GridSpacing>
                    <Grid container spacing={isMobile ? 2 : 5}>
                    </Grid>
                </GridSpacing>
            </BookingGeneralInformation>
        </BookingCard>
    );
}

export default HeaderBookingCard;
