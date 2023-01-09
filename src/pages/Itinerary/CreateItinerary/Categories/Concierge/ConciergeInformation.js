import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {
    DatePickerField,
    ItineraryFormContainer,
    TimePickerField,
    TextField,
    Loading, PriceField, SwitchLucia
} from "@core/components";
import {addItineraryStyles} from "styles";
import {useSelector} from "react-redux";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";
import { itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";

const ConciergeInformation = ({edit, formik}) => {
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
                <Typography component={'div'} variant='body2'>MAIN INFORMATION</Typography>
                <Grid container justify="space-between">
                    <div style={{width: 380}}>
                        <Grid item xs={12} className={classes.spacing}>
                            <TextField
                                formik={formik}
                                label="Title"
                                name="customHeaderTitle"
                                placeholder="Enter Title"
                            />
                            
                            <TextField
                                formik={formik}
                                label="Service Type (*)"
                                name="serviceType"
                                placeholder="Enter Service Type"
                            />
                            <Grid container justify="space-between">
                                <Grid item>
                                    <DatePickerField
                                        name="startDay"
                                        label="Start Date (*)"
                                        placeholder="Select Date"
                                        formik={formik}
                                        startDate={itineraryStartDate}
                                        endDate={itineraryEndDate}                                        
                                    />
                                    {formik.touched.startDay && formik.errors.startDay && <div className={classes.validationErrorNotification}>{formik.errors.startDay}</div>}
                                </Grid>
                                <Grid item>
                                    <TimePickerField
                                        name="startTime"
                                        label="Start Time"
                                        placeholder="Select Time"
                                        formik={formik}
                                    />
                                    {formik.touched.startTime && formik.errors.startTime && <div className={classes.validationErrorNotification}>{formik.errors.startTime}</div>}
                                </Grid>
                            </Grid>
                            <Grid container justify="space-between">
                                <Grid item>
                                    <DatePickerField
                                        name="endDay"
                                        label="End Date"
                                        placeholder="Select Date"
                                        formik={formik}
                                        startDate={formik.values.startDay > itineraryStartDate ? formik.values.startDay : itineraryStartDate}
                                        endDate={itineraryEndDate}
                                    />
                                    {formik.touched.endDay && formik.errors.endDay && <div className={classes.validationErrorNotification}>{formik.errors.endDay}</div>}
                                </Grid>
                                <Grid item>
                                    <TimePickerField
                                        name="endTime"
                                        label="End Time"
                                        placeholder="Select Time"
                                        formik={formik}
                                    />
                                    {formik.touched.endTime && formik.errors.endTime && <div className={classes.validationErrorNotification}>{formik.errors.endTime}</div>}
                                </Grid>
                            </Grid>
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
                                        placeholder="Enter Payment Info"
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
                                label="Confirmed For"
                                name="confirmedFor"
                                placeholder="Enter Name"
                            />
                            <TextField
                                formik={formik}
                                label="Confirmed by"
                                name="confirmedBy"
                                placeholder="Enter Name"
                            />
                            {
                                edit ? (
                                    <TextField
                                        formik={formik}
                                        label="Service Provider (*)"
                                        name="providerName"
                                        placeholder="Enter the Provider Name"   
                                        disabled                             
                                    />
                                ) : (
                                    <TextField
                                        formik={formik}
                                        label="Service Provider (*)"
                                        name="providerName"
                                        placeholder="Enter the Provider Name"                                
                                    />
                                )
                            }
                            {formik.touched.providerName && formik.errors.providerName && <div className={classes.validationErrorNotification}>{formik.errors.providerName}</div>}
                        </Grid>
                    </div>
                    <Grid item>
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
                </Grid>
            </ItineraryFormContainer>
        </Loading>
    )
}

export default ConciergeInformation;
