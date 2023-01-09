import React from "react";
import {useSelector} from "react-redux";
import {Grid, TextField} from "@material-ui/core";
import {DatePickerField, SwitchLucia, TimePickerField} from "@core/components";
import { itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import {addItineraryStyles} from "styles";

const Car = ({edit, formik}) => {
    const classes = addItineraryStyles();

    const {packedItinerary} = useSelector(itinerariesSelector);

    const {
        startDate,
        endDate        
    } = packedItinerary || {};

    const itineraryStartDate = new Date(startDate);
    const itineraryEndDate = new Date(endDate);

    return (
        <Grid container className={classes.spacing}>
            <Grid container justify="space-between">
                <Grid item>
                    <DatePickerField
                        name="departureDay"
                        label="Pick Up Date (*)"
                        placeholder="Select Date"
                        formik={formik}
                        startDate={itineraryStartDate}
                        endDate={itineraryEndDate}
                    />
                    {formik.touched.departureDay && formik.errors.departureDay && <div className={classes.validationErrorNotification}>{formik.errors.departureDay}</div>}
                </Grid>
                <Grid item>
                    <TimePickerField
                        name="departureTime"
                        label="Pick-Up Time"
                        placeholder="Select Time"
                        formik={formik}
                    />
                    {formik.touched.departureTime && formik.errors.departureTime && <div className={classes.validationErrorNotification}>{formik.errors.departureTime}</div>}
                </Grid>
                <Grid item>
                    <TextField
                        style={{width: '380px'}}
                        id="transportFrom"
                        name="transportFrom"
                        label="Pick-Up Location"
                        placeholder='Enter Location'
                        value={formik.values.transportFrom}
                        onChange={formik.handleChange}
                        error={formik.touched.transportFrom && Boolean(formik.errors.transportFrom)}
                        InputLabelProps={{shrink: true}}
                    />                    
                </Grid>
            </Grid>
            <Grid container justify="space-between">
                <Grid item>
                    <DatePickerField
                        name="arrivalDay"
                        label="Drop-Off Date (*)"
                        placeholder="Select Date"
                        formik={formik}
                        startDate={formik.values.departureDay > itineraryStartDate ? formik.values.departureDay : itineraryStartDate}
                        endDate={itineraryEndDate}
                    />
                    {formik.touched.arrivalDay && formik.errors.arrivalDay && <div className={classes.validationErrorNotification}>{formik.errors.arrivalDay}</div>}
                </Grid>
                <Grid item>
                    <TimePickerField
                        name="arrivalTime"
                        label="Drop-Off Time"
                        placeholder="Select Time"
                        formik={formik}
                    />
                    {formik.touched.arrivalTime && formik.errors.arrivalTime && <div className={classes.validationErrorNotification}>{formik.errors.arrivalTime}</div>}
                </Grid>
                <Grid item>
                    <TextField
                        style={{width: '380px'}}
                        id="transportTo"
                        name="transportTo"
                        label="Drop Off Location"
                        placeholder='Enter Location'
                        value={formik.values.transportTo}
                        onChange={formik.handleChange}
                        error={formik.touched.transportTo && Boolean(formik.errors.transportTo)}
                        InputLabelProps={{shrink: true}}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <TextField
                        style={{width: '380px'}}
                        id="vehicle"
                        name="vehicle"
                        label="Vehicle"
                        placeholder='Enter Vehicle Type'
                        value={formik.values.vehicle}
                        onChange={formik.handleChange}
                        error={formik.touched.vehicle && Boolean(formik.errors.vehicle)}
                        InputLabelProps={{shrink: true}}
                    />
                </Grid>
            </Grid>
            <Grid item style={{display: 'flex'}}>
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
    );
}

export default React.memo(Car);
