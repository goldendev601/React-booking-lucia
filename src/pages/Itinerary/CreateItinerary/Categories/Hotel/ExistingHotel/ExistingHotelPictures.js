import React from "react";
import Pictures from "../../../../../../@core/components/Pictures/Pictures";

const ExistingHotelPictures = ({handleStateChange, nextStep}) => <Pictures handleStateChange={handleStateChange}
                                                                           nextStep={nextStep} max={6}/>

export default ExistingHotelPictures;
