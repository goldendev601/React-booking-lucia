import React, {useEffect, useState} from "react";
import ReactInputVerificationCode from 'react-input-verification-code';
import {Container, Typography} from "@material-ui/core";
import {authPageStyles} from "styles";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import {Button, StyledButton} from "@core/components";
import {colors} from "styles/colors";
import Logo from "assets/Logo";
import {recoverySelector} from "redux/features/auth/recoverySlice";
import {createErrorMessage, removeLineBreaks} from "utils";
import {clearState} from "redux/features/auth/authSlice";
import {useSelector} from "react-redux";
import LogoWhite  from '../../../../assets/Logo-White.png';

const ValidCode = ({nextStep, passwordResetToken, handleChange, validateToken, dispatch, sendResetAgain, email}) => {
    const classes = authPageStyles();

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const [verificationCodeError, setVerificationCodeError] = useState(false);
    const {isSuccess, isFetching, isError, errorMessage, sentResetTokenAgainSuccess, sentResetTokenAgainError} = useSelector(recoverySelector);

    const onHandleChange = (code) => handleChange('passwordResetToken', removeLineBreaks(code));

    const onClickHandler = () => {
        if (passwordResetToken.length === 6) {
            validateToken();
        } else {
            openSnackbarError('Enter validation code.');
            setVerificationCodeError(true);
        }
    }

    const emailUsername = (email) => {
        const emailUsername = email.substring(0, email.indexOf("@"));
        const address = email.split('@').pop()
        // eslint-disable-next-line no-useless-concat
        return emailUsername.substr(0, emailUsername.length - 4) + '****' + "@" + address;
    }

    useEffect(() => {
        if (isError || sentResetTokenAgainError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (sentResetTokenAgainSuccess) {
            openSnackbarSuccess('Validation code sent to the specified email.');
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('Validation code confirmed.');
            dispatch(clearState());
            nextStep();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, sentResetTokenAgainSuccess, sentResetTokenAgainError]);

    return (
        // <Container fixed>
            <div className={classes.signinWrapper}>
                <div className={classes.container}>
                    <div className={classes.signinLogo}>
                        {/* <Logo/> */}
                        <img src={LogoWhite} alt="logoWhite" className={classes.logoWhite}/>
                    </div>
                    <Typography className={classes.signinTitle}>
                        Valid code
                    </Typography>
                    <Typography className={classes.description} variant="body1">
                        We sent a verification email to {emailUsername(email)}
                    </Typography>
                    <div className={`custom-styles ${verificationCodeError && 'custom-styles-error'}`} style={{marginTop: '30px'}}>
                        <ReactInputVerificationCode length={6} placeholder=""
                                                    onChange={onHandleChange}/>
                    </div>
                    <div className={classes.formActions} style={{marginTop: '60px'}}>
                        <StyledButton
                            onClick={sendResetAgain}
                            style={{color: '#FFF'}}
                        >
                            Send the code again
                        </StyledButton>
                        <Button
                            onClick={onClickHandler}
                            $primary
                            $width={'190px'}
                            style={{backgroundColor: '#BA886E'}}
                            type="submit"
                            disabled={isFetching}
                        >
                            Validate
                        </Button>
                    </div>
                </div>
            </div>
        // </Container>
    );
}

export default ValidCode;
