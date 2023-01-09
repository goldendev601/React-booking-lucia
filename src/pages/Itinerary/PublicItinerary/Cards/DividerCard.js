import React from "react";
import {previewStyles} from "styles/previewStyles";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";


const BookingCardContent = styled.div`
    width: 100%;
    text-align: center;
`;

const DividerCard = ({ booking, showPriceOnShare, itineraryPropertyDesignId, ...rest }) => {
    

    const themeStyle = previewStyles[itineraryPropertyDesignId - 1];

    const useStyles = makeStyles({
        root1: {
            background: themeStyle.hotelcardRoot1BackgroundColor,
            marginTop: '150px'
        },
        root2: {
            background: themeStyle.hotelcardRoot2BackgroundColor,
            marginTop: '150px'
        },
    });

    const classes = useStyles();

    return (
        <BookingCardContent>
            <div style={{width: '100%', margin: 'auto', textAlign: 'center'}}>
                <hr style={{border: '1px solid #000000', opacity: 0.3, width: '266px', margin: 'auto'}}  />
            </div>
        </BookingCardContent>
    );
}

export default DividerCard;
