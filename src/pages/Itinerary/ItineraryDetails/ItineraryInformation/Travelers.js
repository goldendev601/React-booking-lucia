import React from "react";
import Row from "./Row";
import Typography from "@material-ui/core/Typography";
import {Text} from "../Text";
import styled from "styled-components";


const TravelersContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > div:not(:first-child) {
    margin-top: 10px;
  }
`;

const Container = styled.div`
  & > div:not(:first-child) {
    margin-top: 20px;
  }
`;

const Travelers = ({itineraryPassengers}) => {
    return (
        <Container>
            {itineraryPassengers.map((traveler, index) =>
                <TravelersContainer key={index}>
                    <Row>
                        <Typography variant="body2" component="span" style={{fontFamily: 'Montserrat'}}>Name:</Typography>
                        <Text variant="body2" component="span" style={{fontFamily: 'Montserrat'}}>{traveler.name}</Text>
                    </Row>
                </TravelersContainer>
            )}
        </Container>
    );
}

export default Travelers;