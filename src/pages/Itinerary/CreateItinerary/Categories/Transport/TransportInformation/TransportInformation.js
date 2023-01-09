import React from "react";
import {
    Grid,
    Typography
} from "@material-ui/core";
import {ItineraryFormContainer, Loading} from "@core/components";
import {addItineraryStyles} from "styles";
import Car from "./Car";
import Rail from "./Rail";
import Ferry from "./Ferry";
import Transfer from "./Transfer";
import TransportGeneral from "./TransportGeneral";
import {useSelector} from "react-redux";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";

const TransportInformation = ({edit, formik}) => {
    const classes = addItineraryStyles();
    const {isFetching} = useSelector(bookingsSelector);

    const transitTypeSelector = (edit, transitTypeId) => {
        switch (transitTypeId) {
            case 1:
                return (
                    <Rail formik={formik} edit={edit}/>
                );
            case 2:
                return (
                    <Ferry formik={formik} edit={edit}/>
                );
            case 3:
                return (
                    <Car formik={formik} edit={edit}/>
                );
            case 4:
                return (
                    <Transfer formik={formik} edit={edit}/>
                );
            default:
                return null;
        }
    }

    return (
        <Loading isFetching={isFetching}>
            <ItineraryFormContainer className={classes.spacing}>
                <Typography component={'div'} variant='body2'>MAIN INFORMATION</Typography>
                <Grid container className={classes.spacing}>
                    <TransportGeneral formik={formik} edit={edit}/>
                    {transitTypeSelector(edit, formik.values.transitTypeId)}
                </Grid>
            </ItineraryFormContainer>
        </Loading>
    );
}

export default TransportInformation;
