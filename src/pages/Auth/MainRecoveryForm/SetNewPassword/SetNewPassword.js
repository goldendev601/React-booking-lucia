import React, {useEffect, useState} from "react";
import authStyles from "styles/muiStyles/authPageStyles";
import {Container, Typography} from "@material-ui/core";
import {useFormik} from "formik";
import * as yup from "yup";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import {Button, PasswordField} from "@core/components";
import {colors} from "styles/colors";
import Logo from "assets/Logo";
import {createErrorMessage} from "utils";
import {clearState, recoverySelector} from "redux/features/auth/recoverySlice";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import {Check} from "iconoir-react";
import LogoWhite  from '../../../../assets/Logo-White.png';


const Text = styled.p`
  font-size: 12px;
  line-height: 24px;
  color: #FFF;
  display: flex;
  justify-items: center;
  text-align: left;
  margin-bottom: 5px;
`;

const PasswordRequirements = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  margin: 30px auto 0 auto;
`;

const StyledCheck = styled(Check)`
  color: #FFF;
  margin-top: 3px;
  margin-right: 15px;
`;

const validationSchema = yup.object().shape({
    password: yup.string()
        .required("This field is required")
        .min(8, "Must be 8 characters or more")
        .matches(/[a-z]+/, "At least one lowercase character")
        .matches(/[A-Z]+/, "At least one uppercase character")
        .matches(/[@$!%*#?&^]+/, "At least one special character")
        .matches(/\d+/, "At least one number"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required(""),
});

const SetNewPassword = ({handleChange, setVerificationStatus, dispatch}) => {
    const classes = authStyles();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            password: '',
            passwordConfirmation: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleChange(undefined, values);
            setVerificationStatus(true);
        }
    });

    const {isSuccess, isFetching, isError, errorMessage} = useSelector(recoverySelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const [showPassword, setShowPassword] = useState({
        password: false,
        passwordConfirmation: false,
    });
    const handleClickShowPassword = (propertyName) => setShowPassword({
        [propertyName]: !showPassword[propertyName]
    });

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            setVerificationStatus(false);
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('Your password has been successfully changed.');
            setVerificationStatus(false);
            dispatch(clearState());
            history.push('/signin');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);

    return (
        // <Container fixed>
            <div className={classes.signinWrapper}>
                <div className={classes.container}>
                    <div className={classes.signinLogo}>
                        {/* <Logo/> */}
                        <img src={LogoWhite} alt="logoWhite" className={classes.logoWhite}/>
                    </div>
                    <Typography className={classes.signinTitle}>
                        Set new password
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Typography className={classes.signinLabel} style={{marginTop: '30px'}}>
                            Password
                        </Typography>
                        <PasswordField
                            formik={formik}
                            handleClickShowPassword={handleClickShowPassword}
                            showPassword={showPassword}
                            placeholder="Put your password"
                            name="password"
                            style={{width: '100%', marginTop: '12px'}}
                        />
                        <Typography className={classes.signinLabel} style={{marginTop: '30px'}}>
                        Confirm password
                        </Typography>
                        <PasswordField
                            formik={formik}
                            handleClickShowPassword={handleClickShowPassword}
                            showPassword={showPassword}
                            placeholder="Put your password"
                            name="passwordConfirmation"
                            style={{width: '100%', marginTop: '12px'}}
                        />
                        <div className={classes.formActions} style={{flexDirection: 'row-reverse'}}>
                            <Button
                                onClick={() => {
                                    setShowPassword({password: false, passwordConfirmation: false});
                                    !formik.isValid && openSnackbarError(createErrorMessage(formik.errors));
                                }}
                                type="submit"
                                $primary
                                $width={'200px'}
                                style={{backgroundColor: '#BA886E'}}
                                disabled={isFetching}
                            >
                                Save password
                            </Button>
                        </div>
                    </form>
                    <PasswordRequirements>
                        <Text><StyledCheck/>Your password must be at least eight characters.</Text>
                        <Text><StyledCheck/>Must contain at least one digit.</Text>
                        <Text><StyledCheck/>Must contain at least one uppercase symbol.</Text>
                    </PasswordRequirements>
                </div>
            </div>
        // </Container>
    )
}

export default SetNewPassword;
