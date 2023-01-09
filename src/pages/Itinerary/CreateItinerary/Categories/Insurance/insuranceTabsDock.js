import React from "react";
import InsuranceInformation from "./InsuranceInformation";
import InsuranceProviderInformation from "./InsuranceProviderInformation";
import InsurancePictures from "./InsurancePictures";
import InsuranceNotes from "./InsuranceNotes";

export const createInsuranceTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    const notesFieldNames = ['notes', 'cancellationPolicy'];
    return {
        INFORMATION:
            <InsuranceInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        'PROVIDER':
            <InsuranceProviderInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        IMAGES:
            <InsurancePictures
                handleStateChange={setImages}
                nextStep={nextStep}
                edit={edit}
                max={3}
                formik={formik}
            />,
        NOTES:
            <InsuranceNotes
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                fieldNames={notesFieldNames}
                edit={edit}
                formik={formik}
            />,
    }
}