import React from "react";
import FlightInformation from "./FlightInformation/FlightInformation";
import FlightPassengers from "./FlightPassengers";
import FlightNotes from "./FlightNotes";
import FlightCancellation from "./FlightCancellation";

export const createFlightTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    const notesFieldNames = ['notes', 'cancelPolicy'];
    return {
        "FLIGHT INFORMATION":
            <FlightInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        PASSENGERS:
            <FlightPassengers
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        // IMAGES:
        //     <FlightPictures
        //         handleStateChange={setImages}
        //         nextStep={nextStep}
        //         max={2}
        //         edit={edit}
        //         formik={formik}
        //     />,
        NOTES:
            <FlightNotes
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                fieldNames={notesFieldNames}
                edit={edit}
                formik={formik}
            />,
        "CANCELLATION POLICY":
            <FlightCancellation
                handleStateChange={handleStateChange}
                fieldNames={nextStep}
                fieldNames={notesFieldNames}
                edit={edit}
                formik={formik}
            />,
    }
}