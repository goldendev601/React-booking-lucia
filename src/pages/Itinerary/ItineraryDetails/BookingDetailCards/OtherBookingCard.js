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

const OtherBookingCard = ({booking, dragHandleProps, ...rest}) => {
    const {bookingId, title, category, priority, notes, categoryId} = booking;

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
        defaultMatches: true
    });    

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
                    <Grid container spacing={isMobile ? 2 : 5}>
                        <Grid item>
                            <Text bold>Priority:</Text>
                        </Grid>
                        <Grid item>
                            <Text>{priority}</Text>
                        </Grid>
                        <Grid item>
                            <Text bold>Notes:</Text>
                        </Grid>
                        <Grid item>
                            {/* <Text>{notes}</Text> */}
                            {notes && <Typography component="p" dangerouslySetInnerHTML={{__html: notes}} />} 
                        </Grid>
                    </Grid>
                </GridSpacing>
            </BookingGeneralInformation>
        </BookingCard>
    );
}

export default OtherBookingCard;
