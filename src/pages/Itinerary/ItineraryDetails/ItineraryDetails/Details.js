import React from "react";
import Abstract from "./Abstract";
import BookingsList from "./BookingsList";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 30px;
`;

const Details = ({abstractNote, bookings, startDate, endDate, title, pictures}) => {
    return (
        <Container>
            <Abstract 
                style={{
                    marginBottom: '30px',
                    marginTop: '0',
                    order: 'initial'
                }} 
                text={abstractNote}
                title={title}
                pictures={pictures}
            />
            <BookingsList
                style={{order: 'initial'}}
                startDate={startDate}
                endDate={endDate}
                bookings={bookings}
            />
        </Container>
    );
}

export default Details;