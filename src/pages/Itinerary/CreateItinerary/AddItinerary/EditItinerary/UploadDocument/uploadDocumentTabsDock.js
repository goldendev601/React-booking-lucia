import React from "react";
import Browser from "@core/components/FileUpload/Browser/Browser";

export const createUploadDocumentTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        UPLOAD:
            <Browser
                edit={edit}
                formik={formik}
            />,
    }
}
