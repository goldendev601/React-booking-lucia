import React from "react";
import ConciergePictures from "./ConciergePictures";
import ConciergeProviderInformation from "./ConciergeProviderInformation";
import ConciergeNotes from "./ConciergeNotes";
import ConciergeInformation from "./ConciergeInformation";

export const createConciergeTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    const notesFieldNames = ['notes', 'cancelPolicy'];
    return {
        INFORMATION:
            <ConciergeInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        'PROVIDER':
            <ConciergeProviderInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        IMAGES:
            <ConciergePictures
                handleStateChange={setImages}
                nextStep={nextStep}
                max={6}
                edit={edit}
                formik={formik}
            />,
        NOTES:
            <ConciergeNotes
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                fieldNames={notesFieldNames}
                edit={edit}
                formik={formik}
            />,
    }
}
