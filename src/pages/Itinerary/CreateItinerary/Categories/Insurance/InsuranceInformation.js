import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {Search} from "iconoir-react";
import {
    ItineraryFormContainer,
    DatePickerField,
    TextField,
    Loading, PriceField, SwitchLucia
} from "@core/components";
import {addItineraryStyles} from "styles";
import {useSelector} from "react-redux";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";
import { itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";

const InsuranceInformation = ({edit, formik}) => {
    const classes = addItineraryStyles();
    const {isFetching} = useSelector(bookingsSelector);

    const {packedItinerary} = useSelector(itinerariesSelector);

    const {
        startDate,
        endDate        
    } = packedItinerary || {};

    const itineraryStartDate = new Date(startDate);
    const itineraryEndDate = new Date(endDate);

    return (
        <Loading isFetching={isFetching}>
            <ItineraryFormContainer className={classes.spacing}>
                <Typography component={'div'} variant='body2'>INSURANCE INFORMATION</Typography>
                <Grid container justify="space-between">
                    <div style={{width: 380}}>
                        <Grid item xs={12} className={classes.spacing}>
                            <TextField
                                formik={formik}
                                label="Insurance Provider (*)"
                                name="providerName"
                                placeholder="Enter Provider Name"
                            />
                            {formik.touched.providerName && formik.errors.providerName && <div className={classes.validationErrorNotification}>{formik.errors.providerName}</div>}
                            <TextField
                                formik={formik}
                                label="Company (*)"
                                name="company"
                                placeholder="Enter company name"
                                startIcon={<Search/>}
                            />
                            {formik.touched.company && formik.errors.company && <div className={classes.validationErrorNotification}>{formik.errors.company}</div>}
                            <div>
                                <DatePickerField
                                    width="380px"
                                    name="effectiveDate"
                                    label="Effective Date (*)"
                                    placeholder="Select Day"
                                    formik={formik}
                                    startDate={itineraryStartDate}
                                    endDate={itineraryEndDate}
                                />
                            </div>
                            {formik.touched.effectiveDate && formik.errors.effectiveDate && <div className={classes.validationErrorNotification}>{formik.errors.effectiveDate}</div>}
                        </Grid>
                    </div>
                    <div style={{width: 380}}>
                        <Grid item xs={12} className={classes.spacing}>
                            <Grid container justify="space-between">
                                <Grid item>
                                    <PriceField
                                        formik={formik}
                                        label="Price"
                                        name="price"
                                        placeholder="Enter Price"
                                        width="180px"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        formik={formik}
                                        label="Payment"
                                        name="payment"
                                        placeholder="Enter Payment Details"
                                        width="180px"
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                formik={formik}
                                label="Confirmation Number"
                                name="confirmationReference"
                                placeholder="Enter Confirmation Number"
                            />
                            <TextField
                                formik={formik}
                                label="Policy Type"
                                name="policyType"
                                placeholder="Enter Policy Type"
                            />
                             {/* <TextField
                                formik={formik}
                                label="Custom Header Title"
                                name="customHeaderTitle"
                                placeholder="Enter custom header title"
                            /> */}
                        </Grid>
                    </div>
                    <div style={{display: 'flex', marginTop: '20px'}}>
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
                                           
                    </div>
                </Grid>
            </ItineraryFormContainer>
        </Loading>
    )
}

export default InsuranceInformation;
