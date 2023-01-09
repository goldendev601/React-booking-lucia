import React from "react";
import ExistingHotelInformation from "./ExistingHotelInformation";
import ExistingHotelPassengers from "./ExistingHotelPassengers";
import ExistingHotelPictures from "./ExistingHotelPictures";
import ExistingHotelNotes from "./ExistingHotelNotes";
import HotelAmenities from "../HotelAmenities";

export const createExistingHotelTabsDock = (handleStateChange, nextStep, handleCloseDialogs) => {
    return {
        INFORMATION:
            <ExistingHotelInformation
                handleCloseDialogs={handleCloseDialogs}
                handleStateChange={handleStateChange}
                nextStep={nextStep}
            />,
        PASSENGERS:
            <ExistingHotelPassengers
                handleCloseDialogs={handleCloseDialogs}
                handleStateChange={handleStateChange}
                nextStep={nextStep}
            />,
        AMENITIES:
            <HotelAmenities
                handleCloseDialogs={handleCloseDialogs}
                handleStateChange={handleStateChange}
                nextStep={nextStep}
            />,
        IMAGES:
            <ExistingHotelPictures
                handleCloseDialogs={handleCloseDialogs}
                handleStateChange={handleStateChange}
                nextStep={nextStep}
            />,
        NOTES:
            <ExistingHotelNotes
                handleCloseDialogs={handleCloseDialogs}
                handleStateChange={handleStateChange}
                nextStep={nextStep}
            />,
    }
}