import {BookingInfo, Space, StyledB, StyledP} from "./StyledComponents";
import React from "react";

const BookingPrice = ({price, showPriceOnShare}) => {
    return (
        <React.Fragment>
            {showPriceOnShare && price &&
            <BookingInfo>
                <StyledB>Price:<Space/></StyledB>
                <StyledP>{price}</StyledP>
            </BookingInfo>
            }
        </React.Fragment>
    );
}

export default BookingPrice;