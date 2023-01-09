import React from "react";
import HotelBookingCard from "./HotelBookingCard";
import FlightBookingCard from "./FlightBookingCard";
import CruiseBookingCard from "./CruiseBookingCard";
import OtherBookingCard from "./OtherBookingCard";
import ConciergeBookingCard from "./ConciergeBookingCard";
import ActivityBookingCard from "./ActivityBookingCard";
import InsuranceBookingCard from "./InsuranceBookingCard";
import TransportBookingCard from "./TransportBookingCard";
import DeviderBookingCard from "./DeviderBookingCard";
import HeaderBookingCard from "./HeaderBookingCard";

const bookingCardSelector = (category, booking, provided) => {
    const props = {
        booking: booking,
    }

    const draggableProps = {
        dragHandleProps: {...provided.dragHandleProps},
    }

    switch (category) {
        case 'Hotel':
            return (
                <HotelBookingCard {...draggableProps} {...props}/>
            );
        case 'Flight':
            return (
                <FlightBookingCard {...draggableProps} {...props}/>
            );
        case 'Cruise':
            return (
                <CruiseBookingCard {...draggableProps} {...props}/>
            );
        case 'Other Notes':
            return (
                <OtherBookingCard {...draggableProps} {...props}/>
            );
        case 'Concierge':
            return (
                <ConciergeBookingCard {...draggableProps} {...props}/>
            );
        case 'Tour Activity':
            return (
                <ActivityBookingCard {...draggableProps} {...props}/>
            );
        case 'Insurance':
            return (
                <InsuranceBookingCard {...draggableProps} {...props}/>
            );
        case 'Transportation':
            return (
                <TransportBookingCard {...draggableProps} {...props}/>
            );
        case 'Divider':
            return (
                <DeviderBookingCard {...draggableProps} {...props}/>
            );
        case 'Header':
            return (
                <HeaderBookingCard {...draggableProps} {...props}/>
            );
        default:
            return null
    }
}

export default bookingCardSelector;