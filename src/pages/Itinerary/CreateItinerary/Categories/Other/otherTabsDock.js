import React from "react";
import OtherInformation from "./OtherInformation";

export const createOtherTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        INFORMATION:
            <OtherInformation
                formik={formik}
            />,
    }
}