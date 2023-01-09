import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    dialogFormsStateSelector,
    setSuppliersFormOpen,
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {StepByStepDialog} from "@core/components";
import {useFormik} from "formik";
import * as yup from "yup";
import {createSuppliersTabsDock} from "./suppliersTabsDock";
import {
    addSupplier,
    clearSuppliersFlags,
    setSupplierId,
    suppliersSelector,
    updateSupplier
} from "redux/features/suppliers/suppliersSlice";
import {
    picturesSelector, setPicture,
} from "redux/features/pictures/picturesSlice";
import {createErrorMessage} from "utils";
import {setBookingCategory} from "redux/features/dialogForms/bookingFormSlice";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'

const validationSchema = yup.object({
    name: yup
        .string('Enter itinerary name')
        .required('itinerary name is required'),
    website: yup.string(),
    email: yup.string('Enter valid email address').email(),
    phone: yup
        .string(),
    bookingCategoryId: yup.number().required(),
});

const AddSupplier = ({open}) => {
    const dispatch = useDispatch();

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const {edit} = useSelector(dialogFormsStateSelector);
    const {flags, errorMessage, supplier} = useSelector(suppliersSelector);

    const {
        id,
        name,
        address,
        phone,
        website,
        email,
        isGloballyAccessible,
        bookingCategoryId,
        imageUrl,
        description
    } = supplier || {};

    const {pictures} = useSelector(picturesSelector);

    const {isSupplierUpdatedSuccess, isSupplierUpdatedError, isSupplierAddedSuccess, isSupplierAddedError} = flags;

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            phone: '',
            website: '',
            email: '',
            isGloballyAccessible: false,
            bookingCategoryId: '',
            imageUrl: null,
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(pictures);
            if (edit) {
                const formData = new FormData();
                if (pictures) {
                    formData.append("image_url", pictures[0] ? pictures[0].imageFile : null);
                }
                formData.append("address", values?.address);
                formData.append("booking_category_id", values?.bookingCategoryId);
                formData.append("is_globally_accessible", values?.isGloballyAccessible);
                formData.append("name", values?.name);
                formData.append("phone", values?.phone);
                formData.append("website", values?.website);
                formData.append("description", values?.description);
                const apiPayload = {
                    supplier: formData,
                    supplierId: id,
                }
                // const apiPayload = {
                //     supplier: snakeNestedKeys(values),
                //     supplierId: id,
                // }
                dispatch(updateSupplier(apiPayload));
            } else {
                const formData = new FormData();
                if (pictures) {
                    formData.append("image_url", pictures[0] ? pictures[0].imageFile : null);
                }
                formData.append("address", values?.address);
                formData.append("booking_category_id", values?.bookingCategoryId);
                formData.append("is_globally_accessible", values?.isGloballyAccessible);
                formData.append("name", values?.name);
                formData.append("phone", values?.phone);
                formData.append("website", values?.website);
                formData.append("description", values?.description);
                dispatch(addSupplier(formData));
            }
        }
    });

    useEffect(() => {
        if (edit) {
            var filteredDescription = '';
            if (description) {
                filteredDescription = description.replaceAll('&lt;', '').replace('p&gt;', '').replace('/p&gt;', '');
            }
            formik.setValues({
                name: name,
                address: address,
                phone: phone,
                website: website,
                isGloballyAccessible: isGloballyAccessible,
                bookingCategoryId: bookingCategoryId,
                description: filteredDescription
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, bookingCategoryId, edit, email, isGloballyAccessible, name, phone, website, description]);

    useEffect(() => {
        if (id) {
            dispatch(setSupplierId(id))
        }
    }, [id])

    useEffect(() => {
        if (imageUrl) {
            dispatch(setPicture({imageUrl}))
        }
    }, [imageUrl])

    useEffect(() => {
        dispatch(setBookingCategory('suppliers'));
    }, [dispatch]);

    useEffect(() => {
        if (isSupplierAddedSuccess) {
            openSnackbarSuccess('Supplier is successfully added');
            dispatch(setSuppliersFormOpen(false));
        }
        if (isSupplierAddedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearSuppliersFlags());
        }
        if (isSupplierUpdatedSuccess) {
            openSnackbarSuccess('Supplier is successfully updated');
            dispatch(setSuppliersFormOpen(false));
        }
        if (isSupplierUpdatedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearSuppliersFlags());
        }
    }, [isSupplierUpdatedSuccess, isSupplierUpdatedError, isSupplierAddedSuccess, isSupplierAddedError, openSnackbarSuccess, dispatch, openSnackbarError, errorMessage]);

    return (
        <form id="suppliers" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description={edit ? "Edit Supplier" : "Add Supplier"}
                id="add-supplier"
                createTabsDock={createSuppliersTabsDock}
                open={open}
                alertType="discard"
                formik={formik}
                unlockTabs={true}
            />
        </form>
    );
}

export default AddSupplier;
