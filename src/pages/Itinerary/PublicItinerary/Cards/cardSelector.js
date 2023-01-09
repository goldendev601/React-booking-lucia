import React from "react";
import HotelCard from "./HotelCard";
import FlightCard from "./FlightCard";
import CruiseCard from "./CruiseCard";
import OtherCard from "./OtherCard";
import ConciergeCard from "./ConciergeCard";
import ActivityCard from "./ActivityCard";
import InsuranceCard from "./InsuranceCard";
import TransportCard from "./TransportCard";
import DividerCard from "./DividerCard";
import HeaderCard from "./HeaderCard";

const cardSelector = (category, booking, showPriceOnShare, itineraryPropertyDesignId) => {
    const props = {
        booking: booking,
        showPriceOnShare: showPriceOnShare,
        itineraryPropertyDesignId: itineraryPropertyDesignId
    }

    switch (category) {
        case 'Hotel':
            return (
                <HotelCard {...props}/>
            );
        case 'Flight':
            return (
                <FlightCard {...props}/>
            );
        case 'Cruise':
            return (
                <CruiseCard {...props}/>
            );
        case 'Other Notes':
            return (
                <OtherCard {...props}/>
            );
        case 'Concierge':
            return (
                <ConciergeCard {...props}/>
            );
        case 'Tour Activity':
            return (
                <ActivityCard {...props}/>
            );
        case 'Insurance':
            return (
                <InsuranceCard {...props}/>
            );
        case 'Transportation':
            return (
                <TransportCard {...props}/>
            );
        case 'Divider':
            return (
                <DividerCard {...props}/>
            );
        case 'Header':
            return (
                <HeaderCard {...props}/>
            );
        default:
            return null
    }
}

export default cardSelector;