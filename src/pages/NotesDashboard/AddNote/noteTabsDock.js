import React from "react";
import NoteInformation from "./NoteInformation";

export const createNoteTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        INFORMATION:
            <NoteInformation
                formik={formik}
            />,
    }
}