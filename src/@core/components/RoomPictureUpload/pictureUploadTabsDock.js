import React from "react";
import Browser from "./Browser/Browser";
// import Url from "./Url/Url";
// import Unsplash from "./Unsplash/Unsplash";

export const createPictureUploadTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        BROWSER:
            <Browser
                formik={formik}
                edit={edit}
            />,
        // URL:
        //     <Url
        //         formik={formik}
        //         edit={edit}
        //     />,
        // UNSPLASH:
        //     <Unsplash
        //         formik={formik}
        //         edit={edit}
        //     />
    }
}
