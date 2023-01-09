import React, {useEffect} from 'react';
import {Container, Typography} from "@material-ui/core";
import {authPageStyles} from "styles";
import {useFormik} from "formik";
import * as yup from "yup";
import {NavArrowLeft} from "iconoir-react";
import {StyledLink, AuthStyledLink, Button, TextField, AuthTextField} from "@core/components";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import {colors} from "styles/colors";
import Logo from "assets/Logo";
import {passwordReset, recoverySelector} from "redux/features/auth/recoverySlice";
import {useSelector} from "react-redux";
import {createErrorMessage} from "utils";
import {clearState} from "redux/features/auth/recoverySlice";
import LogoWhite  from '../../../../assets/Logo-White.png';


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});

const RecoveryPassword = ({handleChange, nextStep, dispatch}) => {
    const classes = authPageStyles();
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const {isSuccess, isError, errorMessage, isFetching} = useSelector(recoverySelector);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleChange(undefined, values);
            dispatch(passwordReset(values));
        }
    });

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('Validation code sent to the specified email.');
            dispatch(clearState());
            nextStep();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);

    return (
        <div>
            {/* <Container fixed> */}
                <div className={classes.signinWrapper}>
                    <div className={classes.container}>
                        <div className={classes.signinLogo}>
                            <img src={LogoWhite} alt="logoWhite" className={classes.logoWhite}/>
                        </div>
                        <Typography className={classes.signinTitle}>
                            Recovery Password
                        </Typography>
                        <Typography className={classes.description} variant="body1">
                            We will send you an access code to your registered email so you can change your password
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Typography className={classes.signinLabel} style={{marginTop: '48px'}}>
                                Email
                            </Typography>
                            <AuthTextField
                                formik={formik}
                                name="email"
                                placeholder="Put your email"
                                width="100%"
                            />
                            <div className={classes.formActions} style={{marginTop: '120px'}}>
                                <AuthStyledLink style={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse'
                                }} to='/signin'>Back to login
                                    <NavArrowLeft style={{margin: '2px 5px 0 0', color: '#FFF'}}/>
                                </AuthStyledLink>
                                <Button
                                    onClick={() => {
                                        !formik.isValid && openSnackbarError(createErrorMessage(formik.errors))
                                    }}
                                    $primary
                                    $width={'160px'}
                                    style={{backgroundColor: '#BA886E'}}
                                    type="submit"
                                    disabled={isFetching}
                                >
                                    Recovery
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            {/* </Container> */}
        </div>
    );
}

export default RecoveryPassword;
