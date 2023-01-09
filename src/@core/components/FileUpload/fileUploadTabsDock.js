import React from "react";
import Browser from "./Browser/Browser";

export const createFileUploadTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        BROWSER:
            <Browser
                formik={formik}
                edit={edit}
            />
    }
}
