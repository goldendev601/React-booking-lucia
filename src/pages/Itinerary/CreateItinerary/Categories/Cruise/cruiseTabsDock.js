import React from "react";
import CruiseInformation from "./CruiseInformation";
import CruisePictures from "./CruisePictures";
import CruiseNotes from "./CruiseNotes";
import CruiseProviderInformation from "./CruiseProviderInformation";
import CruiseCabin from "./CruiseCabin";

export const createCruiseTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    const notesFieldNames = ['notes', 'cancelPolicy'];
    return {
        INFORMATION:
            <CruiseInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        'PROVIDER':
            <CruiseProviderInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        CABIN:
            <CruiseCabin
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        IMAGES:
            <CruisePictures
                handleStateChange={setImages}
                nextStep={nextStep}
                max={3}
                edit={edit}
                formik={formik}
            />,
        NOTES:
            <CruiseNotes
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                fieldNames={notesFieldNames}
                edit={edit}
                formik={formik}
            />,
    }
}