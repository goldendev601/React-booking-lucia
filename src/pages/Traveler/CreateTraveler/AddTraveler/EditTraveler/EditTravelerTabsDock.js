import React from "react";
import EditTravelerInformation from "./EditTravelerInformation";
import EditTravelerNotes from "./EditTravelerNotes";
import EditTravelerDocuments from "./EditTravelerDocuments";

export const editTravelerTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        "PERSONAL INFORMATION":
            <EditTravelerInformation
                formik={formik}
            />,
        "DOCUMENTS":
            <EditTravelerDocuments
                formik={formik}
            />,
        NOTES:
            <EditTravelerNotes
                formik={formik}
            />,
    }
}
