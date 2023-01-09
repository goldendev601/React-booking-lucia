import React, { useEffect } from "react";
import { Button, ItineraryFormContainer} from "@core/components";
import { addItineraryStyles } from "styles";
import { useDispatch, useSelector } from "react-redux";
import { clearState, profileSelector, billingPortal } from "redux/features/profile/profileSlice";
import { error, success } from "styles/snackbarStyles/snackbarStyles";
import { useSnackbar } from 'react-simple-snackbar'
import { createErrorMessage } from "utils";

const ProfileSubscription = ({ handleOpenProfile }) => {
    const classes = addItineraryStyles();
    const { profileUser, isSuccess, isError, errorMessage, isFetching, billingPortalredirectUrl } = useSelector(profileSelector);


    const dispatch = useDispatch();
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const pathname = window.location.pathname;
    const redirect_url = process.env.REACT_APP_DOMAIN_URL + pathname;

    const handleClick = (e) => {
        e.preventDefault()
        const data = {
            redirect_url: redirect_url
        }
        dispatch(billingPortal(data));
    }

    useEffect(() => {
        if (billingPortalredirectUrl) {
            window.location.href = billingPortalredirectUrl
        }
    }, [billingPortalredirectUrl])
   

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

   

    return (
        <div>
            <div className={classes.formPadding}>
                {
                    !profileUser.is_google_auth_validated && (
                        <ItineraryFormContainer className={classes.calendarInfo}>
                            <div className={classes.calendarInfoTitle}>
                                Manage your subscription
                            </div>
                            <div className={classes.calendarInfoText}>
                                Lucia Hospitality Group Inc. collaborate with Stripe to bring you easy billing management.
                                You have an ongoing lucia subscription. You can click the button below to manage your subscription.
                            </div>
                            <div className={classes.calendarbtnDiv}>
                                <Button
                                    className={classes.calendarbtn}
                                    onClick={(e) => handleClick(e)}
                                >
                                    Billing Portal 
                                </Button>
                            </div>
                        </ItineraryFormContainer>
                    )
                }

                {/* <Calendar apiKey={API_KEY} calendars={calendars} /> */}

            </div>
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
        </div>
    );
}

export default ProfileSubscription;
