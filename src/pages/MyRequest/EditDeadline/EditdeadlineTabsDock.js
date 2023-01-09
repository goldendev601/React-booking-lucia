import React from "react";
import Browser from "./Browser";

export const createEditDeadlineTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        Edit:
            <Browser
                edit={edit}
                formik={formik}
            />,
    }
}
