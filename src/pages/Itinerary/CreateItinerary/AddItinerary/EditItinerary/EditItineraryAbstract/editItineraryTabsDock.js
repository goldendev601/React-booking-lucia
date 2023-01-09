import React from "react";
import ItineraryAbstract from "../../ItineraryAbstract";

export const createEditItineraryAbstractTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        ABSTRACT:
            <ItineraryAbstract
                formik={formik}
            />,
    }
}
