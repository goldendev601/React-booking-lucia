import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Button, ItineraryFormContainer} from "@core/components";
import { addItineraryStyles } from "styles";
import { useDispatch, useSelector } from "react-redux";
import { clearState, profileSelector, updateProfile, beginGoogleAuth } from "redux/features/profile/profileSlice";
import { error, success } from "styles/snackbarStyles/snackbarStyles";
import { useSnackbar } from 'react-simple-snackbar'
import { createErrorMessage } from "utils";
// import Calendar from "@ericz1803/react-google-calendar";


const ProfileCalendar = ({ handleOpenProfile }) => {
    const classes = addItineraryStyles();
    const { profileUser, isSuccess, isError, errorMessage, isFetching, googleAuthUrl } = useSelector(profileSelector);

    const dispatch = useDispatch();
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const formik = useFormik({
        initialValues: {
            jobTitle: profileUser?.jobTitle,
        },
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('job_title', values.jobTitle)
            dispatch(updateProfile(formData));
        }
    });

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('Profile roles is successfully changed');
            dispatch(clearState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);

    const onClickGoogleAuth = (e) => {
        window.open(googleAuthUrl);
    }

    useEffect(() => {
        if (!googleAuthUrl) {
            dispatch(beginGoogleAuth());
        }
    }, [googleAuthUrl])


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={classes.formPadding}>
                {
                    !profileUser.is_google_auth_validated && (
                        <ItineraryFormContainer className={classes.calendarInfo}>
                            <div className={classes.calendarInfoTitle}>
                                Connect to google calendar
                            </div>
                            <div className={classes.calendarInfoText}>
                                Once Lucia connects to your Google Calendar. the initial sync will start immediately. Any updates to records done in either Lucia or Google Calendar may take up to 15 minutes to sync.
                            </div>
                            <div className={classes.calendarbtnDiv}>
                                <Button
                                    className={classes.calendarbtn}
                                    onClick={(e) => onClickGoogleAuth(e)}
                                >
                                    Connect Calendar
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
        </form>
    );
}

export default ProfileCalendar;
