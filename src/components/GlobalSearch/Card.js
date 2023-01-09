import React from "react";
import styled from "styled-components";
import {colors} from "styles/colors";
import {NavArrowRight} from "iconoir-react";
import IconButton from "@material-ui/core/IconButton";
import {convertDate} from "../../utils";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setGlobalSearchOpen} from "redux/features/dialogForms/dialogFormsOpenStateSlice";

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

const Card = ({id, title, start, end, status, client}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const navigateToBooking = (id) => {
        dispatch(setGlobalSearchOpen(false));
        history.push(`/itinerary-details/${id}`);
    }

    return (
        <CardContainer onClick={() => navigateToBooking(id)}>
            <Text fs="14px">{start && convertDate(start)} - {end && convertDate(end)}</Text>
            <Text fs="20px"><b>{client && client} - {title && title}</b></Text>
            <BookingInformation>
                <Text>Booking: <b>{id && id}</b></Text>
                <Text style={{marginLeft: '10px'}}>Status: <b>{status && status}</b></Text>
            </BookingInformation>
            <IconButton style={{position: 'absolute', right: '0', top: '30px'}}>
                <NavArrowRight color={colors.brand} width="25px" height="25px"/>
            </IconButton>
        </CardContainer>
    );
}

export default Card;
