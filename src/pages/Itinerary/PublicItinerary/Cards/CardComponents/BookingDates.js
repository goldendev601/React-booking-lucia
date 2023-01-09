import {BookingInfo, Space, StyledB, StyledP} from "./StyledComponents";
import moment from "moment";
import React from "react";

const BookingDates = ({startDate, endDate, startDatePlaceholder, endDatePlaceholder}) => {
    return (
        <BookingInfo>
            <StyledB>{startDatePlaceholder}<Space/></StyledB>
            <StyledP>{new Date(startDate).toLocaleDateString('en-GB')}</StyledP>,<Space/>
            {endDate && (
                <React.Fragment>
                    <StyledB>{endDatePlaceholder}<Space/></StyledB>
                    <StyledP>{new Date(endDate).toLocaleDateString('en-GB')}</StyledP>
                </React.Fragment>)
            }
        </BookingInfo>
    )
}

export default BookingDates;

