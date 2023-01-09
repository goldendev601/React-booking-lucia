import React from "react";
import TravelerInformation from "./TravelerInformation";
import TravelerNotes from "./TravelerNotes";
import TravelerDocuments from "./TravelerDocuments";

export const createTravelerTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        "PERSONAL INFORMATION":
            <TravelerInformation
                formik={formik}
            />,
        "DOCUMENTS":
            <TravelerDocuments
                formik={formik}
            />,
        NOTES:
            <TravelerNotes
                formik={formik}
            />,
    }
}
