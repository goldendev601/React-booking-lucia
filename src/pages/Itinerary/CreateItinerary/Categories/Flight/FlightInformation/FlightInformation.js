import React from "react";
import { addItineraryStyles } from "styles/muiStyles";
import { TextField, Loading } from "@core/components";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { flightsSelector } from "redux/features/flights/flightsSlice";
import { itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import FlightSegments from '../FlightSegments/FlightSegments';


const FlightInformation = ({ formik }) => {
    const classes = addItineraryStyles();

    const { isFetching } = useSelector(flightsSelector);

    const [anchorEl, setAnchorEl] = React.useState(null);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const {packedItinerary} = useSelector(itinerariesSelector);
    
    return (
        <Loading isFetching={isFetching}>
            <div style={{ width: 380, paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px' }}>
                <Typography variant="h2" style={{fontSize: '14px', fontFamily: 'Raleway', color: '#242424', fontWeight: '600'}}>
                    MAIN INFORMATION
                </Typography>  
            </div>       
            <div className={`${classes.information} ${classes.formPadding}`}>   
                <div style={{ width: 380 }}>
                    <div className={classes.spacing}>
                        <TextField
                            formik={formik}
                            label="Record Locator"
                            name="confirmationNumber"
                            placeholder="Enter Record Locator"
                            width="380px"
                        />
                        {formik.touched.confirmationNumber && formik.errors.confirmationNumber && <div className={classes.validationErrorNotification}>{formik.errors.confirmationNumber}</div>}
                        <TextField
                            formik={formik}
                            label="Price"
                            name="price"
                            placeholder="Price"
                            width="380px"
                        />
                        {formik.touched.price && formik.errors.price && <div className={classes.validationErrorNotification}>{formik.errors.price}</div>}
                    </div>
                </div>
                <div style={{ width: 380 }}>
                    <div className={classes.spacing} style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* <TextField
                            formik={formik}
                            label="Booking Title (*)"
                            name="customHeaderTitle"
                            placeholder="Enter Booking Title"
                            width="380px"
                        />
                        {formik.touched.customHeaderTitle && formik.errors.customHeaderTitle && <div className={classes.validationErrorNotification}>{formik.errors.customHeaderTitle}</div>} */}
                        <TextField
                            formik={formik}
                            label="Check-in Url"
                            name="checkInUrl"
                            placeholder="Enter the Check-in URL"
                            width="380px"
                        />
                        {formik.touched.checkInUrl && formik.errors.checkInUrl && <div className={classes.validationErrorNotification}>{formik.errors.checkInUrl}</div>}
                    </div>
                </div>
            </div>
            <div style={{textAlign: 'center', marginTop: '10px'}}>
                {
                    formik.touched.segments && (formik.touched.segments).length === 0 && <div className={classes.validationErrorNotification}>You should put at least one segment.</div>
                }  
            </div>           
            <div>
                <FlightSegments formik={formik} />
            </div>
        </Loading>
    );
}

export default FlightInformation;
