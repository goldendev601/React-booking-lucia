import React from "react";
import HotelPassengers from "../HotelPassengers";

const ExistingHotelPassengers = ({handleStateChange, nextStep, handleCloseDialogs}) => <HotelPassengers
    handleStateChange={handleStateChange} nextStep={nextStep} handleCloseDialogs={handleCloseDialogs}/>

export default ExistingHotelPassengers;