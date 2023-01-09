import React, {useEffect, useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import {useFormik} from "formik";
import * as yup from "yup";
import {Button, ItineraryFormContainer, PasswordField} from "@core/components";
import {addItineraryStyles} from "styles";
import {createErrorMessage, objFieldsToSnakeCase} from "utils";
import {clearState, profileSelector, updatePassword} from "redux/features/profile/profileSlice";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import {useDispatch, useSelector} from "react-redux";

const validationSchema = yup.object().shape({
    currentPassword: yup.string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required("This field is required"),
    password: yup.string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required("This field is required"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("This field is required"),
});

const ProfilePassword = ({handleOpenProfile}) => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const {isSuccess, isError, errorMessage, isFetching} = useSelector(profileSelector);

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            password: '',
            passwordConfirmation: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setShowPassword({
                currentPassword: false,
                password: false,
                passwordConfirmation: false
            })
            dispatch(updatePassword(objFieldsToSnakeCase(values)));
        }
    });

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        password: false,
        passwordConfirmation: false,
    });

    const handleClickShowPassword = (propertyName) => setShowPassword(prevState => ({
        ...prevState,
        [propertyName]: !showPassword[propertyName]
    }));

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('Profile password is successfully changed');
            dispatch(clearState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <ItineraryFormContainer>
                <Grid container>
                    <Grid item xs={6} className={classes.spacing}>
                        <PasswordField
                            formik={formik}
                            handleClickShowPassword={handleClickShowPassword}
                            showPassword={showPassword}
                            label="Current Password"
                            name="currentPassword"
                            style={{width: '100%'}}
                        />
                        <PasswordField
                            formik={formik}
                            handleClickShowPassword={handleClickShowPassword}
                            showPassword={showPassword}
                            label="Password"
                            name="password"
                            style={{width: '100%'}}
                        />
                        <PasswordField
                            formik={formik}
                            handleClickShowPassword={handleClickShowPassword}
                            showPassword={showPassword}
                            label="Confirm password"
                            name="passwordConfirmation"
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={6} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Typography variant="body1" style={{width: '320px'}}>
                            This is your secure password for your account.
                        </Typography>
                    </Grid>
                </Grid>
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

    )
}

export default ProfilePassword;
