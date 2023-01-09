import React from "react";
import ItineraryInformation from "./ItineraryInformation";
import ItineraryPictures from "./ItineraryPictures";
import ItineraryAbstract from "./ItineraryAbstract";
import ItineraryTravelers from "./ItineraryTravelers";
import ItineraryTheme from "./ItineraryTheme";

export const createItineraryTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        INFORMATION:
            <ItineraryInformation
                formik={formik}
            />,
        TRAVELERS:
            <ItineraryTravelers
                formik={formik}
            />,
        IMAGES:
            <ItineraryPictures
                max={1}
                formik={formik}
            />,
        ABSTRACT:
            <ItineraryAbstract
                formik={formik}
            />,
        THEME:
            <ItineraryTheme
                max={1}
                formik={formik}
                itineraryLogo
            />
    }
}
