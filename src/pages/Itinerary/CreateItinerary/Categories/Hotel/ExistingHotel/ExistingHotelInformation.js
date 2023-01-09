import {TextField, Typography} from "@material-ui/core";
import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import {DateRangePicker} from 'rsuite';
import {addItineraryStyles} from "styles/muiStyles";
import Counter from "../../../../../../@core/components/Counter/Counter";
import {colors} from "../../../../../../styles/colors";
import hotelPicture from '../../../../../../assets/hotelPicture.png'
import CustomSwitch from "../../../../../../@core/components/Switch/CustomSwitch";
import DialogActions from "../../../../../../@core/components/Dialog/DialogActions";

const validationSchema = yup.object({});

const ExistingHotelInformation = ({handleStateChange, nextStep, handleCloseDialogs}) => {
    const classes = addItineraryStyles();
    const formik = useFormik({
        initialValues: {
            nameItinerary: '',
            dates: '',
            travelers: 1,
            checkbox: false,
        },
        validationSchema: validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            handleStateChange(values);
            nextStep();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={`${classes.information} ${classes.formPadding}`}>
                <div className={classes.spacing}>
                    <Typography component={'div'} variant='body2'>ITINERARY INFORMATION</Typography>
                    <TextField
                        style={{width: '380px'}}
                        id="nameItinerary"
                        name="nameItinerary"
                        label="Itinerary Name"
                        placeholder='Placeholder'
                        value={formik.values.nameItinerary}
                        onChange={formik.handleChange}
                        error={formik.touched.nameItinerary && Boolean(formik.errors.nameItinerary)}
                        InputLabelProps={{shrink: true}}
                    />
                    <div style={{
                        marginTop: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}>
                        <div>
                            <span style={{
                                fontWeight: '600', color: `${colors.black1}`, display: 'flex', marginBottom: '3px',
                                fontSize: '14px'
                            }}>Dates</span>
                            <DateRangePicker
                                style={{zIndex: '1300', width: '220px'}}
                                placeholder={'Check-in > Check Out'}
                            />
                        </div>
                        <Counter
                            name="travelers"
                            formik={formik}
                            label="Travelers"
                        />
                    </div>
                </div>
                <div className={classes.spacing} style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography component={'div'} variant='body2'>ADDITIONAL INFORMATION</Typography>
                    <img style={{marginTop: '20px'}} src={hotelPicture} alt=""/>
                    <div style={{display: 'flex'}}>
                        <Typography component={'div'} variant='body2'>Name</Typography>
                        <Typography style={{fontWeight: '300', marginLeft: '50px'}} component={'div'} variant='body2'>Pod
                            51 Hotel</Typography>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Typography component={'div'} variant='body2'>Address</Typography>
                        <Typography style={{fontWeight: '300', marginLeft: '33px'}} component={'div'} variant='body2'>230
                            E 51st St, New York, NY 10022</Typography>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Typography component={'div'} variant='body2'>Phone</Typography>
                        <Typography style={{fontWeight: '300', marginLeft: '47px'}} component={'div'} variant='body2'>+1
                            212-355-0300</Typography>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Typography component={'div'} variant='body2'>Email</Typography>
                        <Typography style={{fontWeight: '300', marginLeft: '52px'}} component={'div'}
                                    variant='body2'>info@podhotel51.com</Typography>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Typography component={'div'} variant='body2'>Website</Typography>
                        <Typography style={{fontWeight: '300', marginLeft: '33px'}} component={'div'}
                                    variant='body2'>http://www.podhotel51.com</Typography>
                    </div>
                    <div style={{display: 'flex', marginTop: '15px'}}>
                        <CustomSwitch/>
                        <Typography
                            style={{fontWeight: '300', marginLeft: '37px', display: 'flex', alignItems: 'center'}}
                            component={'div'} variant='body2'
                        >
                            Autocomplete passengers
                        </Typography>
                    </div>
                </div>
            </div>
            <DialogActions handleCloseDialogs={handleCloseDialogs}/>
        </form>
    )
}

export default ExistingHotelInformation;
