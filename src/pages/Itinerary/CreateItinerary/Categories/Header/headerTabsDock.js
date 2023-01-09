import React from "react";
import HeaderInformation from "./HeaderInformation";

export const createHeaderTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        INFORMATION:
            <HeaderInformation
                formik={formik}
            />,
    }
}