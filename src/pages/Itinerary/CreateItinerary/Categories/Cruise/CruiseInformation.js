import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {
    ItineraryFormContainer,
    DatePickerField,
    TimePickerField,
    TextField, Loading, SwitchLucia,
} from "@core/components";
import { addItineraryStyles } from "styles";
import { useSelector } from "react-redux";
import { bookingsSelector } from "redux/features/itineraries/bookings/bookingsSlice";
import { itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";


const CruiseInformation = ({edit, formik}) => {
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
                <Typography component={'div'} variant='body2'>CRUISE INFORMATION</Typography>
                <Grid container justify="space-between">
                    <div style={{width: 380}}>
                        <Grid item xs={12} className={classes.spacing}>
                            <TextField
                                formik={formik}
                                label="Cruise Name"
                                name="customHeaderTitle"
                                width="380px"
                                placeholder="Enter Cruise Name"
                            />
                            <TextField
                                formik={formik}
                                label="Departure Port City (*)"
                                name="departurePortCity"
                                width="380px"
                                placeholder="Enter city"
                            />
                            {formik.touched.departurePortCity && formik.errors.departurePortCity && <div className={classes.validationErrorNotification}>{formik.errors.departurePortCity}</div>}
                            <Grid container justify="space-between">
                                <Grid item>
                                    <DatePickerField
                                        name="departureDay"
                                        label="Embarkation Date (*)"
                                        placeholder="Select Day"
                                        formik={formik}
                                        startDate={itineraryStartDate}
                                        endDate={itineraryEndDate}
                                    />
                                    {formik.touched.departureDay && formik.errors.departureDay && <div className={classes.validationErrorNotification}>{formik.errors.departureDay}</div>}
                                </Grid>
                                <Grid item>
                                    <TimePickerField
                                        name="departureTime"
                                        label="Departure Time (*)"
                                        placeholder="Select Time"
                                        formik={formik}
                                    />
                                    {formik.touched.departureTime && formik.errors.departureTime && <div className={classes.validationErrorNotification}>{formik.errors.departureTime}</div>}
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
                    <div style={{width: 380}}>
                        <Grid item xs={12} className={classes.spacing}>
                            <TextField
                                formik={formik}
                                label="Cruise Line (*)"
                                name="providerName"
                                placeholder="Enter Cruise Line"
                                width="380px"
                            />
                            <TextField
                                formik={formik}
                                label="Arrival Port City (*)"
                                name="arrivalPortCity"
                                placeholder="Enter City"
                                width="380px"
                            />
                            {formik.touched.arrivalPortCity && formik.errors.arrivalPortCity && <div className={classes.validationErrorNotification}>{formik.errors.arrivalPortCity}</div>}
                            <Grid container justify="space-between">
                                <Grid item>
                                    <DatePickerField
                                        name="disembarkationDay"
                                        label="Disembarkation Date (*)"
                                        placeholder="Select Day"
                                        formik={formik}
                                        startDate={formik.values.departureDay > itineraryStartDate ? formik.values.departureDay : itineraryStartDate}
                                        endDate={itineraryEndDate}
                                    />
                                    {formik.touched.disembarkationDay && formik.errors.disembarkationDay && <div className={classes.validationErrorNotification}>{formik.errors.disembarkationDay}</div>}
                                </Grid>
                                <Grid item>
                                    <TimePickerField
                                        name="disembarkationTime"
                                        label="Disembarkation Time (*)"
                                        placeholder="Select Time"
                                        formik={formik}
                                    />
                                    {formik.touched.disembarkationTime && formik.errors.disembarkationTime && <div className={classes.validationErrorNotification}>{formik.errors.disembarkationTime}</div>}
                                </Grid>
                            </Grid>
                            <TextField
                                formik={formik}
                                label="Ship Name (*)"
                                name="cruiseShipName"
                                width="380px"
                                placeholder="Enter Ship Name"
                            />
                            {formik.touched.cruiseShipName && formik.errors.cruiseShipName && <div className={classes.validationErrorNotification}>{formik.errors.cruiseShipName}</div>}
                        </Grid>
                    </div>
                </Grid>
            </ItineraryFormContainer>
        </Loading>
    )
}

export default CruiseInformation;
