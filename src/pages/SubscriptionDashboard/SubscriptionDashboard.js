import React, {useEffect } from 'react';
// import {useHistory} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "assets/Logo";
import { getSubscriptionPrices, profileSelector, checkout} from "redux/features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useSnackbar } from 'react-simple-snackbar';
// import { error, success } from "styles/snackbarStyles/snackbarStyles";

const SubscriptionDashboard = () => {

    // const history = useHistory();
    const dispatch = useDispatch();

    const {subscriptionPrices, redirectUrl} = useSelector(profileSelector);

    useEffect(() => {
        dispatch(getSubscriptionPrices());
    }, [dispatch]);    

    const useStyles = makeStyles({
        root: {
            textAlign: 'center',         
            backgroundColor: 'white',
            paddingTop: '107px',
            margin: 'auto',
            height: '100vh'
        },
        logo: {
            textAlign: 'center',
        },
        title: {
            textAlign: 'center',
            marginTop: '100px',
            '& h1': {
                color: '#94745C',
                fontFamily: 'MADE Mirage',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '50px',
                lineHeight: '60px',
                margin: '0px auto',
            },
        },
        description: {
            textAlign: 'center',
            marginTop: '30px',
            width: '40%',
            margin: '0px auto',
            '& h1': {
                color: '##242424',
                fontFamily: 'Raleway',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.05em'
            },
        },
        cardInfo: {            
            height: '272px',
            margin: '70px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        card: {
            border: '1px solid #BA886E',
            marginLeft: '15px',
            marginRight: '15px',            
            width: '288px',
            float: 'left'
        },
        cardDescription: {
            height: '232px',
        },
        cardButton: {
            height: '40px',
            backgroundColor: '#BA886E',
            paddingTop: '10px',
            cursor: 'pointer',
            '& p': {
               color: '#FFFFFF',
               fontFamily: 'Raleway',
               fontStyle: 'normal',
               fontWeight: '600',
               fontSize: '12px',
               lineHeight: '21px',
               textAlign: 'center'
            }
        },
        duration:{
            marginTop: '34px',
            '& p': {
                color: '#000000',
                textAlign: 'center',
                fontFamily: 'MADE Mirage',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '20px',
                lineHeight: '60px'
            }
        },
        cardPrice: {
            margin: '0px auto',
            color: '#94745C',
            textAlign: 'center',
            fontFamily: 'MADE Mirage',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '40px',
            lineHeight: '60px'
        },
        cardNote: {
            marginTop: '8px',
            '& p': {
                color: '#242424',
                textAlign: 'center',
                fontFamily: 'Raleway',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '12px',
                lineHeight: '21px'
            }
        }
    });

    const classes = useStyles();

    // const [open, setOpen]  = useState(false);
    // const [selectedPlan, setSelectedPlan]  = useState(0);

    // const {isSuccess, isError, errorMessage} = useSelector(profileSelector);
    // const [openSnackbarError] = useSnackbar(error);
    // const [openSnackbarSuccess] = useSnackbar(success);

    const redirect_url = process.env.REACT_APP_DOMAIN_URL + '/';

    const handleClick = (id) => {
        const data = {
            subscription_price_id: id,
            redirect_url: redirect_url
        }
        dispatch(checkout(data));
    }
    
    useEffect(() => {
        if (redirectUrl) {
            window.location.href = redirectUrl
        }
    }, [redirectUrl])


    // const handleClose = () => {
    //     setOpen(false)
    // }

    // const handleOpen = (id) => {
    //     setSelectedPlan(id)
    //     setOpen(true)
    // }

    return (
        <div className={classes.root}>
            <div className={classes.logo}>
                <Logo width="147.99" height="22.83" />
            </div>
            <div className={classes.title}>
                <h1>Founding Member Pricing</h1>
            </div>
            <div className={classes.description}>
                <p>We are offering a special price to our funding members. <b>$99/month</b> total is all you will pay. (You can also pay by year) </p>
            </div>
            <div className={classes.cardInfo}>
                {subscriptionPrices && subscriptionPrices.map((option, index) => {
                    return (
                        <div className={classes.card} key={index}>
                            <div className={classes.cardDescription}>
                                <div className={classes.duration}>
                                    <p>Pay per {option.recurring}</p>
                                </div>
                                <h1 class={classes.cardPrice}>${option.unitAmount}</h1>
                                <div className={classes.cardNote}>
                                    <p>We are offering a special price to our funding members.</p>
                                </div>
                            </div>
                            {/* <div className={classes.cardButton} onClick={() => {handleOpen(option.id)}}>
                                <p>Pay {option.recurring}ly</p>
                            </div> */}
                            <div className={classes.cardButton} onClick={() => handleClick(option.id)}>
                                <p>Pay {option.recurring}ly</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* <CardForm
                open={open}
                handleClose={handleClose}
                subscription_id={selectedPlan}
            /> */}
        </div>
    );
}

export default SubscriptionDashboard;
