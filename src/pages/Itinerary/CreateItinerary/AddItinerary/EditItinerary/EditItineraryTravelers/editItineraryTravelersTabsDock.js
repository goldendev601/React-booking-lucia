import React from "react";
import ItineraryTravelers from "../../ItineraryTravelers";

export const createEditItineraryTravelersTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        TRAVELERS:
            <ItineraryTravelers
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
    }
}
