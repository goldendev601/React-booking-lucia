import React from "react";
import ActivityInformation from "./ActivityInformation";
import ActivityProviderInformation from "./ActivityProviderInformation";
import ActivityPictures from "./ActivityPictures";
import ActivityNotes from "./ActivityNotes";
import ActivityCancellation from "./ActivityCancellation";

export const createActivityTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    const notesFieldNames = ['notes', 'description'];
    return {
        INFORMATION:
            <ActivityInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        'PROVIDER':
            <ActivityProviderInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        IMAGES:
            <ActivityPictures
                handleStateChange={setImages}
                nextStep={nextStep}
                max={3}
                edit={edit}
                formik={formik}
            />,
        NOTES:
            <ActivityNotes
                handleStateChange={handleStateChange}
                fieldNames={notesFieldNames}
                setCompleteStatus={setCompleteStatus}
                edit={edit}
                formik={formik}
            />,
        "CANCELLATION POLICY":
            <ActivityCancellation
                handleStateChange={handleStateChange}
                fieldNames={notesFieldNames}
                setCompleteStatus={setCompleteStatus}
                edit={edit}
                formik={formik}
            />,
    }
}
