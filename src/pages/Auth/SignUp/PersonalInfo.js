import authStyles from "styles/muiStyles/authPageStyles";
import {BrowserRouter, useHistory} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { StyledLink, AuthStyledLink, AuthTextField, Button, PhoneField } from "@core/components";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { colors } from "styles/colors";
import { useSnackbar } from 'react-simple-snackbar'
import { error } from "styles/snackbarStyles/snackbarStyles";
import TermsOfServices from "../TermOfServices/TermsOfServices";

const PersonalInfo = ({ formik }) => {

    const history = useHistory();
    const classes = authStyles();

    // const [termsOfServicesOpen, setTermsOfServicesOpen] = useState(false);
    const [termsOfServicesAccept, setTermsOfServicesAccept] = useState(false);

    const [openSnackbarError] = useSnackbar(error);

    // const openTermsOfServices = () => {
    //     stepChange('termsOfServices');
    // }

    const checkTermsOfServices = () => setTermsOfServicesAccept(prevState => !prevState);

    const openTermsOfServices = () => {
        // history.push('/terms-conditions');
        const win = window.open("/terms-conditions", "_blank");
        win.focus();
    }

    // const closeTermsOfServices = () => {
    //     setTermsOfServicesOpen(false);
    //     setTermsOfServicesAccept(false);
    // }

    // const termsHandleClick = () => {
    //     setTermsOfServicesAccept(true);
    //     setTermsOfServicesOpen(false);
    // }

    useEffect(() => {
        console.log(termsOfServicesAccept);
        if (termsOfServicesAccept) {
            formik.setFieldValue('checked', termsOfServicesAccept)
        } else {
            formik.setFieldValue('checked', false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [termsOfServicesAccept])

    return (
        <>
            <Typography className={classes.description} variant="body1">
                Welcome, please enter your info below. This will allow you to manage all your itineraries.
            </Typography>
            <div className={classes.outer}>
                <div className={classes.row} style={{marginTop: '70px'}}>
                    <div style={{width: '45%'}}>
                        <Typography className={classes.signinLabel}>
                            First Name (*)
                        </Typography>
                        <AuthTextField
                            formik={formik}
                            name="firstName"
                            placeholder="Enter your First Name"
                            width="100%"
                        />
                    </div>
                    <div style={{width: '45%'}}>
                        <Typography className={classes.signinLabel}>
                            Last Name (*)
                        </Typography>
                        <AuthTextField
                            formik={formik}
                            name="lastName"
                            placeholder="Enter your Last Name"
                            width="100%"
                        />
                    </div>
                </div>
                <div className={classes.row} style={{marginTop: '40px'}}>
                    <div style={{width: '45%'}}>
                        <Typography className={classes.signinLabel}>
                            Email (*)
                        </Typography>
                        <AuthTextField
                            formik={formik}
                            name="email"
                            placeholder="Enter email address"
                            width="100%"
                        />
                    </div>
                    <div style={{width: '45%'}}>
                        <label className="phonenumberlabel" style={{ color: '#FFF', fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            Phone Number (*)
                        </label>
                        <PhoneField
                            formik={formik}
                            name="phone"
                            placeholder="Put phone number"
                            width="100%"
                        />
                    </div>
                </div>
                <div className={classes.row} style={{marginTop: '40px'}}>
                    <div style={{width: '45%'}}>
                        <Typography className={classes.signinLabel}>
                            Address (*)
                        </Typography>
                        <AuthTextField
                            formik={formik}
                            name="address"
                            placeholder="Street"
                            width="100%"
                        />
                    </div>
                    <div style={{width: '45%'}}>
                        <Typography className={classes.signinLabel}>
                            Agency Name (*)
                        </Typography>
                        <AuthTextField
                            formik={formik}
                            name="agencyName"
                            placeholder="Enter your name"
                            width="100%"
                        />
                    </div>
                </div>
                <div className={classes.row} style={{marginTop: '20px'}}>
                    <div style={{width: '45%', display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <AuthTextField
                                formik={formik}
                                name="city"
                                placeholder="City"
                                width="100%"
                            />
                        </div>
                        <div style={{width: '30%'}}>
                            <AuthTextField
                                formik={formik}
                                name="state"
                                placeholder="State"
                                width="100%"
                            />
                        </div>
                        <div style={{width: '20%'}}>
                            <AuthTextField
                                formik={formik}
                                name="zip"
                                placeholder="Zip"
                                width="100%"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.formActions1}>
                <div style={{display: 'flex'}}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={termsOfServicesAccept}
                                onClick={checkTermsOfServices}
                                id="checked"
                                name="checked"
                                color="secondary"
                                style={{
                                    transform: "scale(1.3)",
                                    color: "#FFF"
                                }}
                            />
                        }
                        // label="I agree to the terms and conditions"
                    />
                    <a className={classes.signupCheckLabel} onClick={openTermsOfServices}
                    > 
                        I agree to the terms and conditions
                    </a>
                </div>
                <Button
                    onClick={() => {
                        if (!formik.isValid) {
                            openSnackbarError('Fill in all the fields.')
                        }
                    }}
                    $primary
                    $width={'45%'}
                    style={{ backgroundColor: '#BA886E' }}
                    type="submit"
                >
                    Create account
                </Button>
            </div>
            <div className={classes.additionalActions}>
                <span>or</span>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <span className='span-lucia'>I already have an account.
                        <AuthStyledLink to='/signin' $borderbottom={true}> Login</AuthStyledLink>
                    </span>
                </div>
            </div>
            {/* {termsOfServicesOpen &&
                <TermsOfServices open={termsOfServicesOpen} handleClick={termsHandleClick}
                    handleClose={closeTermsOfServices} />} */}
        </>
    )
}

export default PersonalInfo