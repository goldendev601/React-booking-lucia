import React, {useEffect} from "react";
import {useFormik} from "formik";
import {Button, ItineraryFormContainer, TextField, Notification} from "@core/components";
import {addItineraryStyles} from "styles";
import {useDispatch, useSelector} from "react-redux";
import {clearState, profileSelector, updateProfile} from "redux/features/profile/profileSlice";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import {createErrorMessage} from "utils";

const ProfileRoles = ({handleOpenProfile}) => {
    const classes = addItineraryStyles();
    const {profileUser, isSuccess, isError, errorMessage, isFetching} = useSelector(profileSelector);

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

    return (
        <form onSubmit={formik.handleSubmit}>
            <ItineraryFormContainer className={classes.spacing}>
                <Notification
                    text={'As account owner, you have full access to Lucia. If you want to adjust your permissions, transfer your ownership to another employee.'}
                />
                <TextField
                    formik={formik}
                    label="Job Title"
                    name="jobTitle"
                    placeholder="Placeholder"
                    width="100%"
                />
            </ItineraryFormContainer>
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

export default ProfileRoles;
