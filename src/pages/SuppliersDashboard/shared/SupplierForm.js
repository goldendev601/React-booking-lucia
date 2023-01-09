import {Typography} from "@material-ui/core";
import {FlexContainer, ItineraryFormContainer, PhoneField, SelectField, TextField} from "@core/components";
import ChipInput from "material-ui-chip-input";
import React, {useEffect, useState} from "react";
import {addItineraryStyles} from "styles";
import {useDispatch, useSelector} from "react-redux";
import {constantsSelector, getBookingCategories} from "redux/features/constants/constantsSlice";
import {suppliersSelector} from "redux/features/suppliers/suppliersSlice";

const SupplierForm = ({formik, edit}) => {
    const dispatch = useDispatch();
    const classes = addItineraryStyles();
    const [supplierEmail, setSupplierEmail] = useState([]);
    const {bookingCategories} = useSelector(constantsSelector);

    const {supplier} = useSelector(suppliersSelector);

    const {email} = supplier || {};

    const handleDeleteChip = () => {
        setSupplierEmail([]);
        formik.setFieldValue('email', '');
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
        if (supplierEmail) {
            formik.setFieldValue('email', supplierEmail[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplierEmail]);

    useEffect(() => {
        if (edit) {
            if (email) {
                handleAddChip(email);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, email]);

    useEffect(() => {
        if (!bookingCategories) {
            dispatch(getBookingCategories());
        }
    }, [bookingCategories, dispatch]);

    return (
        <ItineraryFormContainer className={classes.spacing}>
            <Typography component={'div'} variant='body2'>ADDITIONAL INFORMATION</Typography>
            <FlexContainer $spacing>
                <FlexContainer $spacing $column style={{width: '100%'}}>
                    <TextField
                        formik={formik}
                        label="Provider Name"
                        name="name"
                        placeholder="Placeholder"
                        width="380px"
                    />
                    <TextField
                        formik={formik}
                        label="Address"
                        name="address"
                        placeholder="Placeholder"
                        width="380px"
                    />
                    <TextField
                        formik={formik}
                        label="Website"
                        name="website"
                        placeholder="Placeholder"
                        width="380px"
                    />
                </FlexContainer>
                <div className={classes.spacing}
                     style={{display: 'flex', flexDirection: 'column', marginTop: '0'}}>                   
                    <PhoneField
                        label="Phone Number"
                        formik={formik}
                        name="phone"
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
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        placeholder="Enter client email"
                        InputProps={{disabled: supplierEmail.length > 0}}
                        fullWidth
                    />
                    <SelectField
                        formik={formik}
                        label="Supplier category"
                        name="bookingCategoryId"
                        options={bookingCategories}
                        constants
                        width="100%"
                    />
                </div>
            </FlexContainer>
        </ItineraryFormContainer>
    );
}

export default SupplierForm;