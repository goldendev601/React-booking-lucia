import React from "react";
import SupplierForm from "../shared/SupplierForm";
import SupplierPictures from "../shared/SupplierPictures";
import SupplierNotes from "../shared/SupplierNotes";


export const createSuppliersTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    return {
        'PROVIDER':
            <SupplierForm
                formik={formik}
                edit={edit}
            />,
        IMAGES:
            <SupplierPictures
                max={6}
                edit={edit}
                formik={formik}
            />,
        'DETAILS':
            <SupplierNotes
                edit={edit}
                formik={formik}
            />,
    }
}
