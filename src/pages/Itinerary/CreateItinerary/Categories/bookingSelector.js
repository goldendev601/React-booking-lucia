import React from "react";
import AddHotel from "./Hotel/AddHotel";
import AddFlight from "./Flight/AddFlight";
import AddCruise from "./Cruise/AddCruise";
import AddOther from "./Other/AddOther";
import AddHeader from "./Header/AddHeader";
import AddConcierge from "./Concierge/AddConcierge";
import AddActivity from "./Activity/AddActivity";
import AddInsurance from "./Insurance/AddInsurance";
import AddTransport from "./Transport/AddTransport";

const bookingCategorySelector = (category, bookingProps) => {
    switch (category) {
        case 'hotels':
            return (
                <AddHotel {...bookingProps}/>
            );
        case 'flights':
            return (
                <AddFlight {...bookingProps}/>
            );
        case 'cruises':
            return (
                <AddCruise {...bookingProps}/>
            );
        case 'others':
            return (
                <AddOther {...bookingProps}/>
            );
        case 'concierges':
            return (
                <AddConcierge {...bookingProps}/>
            );
        case 'tours':
            return (
                <AddActivity {...bookingProps}/>
            );
        case 'insurances':
            return (
                <AddInsurance {...bookingProps}/>
            );
        case 'transports':
            return (
                <AddTransport {...bookingProps}/>
            );
        case 'headers':
            return (
                <AddHeader {...bookingProps}/>
            );
        default:
            return null
    }
}

export default bookingCategorySelector;
