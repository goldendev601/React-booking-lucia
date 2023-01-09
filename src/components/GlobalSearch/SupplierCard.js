import React from "react";
import styled from "styled-components";
import {colors} from "styles/colors";
import {NavArrowRight} from "iconoir-react";
import IconButton from "@material-ui/core/IconButton";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 30px;
  letter-spacing: 0.05em;
  color: ${colors.black1};
  border-top: 1px solid black;
  width: 100%;
  position: relative;
  padding: 10px 30px;
  cursor: pointer;
`;

const Text = styled.span`
  color: ${colors.black1};
  font-family: Raleway, serif;
  font-weight: 400;
  font-size: ${props => props.fs || '12px'};
`;

const BookingInformation = styled.div`
  display: flex;
`;

const SupplierCard = ({id, bookingCategory, name, address}) => {

    return (
        <CardContainer>
            <Text fs="14px">{bookingCategory}</Text>
            <Text fs="20px"><b>{name}</b></Text>
            <BookingInformation>
                <Text>Address: <b>{address}</b></Text>
            </BookingInformation>
            <IconButton style={{position: 'absolute', right: '0', top: '30px'}}>
                <NavArrowRight color={colors.brand} width="25px" height="25px"/>
            </IconButton>
        </CardContainer>
    );
}

export default SupplierCard;
