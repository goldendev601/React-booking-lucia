import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {
    itinerariesSelector, 
    advisorRequestsCompleteIntentPayment,
    setAdvisorRequestPaymentMethod
} from "redux/features/itineraries/itinerariesSlice";
import {ArrowLeft} from "iconoir-react";


export default function CheckoutForm({stepChange, locationPath}) {

   
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {advisorRequestId, advisorRequest} = useSelector(itinerariesSelector);

    useEffect(() => {

        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    if (advisorRequestId) {
                        dispatch(advisorRequestsCompleteIntentPayment({advisorId: advisorRequestId }))
                    }
                    setMessage("Payment succeeded!");
                    stepChange('final');
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: process.env.REACT_APP_DOMAIN_URL + locationPath + '/',
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsLoading(false);
    };

    const goBack = () => {
        dispatch(setAdvisorRequestPaymentMethod(0));
    }

    const useStyles = makeStyles({
        hireadvisorLabel: {
            fontSize: '15px', 
            fontWeight: '600', 
            fontFamily: 'Raleway', 
            color: '#333'
        },
        backBtnWrapper: {
            width: '100%',
            marginTop: '40px',
            display: 'flex'
        }
    });

    const classes = useStyles();

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <div className={classes.backBtnWrapper} onClick={() => {goBack()}}>
                <ArrowLeft style={{marginRight: '10px', width: '20px'}} color={'#BA886E'}/>
                <Typography component="h6" className={classes.hireadvisorLabel}>Back to payment method</Typography>
            </div>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Submit"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}