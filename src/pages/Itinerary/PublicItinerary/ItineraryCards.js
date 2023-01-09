import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import cardSelector from "./Cards/cardSelector";
import moment from "moment";
import { previewStyles } from "styles/previewStyles";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ItineraryCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ItineraryDate = styled.div`
  margin: 50px 0;
`;

const ItineraryHeader = styled.div`
    font-size: 32px;
    line-height: 50px;
    font-weight: 600;
    margin-left: 75px;
    @media (max-width:600px) {
        margin-left: 30px;
        margin-right: 30px;
    }  
`;

const ItineraryCardsSpacing = styled.div`
  & > div {
    margin-bottom: 50px;
  }
`;

const useStyles = makeStyles({
    cardContainer: {
        display: 'flex'
    }
});


const ItineraryCards = ({ bookings, showPriceOnShare, itineraryPropertyDesignId }) => {
    const classes = useStyles();
    const themeStyle = previewStyles[itineraryPropertyDesignId - 1];
    return (
        <ItineraryCardsContainer id='#itinerary'>
            <ItineraryCardsSpacing>
                {bookings && Object.keys(bookings).map((date) =>
                    <div id={`#booking${date}`} key={date}>
                        {bookings[date].length !== 0 &&
                            <ItineraryDate>
                                <ItineraryHeader style={{ color: themeStyle.itineraryBookingDateColor, fontFamily: themeStyle.itineraryBookingDateFontFamily }}>
                                    {moment(date).format("dddd, MMMM D, YYYY")}
                                </ItineraryHeader>
                            </ItineraryDate>
                        }
                        {bookings[date].length > 0 &&
                            <Grid container spacing={2}>
                                {
                                    bookings[date].map((bookingItem, index) => {
                                        if (['Hotel', 'Flight', 'Cruise', 'Divider', 'Header', 'Transportation'].includes(bookingItem.category)) {
                                            return (
                                                <Grid item xs={12}>
                                                    <ItineraryCardsSpacing key={index}>
                                                        {cardSelector(bookingItem.category, bookingItem, showPriceOnShare, itineraryPropertyDesignId)}
                                                    </ItineraryCardsSpacing>
                                                </Grid>
                                            )
                                        }
                                        return (
                                            <Grid item md={6} xs={12} key={index}>
                                                {(cardSelector(bookingItem.category, bookingItem, showPriceOnShare, itineraryPropertyDesignId))}
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        }
                    </div>
                )}
            </ItineraryCardsSpacing>
        </ItineraryCardsContainer>
    );
}

export default ItineraryCards;