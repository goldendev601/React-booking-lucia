import React, {useEffect, useState} from 'react';
import {Typography} from "@material-ui/core";
import * as yup from 'yup';
import {useFormik} from 'formik';
import {Button, PasswordField, AuthStyledLink, AuthTextField} from "@core/components";
import {authPageStyles} from "styles";
import {useSnackbar} from 'react-simple-snackbar'
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import {loginUser, userSelector, clearState, setIsPushInitialized} from "redux/features/auth/authSlice";
import {createErrorMessage} from "../../../utils";
import LogoWhite  from '../../../assets/Logo-White.png';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});


const SignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const {isSuccess, isError, errorMessage, user, accessToken} = useSelector(userSelector);
    const classes = authPageStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            dispatch(loginUser(values));
        }
    });

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const [showPassword, setShowPassword] = useState({
        password: false,
    });
    const handleClickShowPassword = (propertyName) => setShowPassword(({
        [propertyName]: !showPassword[propertyName]
    }));

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('You are successfully signed in');
            dispatch(clearState());
            dispatch(setIsPushInitialized(true));

            if (process.env.REACT_APP_FORCE_LICENSE_CHECK ===  'FALSE' || user.hasValidLicense) {
                history.push('/');
            } else {
                // history.push('/subscription');
                history.push('/');
            }
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);


    useEffect(() => {
        if (user && accessToken) {
            let userAgent = navigator.userAgent;
            if(userAgent.match(/chrome|chromium|crios/i)) {
                const pushNotificationUrl = `${process.env.REACT_APP_BASE_URL}/beam?token=${accessToken}&userId=${user.id}&redirect_url=${process.env.REACT_APP_DOMAIN_URL}`
                window.location.href = pushNotificationUrl;
            }
        }
    }, [user, accessToken])

    return (
        <div className={classes.signinWrapper}>
            <div className={classes.container}>
                <div className={classes.signinLogo}>
                    <img src={LogoWhite} alt="logoWhite" className={classes.logoWhite}/>
                </div>
                <Typography className={classes.signinTitle}>
                    Welcome
                </Typography>
                <Typography className={classes.description} variant="body1"/>
                <form onSubmit={formik.handleSubmit} className={classes.signInForm}>
                    <div>
                        <Typography className={classes.signinLabel}>
                            Email
                        </Typography>
                        <AuthTextField
                            fullWidth
                            formik={formik}
                            name="email"
                            placeholder="Enter email address"
                            width="100%"
                        />
                    </div>
                    <div>
                        <Typography className={classes.signinLabel} style={{marginTop: '30px'}}>
                            Password
                        </Typography>
                        <PasswordField
                            fullWidth
                            formik={formik}
                            handleClickShowPassword={handleClickShowPassword}
                            showPassword={showPassword}
                            name="password"
                        />
                    </div>
                    <div className={classes.formActions}>
                        <AuthStyledLink $borderbottom={true} to='/recovery'>
                            Forgot password
                        </AuthStyledLink>
                        
                    </div>
                    <div className={classes.formActions}>
                        <Button
                            $primary
                            type="submit"
                            $width="100%"
                            onClick={() => {
                                !formik.isValid && openSnackbarError('Fill in all the fields.')
                            }}
                            style={{backgroundColor: '#BA886E'}}
                        >
                            Login
                        </Button>
                    </div>
                    <div className={classes.additionalActions}>
                        <span style={{color: '#FFF'}}>or</span>
                        <AuthStyledLink $borderbottom={true} to='/signup'>
                            Create account
                        </AuthStyledLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
