import React from "react";
import {StepByStepDialog} from "@core/components";
import {createEditSupplierTabsDock} from "./editSupplierTabsDock";

const EditSupplierDialog = ({...props}) => {
    return (
        <StepByStepDialog
            description="Edit Supplier"
            id="edit-supplier"
            createTabsDock={createEditSupplierTabsDock}
            {...props}
        />
    );
}

export default EditSupplierDialog;
