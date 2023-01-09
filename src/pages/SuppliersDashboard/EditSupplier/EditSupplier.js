import React, {useEffect, useState} from "react";
import {addItineraryStyles} from "styles/muiStyles";
import {useFormik} from "formik";
import {Typography} from "@material-ui/core";
import {
    FlexContainer,
    ItineraryFormContainer,
    MaskField,
    NotificationHandler,
    TextField
} from "@core/components";
import ChipInput from "material-ui-chip-input";
import * as yup from "yup";
import {useSelector} from "react-redux";
import {clearSupplier, suppliersSelector} from "redux/features/suppliers/suppliersSlice";

const validationSchema = yup.object({
    providerName: yup.string('Enter a valid Provider name'),
    providerWebsite: yup.string(),
    providerEmail: yup.string('Enter valid email address').email(),
    providerPhone: yup
        .string()
        .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value))
});

const EditSupplier = () => {
    const classes = addItineraryStyles();
    // const dispatch = useDispatch();
    const [supplierEmail, setSupplierEmail] = useState([]);
    const {supplier, isUpdateSuccess, isUpdateError, errorMessage} = useSelector(suppliersSelector);

    const {bookingCategoryId, name, website, address, phone, email, isGloballyAccessible} = supplier || {};

    const formik = useFormik({
        initialValues: {
            providerName: name,
            providerAddress: address,
            providerPhone: phone,
            providerWebsite: website,
            providerEmail: '',
            isGloballyAccessible: isGloballyAccessible,
            bookingCategoryId: bookingCategoryId
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.providerPhone = '+' + values.providerPhone.replace(/[^\d]/g, '');
            // const apiPayload = {
            //     bookingId: bookingId,
            //     itineraryId: itineraryId,
            //     category: category,
            //     supplierData: values,
            // }
            // dispatch(updateSupplier(apiPayload));
        }
    });

    const handleDeleteChip = () => {
        setSupplierEmail([]);
        formik.setFieldValue('providerEmail', '');
    }

    const handlePaste = (e) => {
        e.preventDefault();

        const paste = e.clipboardData.getData("text");

        if (paste.match(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g)) {
            const found = supplierEmail.some((v) => {
                return v.indexOf(paste) !== -1;
            });
            if (!found) {
                handleAddChip(paste);
            }
        }
    };

    const handleAddChip = (chip) => {
        setSupplierEmail([chip]);
    }
    useEffect(() => {
        if (email) {
            handleAddChip(email);
        }
    }, [email]);

    useEffect(() => {
        if (supplierEmail.length !== 0) {
            formik.setFieldValue('providerEmail', ...supplierEmail);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplierEmail]);

    return (
        <NotificationHandler
            clearState={clearSupplier}
            isSuccess={isUpdateSuccess}
            isError={isUpdateError}
            errorMessage={errorMessage}
            successMessage="Provider is successfully updated"
            closeDialogs={true}
        >
            <form onSubmit={formik.handleSubmit}>
                <ItineraryFormContainer className={classes.spacing}>
                    <Typography component={'div'} variant='body2'>ADDITIONAL INFORMATION</Typography>
                    <FlexContainer $spacing>
                        <FlexContainer $spacing $column style={{width: '100%'}}>
                            <TextField
                                formik={formik}
                                label="Provider Name"
                                name="providerName"
                                placeholder="Placeholder"
                                width="380px"
                            />
                            <TextField
                                formik={formik}
                                label="Address"
                                name="providerAddress"
                                placeholder="Placeholder"
                                width="380px"
                            />
                            <TextField
                                formik={formik}
                                label="Website"
                                name="providerWebsite"
                                placeholder="Placeholder"
                                width="380px"
                            />
                        </FlexContainer>
                        <div className={classes.spacing}
                             style={{display: 'flex', flexDirection: 'column', marginTop: '0'}}>
                            <MaskField
                                formik={formik}
                                mask="+9999999999"
                                label="Phone Number"
                                name="providerPhone"
                                placeholder="Enter phone number"
                                width="380px"
                            />
                            <ChipInput
                                label="Email"
                                value={supplierEmail}
                                newChipKeys={['Enter', ',', ' ']}
                                blurBehavior={'add'}
                                onAdd={(chip) => handleAddChip(chip)}
                                onPaste={handlePaste}
                                onDelete={(chip, index) => handleDeleteChip(chip, index)}
                                InputLabelProps={{
                                    shrink: true,
                                    className: 'chip-label'
                                }}
                                style={{marginTop: '30px'}}
                                error={formik.touched.providerEmail && Boolean(formik.errors.providerEmail)}
                                placeholder="Enter client email"
                                InputProps={{disabled: supplierEmail.length > 0}}
                                fullWidth
                            />
                        </div>
                    </FlexContainer>
                </ItineraryFormContainer>
            </form>
        </NotificationHandler>
    );
}

export default EditSupplier;
