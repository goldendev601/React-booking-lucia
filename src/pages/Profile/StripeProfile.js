import React, {useEffect, useState} from "react";
import { SelectField, UploadPicture, Button, Picture } from "@core/components";
import { Box, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { addItineraryStyles } from "styles";
import { useDispatch, useSelector } from "react-redux";
import { clearState, profileSelector, updateItineraryDesign } from "redux/features/profile/profileSlice";
import { getPropertyDesigns, itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import { error, success } from "styles/snackbarStyles/snackbarStyles";
import { useSnackbar } from 'react-simple-snackbar'
import { createErrorMessage } from "utils";


const StripeProfile = ({ handleOpenProfile }) => {
    const classes = addItineraryStyles();

    const { profileUser, isSuccess, isError, errorMessage, isFetching } = useSelector(profileSelector);

    const dispatch = useDispatch();

    const [itineraryLogoPicture, setItineraryLogoPicture] = useState([{itineraryLogo: profileUser.itineraryTheme?.itineraryLogoUrl}]);
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    useEffect(() => {
        dispatch(getPropertyDesigns())
    }, [dispatch])

    const { propertyDesigns } = useSelector(itinerariesSelector);

    const handlePictures = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            const url = URL.createObjectURL(imageFile)
            setItineraryLogoPicture([{
                itineraryLogo: url,
            }]);
            formik.setFieldValue('itineraryLogo', imageFile);
        }
    }

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('Your process is successfully done');
            dispatch(clearState());
        }       
    }, [isError, isSuccess]);

    const formik = useFormik({
        initialValues: {
            propertyDesignId: profileUser.itineraryTheme ? profileUser.itineraryTheme.propertyDesignId : 1,
            itineraryLogo: null,
        },
        onSubmit: (values) => {
            const formData = new FormData()
            formData.append('property_design_id', values.propertyDesignId)
            formData.append('itinerary_logo', values.itineraryLogo)
            dispatch(updateItineraryDesign(formData));
        }
    });

    console.log(profileUser);

    return (
        <form onSubmit={formik.handleSubmit}>

            {
                profileUser.stripeConnect === 'not created' ? (
                    <div className={classes.stripeContainer}> 
                        <Typography style={{width: '100%'}} className={classes.stripeIconText}>
                            stripe
                        </Typography>
                        <Typography style={{width: '100%'}} className={classes.stripeText}>
                            Connecting your Lucia account with your Stripe account will allow to receive payments for you when your clients pay for your completed tasks.
                        </Typography>
                        <div style={{width: '100%', margin: '20px auto', display: 'flex', justifyContent: 'center'}}>
                            <div style={{
                                width: '127px',
                                fontSize: '13px',
                                lineHeight: '15px',
                                fontWeight: '600',
                                fontFamily: 'Raleway',
                                backgroundColor: '#BA886E',
                                color: '#FFF',
                                textAlight: 'center',
                                paddingTop: '10px',
                                paddingBottom: '10px'
                            }}>
                                Connect Stripe
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={classes.stripeContainer}> 
                        <Typography style={{width: '100%'}} className={classes.stripeIconText}>
                            stripe
                        </Typography>
                        <Typography style={{width: '100%'}} className={classes.stripeText}>
                            Connected to Stripe on July 22, 2022
                        </Typography>
                        <Typography style={{width: '100%'}} className={classes.stripeText2}>
                            Status: Active
                        </Typography>
                        <div style={{width: '100%', margin: '20px auto', display: 'flex', justifyContent: 'center'}}>
                            <div style={{
                                width: '173px',
                                fontSize: '13px',
                                lineHeight: '15px',
                                fontWeight: '600',
                                fontFamily: 'Raleway',
                                backgroundColor: '#BA886E',
                                color: '#FFF',
                                textAlight: 'center',
                                paddingTop: '10px',
                                paddingBottom: '10px'
                            }}>
                                Go to Stripe Account
                            </div>
                        </div>
                    </div>
                )
            }
            
            <div className={classes.formActions}>
                <Button
                    $outlined
                    $width={'50%'}
                    onClick={handleOpenProfile}
                >
                    Cancel
                </Button>
                <Button
                    $primary
                    $width={'50%'}
                    type="submit"
                    disabled={isFetching}
                >
                    Save Changes
                </Button>
            </div>
        </form>
    );
}

export default StripeProfile;
