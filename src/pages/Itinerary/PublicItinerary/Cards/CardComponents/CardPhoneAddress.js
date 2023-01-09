import React from "react";
import {StyledP} from "./StyledComponents";

const CardPhoneAddress = ({address, phone}) => {
    return (
        <React.Fragment>
            <StyledP mb="20px">{address}{address && phone && ','} {phone}</StyledP>
        </React.Fragment>
    );
}

export default CardPhoneAddress;