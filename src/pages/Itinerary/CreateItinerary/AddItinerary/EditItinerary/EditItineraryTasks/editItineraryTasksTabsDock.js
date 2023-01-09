import React from "react";
import ItineraryTasks from "../../ItineraryTasks";

export const createEditItineraryTasksTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        TASKS:
            <ItineraryTasks
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
    }
}
