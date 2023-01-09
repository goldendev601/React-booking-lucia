import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {addItineraryStyles} from "styles";
import {useDispatch} from "react-redux";
import {
    ItineraryFormContainer,
    TextField,
    DatePickerField
} from "@core/components";
import {useSelector} from "react-redux";
import {
    itinerariesSelector,
} from "redux/features/itineraries/itinerariesSlice";

const ItineraryTasks = ({formik, edit}) => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();
    const {itinerary} = useSelector(itinerariesSelector);


    return (
        <ItineraryFormContainer>
            <Grid container justify="space-between">
                <div style={{width: 380}}>
                    <Grid item xs={12} className={classes.spacing}>
                        <Grid item>
                            <TextField
                                formik={formik}
                                label="Task Name (*)"
                                name="title"
                                placeholder="Enter task name"
                                width="380px"
                            />
                        </Grid>
                        
                    </Grid>
                </div>
                <div style={{width: 380}}>
                    <Grid item xs={12} className={classes.spacing}>
                        <Grid item>
                            <DatePickerField
                                name="deadline"
                                label="Deadline"
                                placeholder="Set task deadline"
                                formik={formik}
                                width='380px'
                            />
                        </Grid>
                    </Grid>
                </div>
                <div style={{width: '100%', marginTop: '30px'}}>
                    <TextField
                        formik={formik}
                        label="Enter task details"
                        name="notes"
                        placeholder="Enter task details"
                        width="100%"
                    />
                </div>
            </Grid>
        </ItineraryFormContainer>
    )
}

export default ItineraryTasks;
