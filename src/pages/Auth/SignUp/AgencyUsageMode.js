import authStyles from "styles/muiStyles/authPageStyles";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import {Button} from "@core/components";
import {getAgencyUsageMode, constantsSelector} from "redux/features/constants/constantsSlice";
import Logo from "assets/Logo";
import LogoWhite  from '../../../assets/Logo-White.png';


const AgencyUsageMode = ({ stepChange, formik }) => {
    const dispatch = useDispatch();
    const classes = authStyles();

    const {agencyUsageModes} = useSelector(constantsSelector);

    useEffect(() => {
        dispatch(getAgencyUsageMode())
    }, [dispatch])

    const handleClick = (id) => {
        formik.setFieldValue('agency_usage_mode_id', id);
        stepChange('peronalInfo');
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container className={classes.signupWrapper}>
                <Grid item className={classes.leftWrapper}>
                    <div className={classes.leftContainer}>
                        <div className={classes.signupLogo1}>
                             <img src={LogoWhite} alt="logoWhite" className={classes.logoWhite}/>
                        </div>
                        <Typography className={classes.signupTitle1}>
                           Choose your
                        </Typography>
                        <Typography className={classes.signupTitle1}>
                            subscription
                        </Typography>
                        <Typography className={classes.signupdescription} >
                            Are you looking for freelance support or do you want the full Lucia experience?
                        </Typography>
                        <Typography className={classes.optionTitle} style={{marginTop: '80px'}}>
                           COPILOT
                        </Typography>
                        <Typography className={classes.signupdescription}>
                            Our marketplace allows you to hire freelancers to do tasks or projects for you, so you can grow without hiring. Think UpWork or TaskRabbit - but for travel.
                        </Typography>
                        <Typography className={classes.signupNote}>
                            Start Your 30 Day Free Trial
                        </Typography>
                        <div className={classes.signUpBtnInfo}>
                            <Button
                                $primary
                                $width={'220px'}
                                onClick={() => handleClick(1)}
                            >
                                Create Account
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item className={classes.rightWrapper}>
                    <div className={classes.leftContainer}>
                        <Typography className={classes.optionTitle}>
                            CoPilot
                            
                        </Typography>
                        <Typography className={classes.optionTitle} style={{marginTop: '30px'}}>
                            + Itinerary
                        </Typography>
                        <Typography className={classes.optionTitle} style={{marginTop: '30px'}}>
                            Management
                        </Typography>
                        <Typography className={classes.signupdescription}>
                            In addition to our marketplace, you can utilize our stunning itinerary management platform, complete with a mobile app, messaging, design themes, and more.
                        </Typography>
                        <Typography className={classes.signupNote}>
                            Start Your 30 Day Free Trial
                        </Typography>
                        <div className={classes.signUpBtnInfo}>
                            <Button
                                $primary
                                $width={'220px'}
                                onClick={() => handleClick(2)}
                            >
                                Create Account
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}

export default AgencyUsageMode