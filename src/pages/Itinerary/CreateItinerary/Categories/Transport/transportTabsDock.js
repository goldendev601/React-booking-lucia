import React from "react";
import TransportPictures from "./TransportPictures";
import TransportNotes from "./TransportNotes";
import TransportProviderInformation from "./TransportProviderInformation";
import TransportPassengers from "./TransportPassengers";
import TransportInformation from "./TransportInformation/TransportInformation";

export const createTransportTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        INFORMATION:
            <TransportInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        'PROVIDER':
            <TransportProviderInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        // PASSENGERS:
        //     <TransportPassengers
        //         handleStateChange={handleStateChange}
        //         nextStep={nextStep}
        //         edit={edit}
        //         formik={formik}
        //     />,
        IMAGES:
            <TransportPictures
                handleStateChange={setImages}
                nextStep={nextStep}
                max={3}
                edit={edit}
                formik={formik}
            />,
        NOTES:
            <TransportNotes
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
    }
}
