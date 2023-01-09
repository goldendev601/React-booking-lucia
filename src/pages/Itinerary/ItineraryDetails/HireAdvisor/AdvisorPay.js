import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {useSnackbar} from 'react-simple-snackbar'
import {
    itinerariesSelector,
    advisorRequestsPayUsingIntent,
    setAdvisorRequestPaymentMethod,
    getPaymentMethods,
    setDefaultStripeTokenId,
    advisorRequestsPayUsingStoredPayment,
    clearAdvisorPayUsingStoredPaymentFlags,
    clearState
} from "redux/features/itineraries/itinerariesSlice";
import {
    Button
} from "@core/components";
import {createErrorMessage} from "../../../../utils";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import CheckoutForm from "./CheckoutForm";
import "./App.css";
import {ArrowLeft} from "iconoir-react";
import CheckMark  from '../../../../assets/check.png';
import MasterCard  from '../../../../assets/master-card.png';
import VisaCard  from '../../../../assets/visa-card.png';


const AdvisorPay = ({ stepChange, stepIndexChange, locationPath, id}) => {

    const dispatch = useDispatch();

    const { advisorRequestId, clientSecret, stripeKey, advisorRequest, advisorRequestPaymentMethod, paymentMethods, defaultStripeTokenId, isPayUsingStoredPaymentSuccess, isPayUsingStoredPaymentError, errorMessage, advisorRequestDiscounted } = useSelector(itinerariesSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    let stripePromise;

    if (stripeKey) {
        stripePromise = loadStripe(stripeKey)
    }

    useEffect(() => {
        dispatch(getPaymentMethods());
    }, []);

    useEffect(() => {
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        if (advisorRequestId && !clientSecret) {
            dispatch(advisorRequestsPayUsingIntent({ advisorId: advisorRequestId }))
        }
    }, [advisorRequestId]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const goBack = () => {
        stepChange('summary');
        stepIndexChange(2);
    }

    const clickEnterCard = () => {
        dispatch(setAdvisorRequestPaymentMethod(1));
    }

    const clickSelectCard = () => {
        dispatch(setAdvisorRequestPaymentMethod(2));
        dispatch(getPaymentMethods());
    }

    const goBackToSelectPaymentMethod = () => {
        dispatch(setAdvisorRequestPaymentMethod(0));
    }

    const selectPaymentOption = (paymentMethod) => {
        dispatch(setDefaultStripeTokenId(paymentMethod.stripeTokenId));
    }

    const pay = () => {
        const data = {
            'stripe_token_id': defaultStripeTokenId
        }
        if (advisorRequestId) {
            const payload = {
                advisorId: advisorRequestId,
                data: data
            }
            dispatch(advisorRequestsPayUsingStoredPayment(payload));
        }
    }

    useEffect(() => {
        if (isPayUsingStoredPaymentSuccess) {
            stepChange('final');
            stepIndexChange(4);
            openSnackbarSuccess('It has been paid successfully!');
            dispatch(clearState())
            dispatch(clearAdvisorPayUsingStoredPaymentFlags());
        }
        if (isPayUsingStoredPaymentError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState())
            dispatch(clearAdvisorPayUsingStoredPaymentFlags());
        }
    }, [isPayUsingStoredPaymentSuccess, isPayUsingStoredPaymentError]);


    const useStyles = makeStyles({
        hireadvisorLabel: {
            fontSize: '15px', 
            fontWeight: '600', 
            fontFamily: 'Raleway', 
            color: '#333'
        },
        cardTitle: {
            fontSize: '16px', 
            lineHeight: '20px',
            letterSpacing: '0.05em',
            fontWeight: '600', 
            fontFamily: 'Raleway', 
            color: '#333'
        },
        cardDescription: {
            fontSize: '12px', 
            lineHeight: '20px',
            letterSpacing: '0.05em',
            fontWeight: '600', 
            fontFamily: 'Raleway', 
            color: '#242424',
            marginTop: '5px'
        },
        cardLastFour: {
            fontSize: '12px', 
            lineHeight: '20px',
            letterSpacing: '0.05em',
            fontWeight: '400', 
            fontFamily: 'Raleway', 
            color: '#111'
        },
        cardExpire: {
            fontSize: '8px', 
            lineHeight: '20px',
            letterSpacing: '0.05em',
            fontWeight: '400', 
            fontFamily: 'Raleway', 
            color: '#111',
            marginTop: '5px'
        },
        hireadvisorPrice: {
            fontSize: '25px', 
            fontWeight: '600', 
            fontFamily: 'Raleway', 
            color: '#BA886E'
        },
        selectPaymentMethodWrapper: {
            width: '100%',
            marginTop: '40px'
        },
        selectPaymentMethodContainer: {
            width: '100%',
            marginTop: '20px',
            padding: '24px',
            borderColor: '#BDBDBD',
            borderWidth: '1px',
            borderStyle: 'solid',
            '&:hover': {
                cursor: "pointer"
            } 
        },
        backBtnWrapper: {
            width: '100%',
            marginTop: '40px',
            display: 'flex'
        },
        cardContainer: {
            width: '100%',
            display: 'flex',
            paddingTop: '10px',
            paddingBottom: '10px',
            borderStyle: 'solid',
            borderColor: '#BDBDBD',
            borderTopWidth: '0.5px',
            borderBottomWidth: '0px',
            borderLeftWidth: '0px',
            borderRightWidth: '0px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        iconImg: {
            width: '18px',
            height: '18px'
        },
        cardImg: {
            width: '28px',
            height: '28px'
        },
        unchecked: {
            width: '16px',
            height: '16px',
            borderRadius: '24px',
            borderWidth: '1px',
            borderColor: '#BDBDBD',
            borderStyle: 'solid'
        }
    });

    const classes = useStyles();

    return (
        <div className="App">
            <Typography component="h6" className={classes.hireadvisorLabel}>Total Amount</Typography>
            {
                advisorRequestDiscounted ? (
                    <Typography component="h1" className={classes.hireadvisorPrice}>${advisorRequestDiscounted.totalAmount.toFixed(2)}</Typography>
                ) : (
                    <Typography component="h1" className={classes.hireadvisorPrice}>${advisorRequest.totalAmount.toFixed(2)}</Typography>
                )
            }
            
            {
                clientSecret && (advisorRequestPaymentMethod === 0) && (
                    <div className={classes.selectPaymentMethodWrapper}>
                        <Typography component="h6" className={classes.hireadvisorLabel}>Select Payment method</Typography>
                        <div className={classes.selectPaymentMethodContainer} onClick={() => {clickSelectCard()}}>
                            <Typography component="h6" className={classes.cardTitle}>Select card</Typography>
                            <Typography className={classes.cardDescription}>Select previously entered cards on Stripe</Typography>
                        </div>
                        <div className={classes.selectPaymentMethodContainer} onClick={() => {clickEnterCard()}}>
                            <Typography component="h6" className={classes.cardTitle}>Enter card</Typography>
                            <Typography className={classes.cardDescription}>Enter new card information</Typography>
                        </div>
                        <Grid item md={12} style={{marginTop: '40px', width: '100%'}}>
                            <Button
                                $outlined
                                className={classes.nextBtn}
                                $width='100%'
                                onClick={() => {
                                    goBack()
                                }}
                            >
                                Back
                            </Button>
                        </Grid>
                    </div>
                )
            }
            {clientSecret && (advisorRequestPaymentMethod === 1) && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm stepChange={stepChange} stepIndexChange={stepIndexChange} locationPath={locationPath} id={id}/>
                </Elements>
            )}
            {
                (advisorRequestPaymentMethod === 2) && (
                    <div className={classes.selectPaymentMethodWrapper}>
                        <div className={classes.backBtnWrapper} onClick={() => {goBackToSelectPaymentMethod()}}>
                            <ArrowLeft style={{marginRight: '10px', width: '20px'}} color={'#BA886E'}/>
                            <Typography component="h6" className={classes.hireadvisorLabel}>Back to payment method</Typography>
                        </div>
                        <div className={classes.selectPaymentMethodContainer}>
                            <Typography component="h6" className={classes.cardTitle}>Select card</Typography>
                            <Typography className={classes.cardDescription}>Select previously entered cards on Stripe</Typography>
                            <div style={{width: '100%', marginTop: '15px'}}>
                                {paymentMethods && (paymentMethods.length > 0) && paymentMethods.map((paymentMethod, index) => (
                                    <div key={index} className={classes.cardContainer} onClick={() => selectPaymentOption(paymentMethod)}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            {
                                                paymentMethod.brand === "visa" && (
                                                    <img src={VisaCard} alt="visa-mark" className={classes.cardImg}/>
                                                )
                                            }
                                            {
                                                paymentMethod.brand === "mastercard" && (
                                                    <img src={MasterCard} alt="master-mark" className={classes.cardImg}/>
                                                )
                                            }
                                            <div style={{marginLeft: '12px'}}>
                                                <Typography className={classes.cardLastFour}>*** **** **** {paymentMethod.last4}</Typography>
                                                <Typography className={classes.cardExpire}>Expires {paymentMethod.expMonth}, {paymentMethod.expYear}</Typography>
                                            </div>
                                        </div>
                                        {
                                            defaultStripeTokenId === paymentMethod.stripeTokenId ? (
                                                <img src={CheckMark} alt="check-mark" className={classes.iconImg}/>
                                            ) : (
                                                <div className={classes.unchecked}></div>
                                            )
                                        }
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Grid item md={12} style={{marginTop: '40px', width: '100%'}}>
                            <Button
                                $primary
                                className={classes.nextBtn}
                                $width='100%'
                                onClick={() => {
                                    pay()
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </div>
                )
            }
        </div>
    );
}

export default AdvisorPay