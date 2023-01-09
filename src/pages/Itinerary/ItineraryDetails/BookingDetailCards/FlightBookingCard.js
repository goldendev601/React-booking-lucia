import React from "react";
import {Text} from "../Text";
import BookingTitle from "./BookingDetailCardComponents/BookingTitle";
import BookingGeneralInformation from "./BookingDetailCardComponents/BookingGeneralInformation";
import {Grid, useMediaQuery, useTheme} from "@material-ui/core";
import GridSpacing from "./BookingDetailCardComponents/GridSpacing";
import BookingCard from "./BookingDetailCardComponents/BookingCard";
import BookingCardOptions from "./BookingDetailCardComponents/BookingCardOptions";
import BookingCardHeaderContent from "./BookingDetailCardComponents/BookingCardHeaderContent";
import {BookingCardHeader} from "./BookingDetailCardComponents/BookingCardHeader";
import {dateToMyDate} from "utils";
import {Draggable} from "./BookingDetailCardComponents/Draggable";

const FlightBookingCard = ({booking, dragHandleProps, ...rest}) => {
    const {bookingId, title, category, startDateLocale, endDateLocale, categoryId} = booking; 

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
        defaultMatches: true
    });

    const option = {
        day : '2-digit',
        month : '2-digit',
        year : 'numeric'
    }

    return (
        <BookingCard {...rest}>
            <BookingCardHeader>
                <Draggable dragHandleProps={dragHandleProps}/>
                <BookingCardHeaderContent>
                    <BookingTitle>{title}</BookingTitle>
                    <BookingCardOptions category={category} bookingId={bookingId} categoryId={categoryId}/>
                </BookingCardHeaderContent>
            </BookingCardHeader>
            <BookingGeneralInformation>
                    <GridSpacing>
                        <Grid container columns={8} spacing={isMobile ? 2 : 6}>
                            <Grid item>
                                <Text bold>Start Date:</Text>
                            </Grid>
                            <Grid item>
                                {
                                    startDateLocale && (
                                        <Text>{dateToMyDate(startDateLocale).toLocaleDateString('en-US', option)}</Text>
                                    )
                                }
                            </Grid>
                            <Grid item>
                                <Text bold>End Date:</Text>
                            </Grid>
                            <Grid item>
                                {
                                    startDateLocale && (
                                        <Text>{dateToMyDate(endDateLocale).toLocaleDateString('en-US', option)}</Text>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </GridSpacing>
            </BookingGeneralInformation>
        </BookingCard>
    );
}

export default FlightBookingCard;
