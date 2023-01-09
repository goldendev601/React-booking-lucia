import React from "react";
import {previewStyles} from "styles/previewStyles";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Typography } from "@material-ui/core";


const BookingCardContent = styled.div`
    width: 100%;
    text-align: center;
`;

const HeaderCard = ({ booking, showPriceOnShare, itineraryPropertyDesignId, ...rest }) => {
    
    const {
        customHeaderTitle,
        categoryBookingId
    } = booking;

    const themeStyle = previewStyles[itineraryPropertyDesignId - 1];

    const useStyles = makeStyles({
        customHeaderTitleInfo: {
            lineHeight: '50px',
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'normal',
            fontSize: '40px',
            color: '#BA886E',
            letterSpacing: '0.05em',
            fontWeight: '600'
        }
    });

    const classes = useStyles();

    return (
        <BookingCardContent>
            <div style={{width: '100%', margin: 'auto', textAlign: 'center'}}>
                <Typography id={categoryBookingId} className={classes.customHeaderTitleInfo} component="h4">{customHeaderTitle}</Typography>
            </div>
        </BookingCardContent>
    );
}

export default HeaderCard;
