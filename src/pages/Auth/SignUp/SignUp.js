import React, {useEffect, useState} from "react";
import authStyles from "styles/muiStyles/authPageStyles";
import {Container, Typography} from "@material-ui/core";
import {useFormik} from "formik";
import * as yup from "yup";
import AccountApproval from "../AccountApproval/AccountApproval";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import Logo from "assets/Logo";
import {clearState, registerUser, userSelector} from "redux/features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {createErrorMessage, objFieldsToSnakeCase, removeProperty} from "utils";
import PersonalInfo from "./PersonalInfo";
import AgencyUsageMode from "./AgencyUsageMode";
import Terms from "./Terms";
import LogoWhite  from '../../../assets/Logo-White.png';


const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    address: yup.string().required('Address is required'),
    agencyName: yup.string().required('Agency Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    checked: yup.bool().oneOf([true], 'Field must be checked'),
    phone: yup
        .string()
        .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value))
        .required('Phone number is required')
});

const SignUp = () => {
    const classes = authStyles();
    const dispatch = useDispatch();
    const {isSuccess, isError, errorMessage} = useSelector(userSelector);
    
    // const [termsOfServicesAccept, setTermsOfServicesAccept] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            agencyName: '',
            checked: false,
            agency_usage_mode_id: 1
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            var formData = objFieldsToSnakeCase(removeProperty('checked', values));
            formData = objFieldsToSnakeCase(removeProperty('city', values));
            formData = objFieldsToSnakeCase(removeProperty('state', values));
            formData = objFieldsToSnakeCase(removeProperty('zip', values));
            formData.phone = values.phone.replaceAll(' ', '');
            formData.address = values.address + ', ' + values.city + ', ' + values.state + values.zip;
            dispatch(registerUser(formData));
        }
    });
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('Your account has been successfully created');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);

    const [step, setStep] = useState("agencyUsageMode");

    return (
        isSuccess
            ? <AccountApproval/>
            : <div>
                {
                    step === 'agencyUsageMode' && (
                        <AgencyUsageMode stepChange = {setStep} formik={formik} />
                    )
                }
                {
                    step === 'peronalInfo' && (
                        <div className={classes.signupWrapper}>
                            <div className={classes.signupContainer}>
                                <div className={classes.signupLogo}>
                                    <img src={LogoWhite} alt="logoWhite" className={classes.logoWhite}/>
                                </div>
                                <Typography className={classes.signinTitle}>
                                    Create account
                                </Typography>
                                <form onSubmit={formik.handleSubmit}>
                                    <PersonalInfo formik={formik} />
                                </form>
                            </div>
                        </div>
                    )
                }
                {/* {
                    step === 'termsOfServices' && (
                        <Terms stepChange = {setStep} formik={formik} />
                    )
                } */}
                
                
            </div>
    )
}

SignUp.layout = 'notAuthorizedLayout';

export default SignUp;
