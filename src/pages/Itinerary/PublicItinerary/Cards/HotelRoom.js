import React from "react";
import {Space, StyledB, StyledP, StyledT} from "./CardComponents/StyledComponents";
import getSymbolFromCurrency from "currency-symbol-map";
import {Border} from "../../ItineraryDetails/BookingDetailCards/BookingDetailCardComponents/BorderTop";
import {RoomInfo} from "./HotelCard";
import styled from "styled-components";

const HotelRoomInformation = styled.div`
`;

const HotelRooms = ({rooms, borderTop, borderBottom}) => {
    return (
        <HotelRoomInformation>
            {rooms.length > 0 && rooms.map((room, index) => {
                    const currencySymbol = getSymbolFromCurrency(room?.currencyType);

                    return (
                        <div style={{marginBottom: borderTop ? '40px' : '0'}} key={index}>
                            {borderTop && <Border mw="100%"/>}
                            <RoomInfo>
                                <StyledT>{room?.roomType}</StyledT>
                            </RoomInfo>
                            <RoomInfo style={{display: 'flex', flexWrap: 'wrap'}}>
                                <StyledB>Number of guest:<Space/></StyledB><StyledP>{room?.numberOfGuests || 'Not provided'}</StyledP>
                                
                                {
                                    room?.guestName && (
                                        <React.Fragment>
                                            <StyledB style={{marginLeft: '52px'}}>Guests:<Space/></StyledB><StyledP>{room?.guestName || 'Not provided'}</StyledP>
                                        </React.Fragment>
                                    )
                                }
                            </RoomInfo>
                            <RoomInfo style={{display: 'flex', flexWrap: 'wrap'}}>
                                <StyledB>Room Type:<Space/></StyledB><StyledP>{room?.roomType}</StyledP>
                                <StyledB style={{marginLeft: '52px'}}>Bedding type:<Space/></StyledB><StyledP>{room?.beddingType || 'Not provided'}</StyledP>
                            </RoomInfo>
                            <RoomInfo style={{display: 'flex', flexWrap: 'wrap'}}>
                                {room?.roomRate !== 0 &&
                                <React.Fragment>
                                    <StyledB>Rate:<Space/></StyledB><StyledP>{room?.roomRate || 0} {room?.currency}</StyledP><Space/><Space/><Space/>
                                </React.Fragment>}
                            </RoomInfo>
                            {room.roomDescription &&
                            <React.Fragment>
                                <RoomInfo>
                                    <StyledB>Room description:<Space/></StyledB><br/>
                                </RoomInfo>
                                <RoomInfo>
                                    <StyledP ta='left'>{room?.roomDescription || 'Not provided'}</StyledP>
                                </RoomInfo>
                            </React.Fragment>}
                            {borderBottom && <Border mw="640px"/>}
                        </div>
                    );
                }
            )}
        </HotelRoomInformation>
    );
}

export default HotelRooms;