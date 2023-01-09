import React, {useEffect, useState} from "react";
import {addItineraryStyles} from "styles/muiStyles";
import {Typography} from "@material-ui/core";
import {validateEmail, createErrorMessage} from "utils";
import {FlexContainer, ItineraryFormContainer, Loading, TextField, PhoneField} from "@core/components";
import ChipInput from "material-ui-chip-input";
import {useDispatch, useSelector} from "react-redux";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";
import {bookingFormSelector} from "redux/features/dialogForms/bookingFormSlice";
import {setPreviousProviderName, setSupplier, supplierLookup, suppliersSelector} from "redux/features/suppliers/suppliersSlice";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


const ProviderInformation = ({edit, formik}) => {
    const dispatch = useDispatch();
    const classes = addItineraryStyles();
    const [providerEmail, setProviderEmail] = useState([]);

    const [value, setValue] = useState(null);

    const [categoryId, setCategoryId] = useState('');
    const {category} = useSelector(bookingFormSelector);
    const {previousProviderName, supplier, googleSearchInfo, isFetching} = useSelector(suppliersSelector);

    const [openSnackbarError] = useSnackbar(error);

    const supplierName = category.substring(0, category.length - 1) + 'Supplier';

    const {booking} = useSelector(bookingsSelector);

    const handleDeleteChip = () => {
        setProviderEmail([]);
        formik.setFieldValue('providerEmail', '');
    }

    const handleAddChip = (chip) => {
        if (validateEmail(chip)) {
            setProviderEmail([chip]);
            formik.setFieldValue('providerEmail', providerEmail);
        } else {
            openSnackbarError(createErrorMessage('Please put validation email'));
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();

        const paste = e.clipboardData.getData("text");

        if (paste.match(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g)) {
            const found = providerEmail.some((v) => {
                return v.indexOf(paste) !== -1;
            });
            if (!found) {
                handleAddChip(paste);
            }
        }
    };

    useEffect(() => {
        if (edit) {
            const {email} = booking[supplierName] || {};

            if (email) {
                handleAddChip(email);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, booking]);

    useEffect(() => {
        if (providerEmail && providerEmail.length !== 0) {
            formik.setFieldValue('providerEmail', ...providerEmail);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerEmail]);

    const bookingCategoryIdSelector = (category) => {
        switch (category) {
            case 'flights':
                setCategoryId(1);
                break;
            case 'hotels':
                setCategoryId(2);
                break;
            case 'concierges':
                setCategoryId(3);
                break;
            case 'cruises':
                setCategoryId(4);
                break;
            case 'transports':
                setCategoryId(5);
                break;
            case 'tours':
                setCategoryId(6);
                break;
            case 'insurances':
                setCategoryId(7);
                break;
            default:
                setCategoryId('');
        }
    }

    useEffect(() => {
        if (category) {
            bookingCategoryIdSelector(category);
        }
    }, [category]);

    // useEffect(() => {
    //     if (formik.values.providerName !== '' && previousProviderName !== formik.values.providerName && categoryId) {
    //         dispatch(setPreviousProviderName(formik.values.providerName));
    //         dispatch(supplierLookup({search: formik.values?.providerName, bookingCategoryId: categoryId}));
    //     }
    //     if (!formik.values.providerName) {
    //         dispatch(setSupplier([]));
    //     }
    // }, [dispatch, formik.values.providerName, categoryId, supplier, previousProviderName]);

    // useEffect(() => {
    //     if (supplier.length !== 0 && formik.values.providerName) {
    //         formik.setFieldValue('providerAddress', supplier[0]?.address);
    //         formik.setFieldValue('providerPhone', supplier[0]?.phone);
    //         formik.setFieldValue('providerWebsite', supplier[0]?.website);
    //         formik.setFieldValue('providerEmail', supplier[0]?.email || formik.values.providerEmail);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [supplier]);


    useEffect(() => {
        if (googleSearchInfo && formik.values.providerName) {
            formik.setFieldValue('providerAddress', googleSearchInfo?.address);
            formik.setFieldValue('providerPhone', googleSearchInfo?.phone);
            formik.setFieldValue('providerWebsite', googleSearchInfo?.website);
            formik.setFieldValue('providerEmail', googleSearchInfo?.email || formik.values.providerEmail);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [googleSearchInfo]);

    return (
        <Loading isFetching={isFetching}>
            <ItineraryFormContainer className={classes.spacing}>
                {
                    category === 'cruises' ? (
                        <Typography component={'div'} variant='body2'>CRUISE LINE</Typography>
                    ) : (
                        <Typography component={'div'} variant='body2'>SERVICE PROVIDER</Typography>
                    )
                }
                
                <FlexContainer $spacing>
                    <FlexContainer $spacing $column style={{width: '100%'}}>
                        <TextField
                            formik={formik}
                            label="Address"
                            name="providerAddress"
                            placeholder="Enter the Address"
                            width="380px"
                        />
                        <TextField
                            formik={formik}
                            label="Website"
                            name="providerWebsite"
                            placeholder="Enter the Website"
                            width="380px"
                        />
                    </FlexContainer>
                    <div className={classes.spacing}
                         style={{display: 'flex', flexDirection: 'column', marginTop: '0'}}>
                        <div>
                            <label className="phonenumberlabel" style={{color: '#242424', fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block'}}>
                                Phone Number
                            </label>
                            <PhoneField
                                label="Phone Number"
                                formik={formik}
                                name="providerPhone"
                                placeholder="Enter the Phone Number"
                                width="380px"
                            />
                        </div>
                        <ChipInput
                            label="Email"
                            newChipKeys={['Enter', ',', ' ']}
                            blurBehavior={'add'}
                            value={formik.values.providerEmail === '' || formik.values.providerEmail === null ? [] : [formik.values.providerEmail]}
                            onAdd={(chip) => handleAddChip(chip)}
                            onPaste={handlePaste}
                            onDelete={(chip, index) => handleDeleteChip(chip, index)}
                            InputLabelProps={{
                                shrink: true,
                                className: 'chip-label'
                            }}
                            style={{marginTop: '30px'}}
                            error={formik.touched.providerEmail && Boolean(formik.errors.providerEmail)}
                            placeholder="Enter the Email"
                            // InputProps={{disabled: formik.values.providerEmail !== ''}}
                            fullWidth
                        />
                    </div>
                </FlexContainer>
            </ItineraryFormContainer>
        </Loading>
    );
}

export default ProviderInformation;
