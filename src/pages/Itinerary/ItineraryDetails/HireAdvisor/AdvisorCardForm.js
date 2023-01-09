import React, { useEffect, useState } from "react";
import { Button } from "@core/components";
import { Dialog } from "@material-ui/core";
import { Typography, Grid } from "@material-ui/core";
import { colors } from "styles/colors";
import { DialogTitle} from "@core/components";
import { useSnackbar } from 'react-simple-snackbar'
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { createErrorMessage } from "../../utils";
import { useHistory } from "react-router-dom"
import { error, success } from "styles/snackbarStyles/snackbarStyles";

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useFormik } from "formik";
import styled from "styled-components";
import { subscribe, profileSelector, clearState, updateProfileState } from "redux/features/profile/profileSlice";
import { updateUserState } from "redux/features/auth/authSlice";

const DialogActions = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
`;

const useStyles = makeStyles({
    PaymentFormRoot: {
        marginTop: '35px',
    },
    cardFormBlock: {
        display: 'flex', 
        alignItems: 'center',
        textAlign: 'center'
    },
    cardImg: {
        display: 'flex', 
        alignItems: 'center',
        textAlign: 'center'
    },
    cardFormInput: {
        marginTop: '10px',
    },
    CardContent: {
        height: '300px',
        paddingLeft: '20px'
    }
});

const AdvisorCardForm = ({ open, handleClose}) => {

    const cardClasses = useStyles();
    const dispatch = useDispatch();
    const history = useHistory()
    const [cvc, setCVC] = useState('');
    const [exp_month, setExpiryMonth] = useState('');
    const [exp_year, setExpiryYear] = useState('');
    const [focus, setFocus] = useState('');
    const [number, setNumber] = useState('');

    const {isSuccess, isError, errorMessage} = useSelector(profileSelector)

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const classes = useStyles();

    const [bottom, setBottom] = useState(true);

    const handleClick = () => {
        const data = {
            payment_method: 'card',
            card_number: number,
            expiry_month: exp_month,
            expiry_year: exp_year,
            cvc,
        }
        // dispatch(subscribe(data))
    }   

    useEffect(() => {
        if (isError && errorMessage) {
            if (errorMessage.data && errorMessage.data.error) {
                openSnackbarError(createErrorMessage(errorMessage.data.error));
            } 
            if (errorMessage.data && errorMessage.data.cvc) {
                openSnackbarError(createErrorMessage(errorMessage.data.cvc[0]));
            } 
            if (errorMessage.data && errorMessage.data.exp_year) {
                openSnackbarError(createErrorMessage(errorMessage.data.exp_year[0]));
            } 
            if (errorMessage.data && errorMessage.data.exp_month) {
                openSnackbarError(createErrorMessage(errorMessage.data.exp_month[0]));
            }
            if (errorMessage.data && errorMessage.data.number) {                
                openSnackbarError(createErrorMessage(errorMessage.data.number[0]));
            }         
            dispatch(clearState())
        }
        if (isSuccess) {
            openSnackbarSuccess('Thanks for your adding your payment method');
            dispatch(clearState())
            dispatch(updateUserState('hasValidLicense', true))
            dispatch(updateProfileState('hasValidLicense', true))
            history.push('/itineraries');
        }
    }, [isSuccess, errorMessage])

    return (
        <div>
            <Dialog
                aria-labelledby="card-settings"
                open={open}
                classes={{ paper: cardClasses.paper }}
            >
                <DialogTitle id="card-settings" className={classes.cardSetting} onClose={handleClose}>
                    <Typography
                        variant="h3"
                        component={'div'}
                        style={{ color: `${colors.black1}`, letterSpacing: '0px', margin: '20px 0 5px 30px' }}
                    >
                        Credit Cards
                    </Typography>
                </DialogTitle>
                <DialogContent className={classes.CardContent}>
                    <div id="PaymentForm" className={classes.PaymentFormRoot}>
                        <Grid container>
                        
                            <Grid item sm={6} className={classes.cardImg}>
                                <Cards
                                    cvc={cvc}
                                    expiry={exp_month}
                                    focused={focus}
                                    number={number}
                                />
                            </Grid>
                            
                            <Grid item sm={6} className={classes.cardFormBlock}>
                            <form>
                                <input
                                    type="text"
                                    name="number"
                                    placeholder="Card Number"
                                    className={classes.cardFormInput}
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                                <p>E.g: 49..., 51..., 36..., 37... </p>
                                <input
                                    type="text"
                                    name="exp_month"
                                    placeholder="Expiration Month"
                                    className={classes.cardFormInput}
                                    value={exp_month}
                                    onChange={(e) => setExpiryMonth(e.target.value)}
                                />
                                <input
                                    type="text"
                                    name="exp_year"
                                    placeholder="Expiration Year"
                                    className={classes.cardFormInput}
                                    value={exp_year}
                                    onChange={(e) => setExpiryYear(e.target.value)}
                                />
                                <input
                                    type="text"
                                    name="cvc"
                                    placeholder="CVC"
                                    className={classes.cardFormInput}
                                    value={cvc}
                                    onChange={(e) => setCVC(e.target.value)}
                                />
                            </form>
                            </Grid>                            
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        $outlined
                        $width="50%"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleClick}
                        $primary
                        $width="50%"                       
                    >
                        Pay
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AdvisorCardForm;
