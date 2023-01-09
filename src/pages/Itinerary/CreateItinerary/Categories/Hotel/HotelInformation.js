import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItineraryStyles} from "styles";
import {
    ItineraryFormContainer,
    TextField,
    Loading, 
    TimePickerField, 
    DatePickerField, 
    SwitchLucia,
    Autocomplete
} from "@core/components";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";
import {bookingFormSelector} from "redux/features/dialogForms/bookingFormSlice";
import { googlePlaceHotelSearch, supplierLookup, suppliersSelector} from "redux/features/suppliers/suppliersSlice";
import { itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import GooglePlacesAutocomplete, {} from 'react-google-places-autocomplete';

const HotelInformation = ({edit, formik}) => {
    const dispatch = useDispatch();
    const classes = addItineraryStyles();

    const [categoryId, setCategoryId] = useState('');

    const [value, setValue] = useState(null);

    const {isFetching} = useSelector(bookingsSelector);
    const {category} = useSelector(bookingFormSelector);
    const {previousProviderName, supplier, googleSearchInfo} = useSelector(suppliersSelector);

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
    //     if (categoryId && formik.values?.providerName) {
    //         dispatch(supplierLookup({search: formik.values?.providerName, bookingCategoryId: categoryId}));
    //     }
    // }, [dispatch, formik.values.providerName, categoryId, previousProviderName]);

    const {packedItinerary} = useSelector(itinerariesSelector);

    const {
        startDate,
        endDate        
    } = packedItinerary || {};

    const itineraryStartDate = new Date(startDate);
    const itineraryEndDate = new Date(endDate);

    useEffect(() => {
        if (googleSearchInfo) {
            formik.setFieldValue('providerName', googleSearchInfo?.name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [googleSearchInfo]);

    return (
        <Loading isFetching={isFetching}>
            <ItineraryFormContainer>
                <Grid container justify="space-between">
                    <div style={{width: 380}}>
                        <Grid item xs={12} className={classes.spacing}>
                            <Typography component={'div'} variant='body2'>HOTEL INFORMATION</Typography>
                            {/* <Grid item>
                                <Autocomplete
                                    options={supplier}
                                    formik={formik}
                                    name="providerName"
                                    label="Hotel Name (*)"
                                    placeholder="Search hotel"
                                    width="380px"
                                    labelMb="7px"
                                    onKeyDown={(e) => {
                                        if (e.target.value) {
                                            dispatch(supplierLookup({search: e.target.value, bookingCategoryId: categoryId}))
                                        }
                                    }}                                    
                                />
                                {formik.touched.providerName && formik.errors.providerName && <div className={classes.validationErrorNotification}>{formik.errors.providerName}</div>}
                            </Grid> */}
                            <Grid item>
                                <label className="phonenumberlabel" style={{color: '#242424', fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block'}}>
                                    Hotel Name (*)
                                </label>
                                {
                                    !edit && (
                                        <>
                                            
                                            <GooglePlacesAutocomplete
                                                apiKey={process.env.REACT_APP_GOOGLE_MAP_GEOCODE_KEY}
                                                selectProps={{                                        
                                                    defaultInputValue: formik.values.providerName,
                                                    value,
                                                    onChange: (value) => {   
                                                        console.log(value)                                         
                                                        setValue(value)
                                                        formik.setFieldValue('providerName', value.label)
                                                        dispatch(googlePlaceHotelSearch(value.value.place_id))
                                                    },
                                                    styles: {
                                                        input: (provided) => ({
                                                            ...provided,
                                                        }),
                                                        menu: (provided) => ({
                                                            ...provided,
                                                            zIndex: 999,
                                                        }),
                                                        control: (provided) => ({
                                                            ...provided,
                                                            border: 'none',
                                                            borderBottom: '1px solid',
                                                            borderRadius: 0,
                                                            borderColor: 'hsl(0, 0%, 80%)'
                                                        }),
                                                        indicatorSeparator: (provided) => ({
                                                            ...provided,
                                                            display: 'none'
                                                        })
                                                    }                           
                                                }}
                                            />
                                        </>
                                    )
                                }
                                
                                {
                                    edit && (
                                        <TextField
                                            formik={formik}
                                            name="providerName"
                                            width="380px"
                                            disabled
                                        />
                                    )
                                }
                                
                                {formik.touched.providerName && formik.errors.providerName && <div className={classes.validationErrorNotification}>{formik.errors.providerName}</div>}
                            </Grid>
                            <Grid container justify="space-between">
                                <Grid item>
                                    <DatePickerField
                                        name="checkInDate"
                                        label="Check-in Date (*)"
                                        placeholder="Check-in Date"
                                        formik={formik}
                                        startDate={itineraryStartDate}
                                        endDate={itineraryEndDate}
                                    />
                                    {formik.touched.checkInDate && formik.errors.checkInDate && <div className={classes.validationErrorNotification}>CheckInDate is required</div>}
                                </Grid>
                                <Grid item>
                                    <TimePickerField
                                        name="checkInTime"
                                        label="Check-in Time"
                                        placeholder="Select Time"
                                        formik={formik}
                                    />
                                    {formik.touched.checkInTime && formik.errors.checkInTime && <div className={classes.validationErrorNotification}>CheckInTime is required</div>}
                                </Grid>
                            </Grid>
                            <Grid item>
                                {
                                    edit ? (
                                        <SwitchLucia
                                            placeholder="Save supplier to library"
                                            value={formik.values.saveToLibrary}
                                            name="saveToLibrary"
                                            onChangeHandler={formik.handleChange}
                                            disabled={true}
                                        />
                                    ) : (
                                        <SwitchLucia
                                            placeholder="Save supplier to library"
                                            value={formik.values.saveToLibrary}
                                            name="saveToLibrary"
                                            onChangeHandler={formik.handleChange}
                                            disabled={false}
                                        />
                                    )
                                }
                                
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{width: 380, marginTop: '40px'}}>
                        <Grid item xs={12} className={classes.spacing}>
                            <TextField
                                formik={formik}
                                label="Confirmation Number"
                                name="confirmationReference"
                                placeholder="Enter the Confirmation Number"
                                width="380px"
                            />
                            <Grid container justify="space-between">
                                <Grid item>
                                    <DatePickerField
                                        name="checkOutDate"
                                        label="Check-out Date (*)"
                                        placeholder="Check-out Date"
                                        formik={formik}
                                        startDate={formik.values.checkInDate > itineraryStartDate ? formik.values.checkInDate : itineraryStartDate}
                                        endDate={itineraryEndDate}
                                    />
                                    {formik.touched.checkOutDate && formik.errors.checkOutDate && <div className={classes.validationErrorNotification}>CheckOutDate is required</div>}
                                </Grid>
                                <Grid item>
                                    <TimePickerField
                                        name="checkOutTime"
                                        label="Check-out Time"
                                        placeholder="Select Time"
                                        formik={formik}
                                    />
                                    {formik.touched.checkOutTime && formik.errors.checkOutTime && <div className={classes.validationErrorNotification}>CheckOutTime is required</div>}
                                </Grid>
                            </Grid>
                            <TextField
                                formik={formik}
                                label="Optional: Add a Custom Title"
                                name="customHeaderTitle"
                                placeholder="Enter custom header title"
                                width="380px"
                            />
                        </Grid>
                    </div>
                </Grid>
            </ItineraryFormContainer>
        </Loading>
    );
}

export default HotelInformation;
