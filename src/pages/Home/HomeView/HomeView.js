import React, { useEffect, useState } from 'react';
import {homePageStyles} from "styles";
import {Grid, Typography} from "@material-ui/core";
import { getProfile, profileSelector } from "redux/features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {advisorRequestsGetTopConcierges, itinerariesSelector} from "redux/features/itineraries/itinerariesSlice";
import {
    setItineraryFormOpen,
    setHireCopilotFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {cleanText} from "utils";
import DefaultAvatar  from '../../../assets/null-profile-image.jpg';
import ButtonIcon1  from '../../../assets/home-icon-1.png';
import ButtonIcon2  from '../../../assets/home-icon-2.png';
import ButtonIcon3  from '../../../assets/home-icon-3.png';


const HomeView = () => {

    const classes = homePageStyles();

    const dispatch = useDispatch();
    const history = useHistory()

    const { topConcierges } = useSelector(itinerariesSelector);
    const { profileUser } = useSelector(profileSelector);
    const { firstName } = profileUser || {};

    useEffect(() => {
        dispatch(getProfile());
        dispatch(advisorRequestsGetTopConcierges(8));
    }, [dispatch]);
  

    const createNewItinerary = () => {
        history.push('/itineraries');
        dispatch(setItineraryFormOpen(true));
    } 

    const gotoCopilot = () => {
        history.push('/concierges');
        dispatch(setHireCopilotFormOpen(true));
    } 

    const openHelpCenter = () => {
        window.open('https://lets-lucia.webflow.io/faqs');
    } 

    return (
        <div>
            <div className={classes.aboveWrapper}>
                <div className={classes.container}>
                    <Typography className={classes.homeTitle}>
                        Hi {firstName}, Welcome to Lucia!
                    </Typography>
                    <Typography className={classes.homeNote}>
                        Would you like to:
                    </Typography>
                    <Grid container spacing={10} className={classes.buttonWrapper}>
                        <Grid item xs={4}>
                            <div className={classes.buttonDiv} onClick={() => gotoCopilot()}>
                                <img src={ButtonIcon1} alt="buttonIcon1" className={classes.buttonIcon}/>
                                <Typography className={classes.buttonTitle}>
                                    Hire a freelancer
                                </Typography>
                                <Typography className={classes.buttonDescription}>
                                    Off-board some of your workload to our trusted CoPilots.
                                </Typography>
                            </div>                            
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.buttonDiv} onClick={() => createNewItinerary()}>
                                <img src={ButtonIcon2} alt="buttonIcon2" className={classes.buttonIcon}/>
                                <Typography className={classes.buttonTitle}>
                                    Create an itineary
                                </Typography>
                                <Typography className={classes.buttonDescription}>
                                    Travel has always been beautiful, now itineraries can be too.
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.buttonDiv} onClick={() => openHelpCenter()}>
                                <img src={ButtonIcon3} alt="buttonIcon2" className={classes.buttonIcon}/>
                                <Typography className={classes.buttonTitle}>
                                    Learn More
                                </Typography>
                                <Typography className={classes.buttonDescription}>
                                    Have more questions? Visit our Help Center.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={classes.belowWrapper}>
                <div className={classes.container}>
                    <Typography className={classes.homeSubTitle}>
                        Browse Top Freelancers & their Specialties
                    </Typography>

                    <Grid container spacing={4} className={classes.freelancersWrapper}>
                        {topConcierges && (topConcierges.length > 0) && topConcierges.map((topConcierge, index) => {
                            return (
                                <Grid key={index} item xs={3}>
                                    <div className={classes.freelancerDiv}>
                                        {
                                            topConcierge.profileImageUrl ? (
                                                <img src={topConcierge.profileImageUrl} alt="top-freelancer" className={classes.freelancerImg}/>
                                            ) : (
                                                <img src={DefaultAvatar} alt="top-freelancer" className={classes.freelancerImg}/>
                                            )
                                        }
                                        <div className={classes.freelancersTextDiv}>
                                            <Typography className={classes.freelancerName}>
                                                {topConcierge.firstName}
                                            </Typography>
                                            {
                                                topConcierge.bio && topConcierge.bio.length > 0 && (
                                                    <>
                                                        {
                                                            cleanText(topConcierge.bio).length > 25 ? (
                                                                <Typography className={classes.freelancerDescription}>
                                                                    {cleanText(topConcierge.bio).replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('&nbsp;', '').substring(0, 25)}...
                                                                </Typography>
                                                            ) : (
                                                                <Typography className={classes.freelancerDescription}>
                                                                    {cleanText(topConcierge.bio).replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('&nbsp;', '').substring(0, 25)}
                                                                </Typography>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                            <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                                                {
                                                    topConcierge.city && (
                                                        <Typography className={classes.locationInfo}>
                                                            {topConcierge.city},
                                                        </Typography>
                                                    )
                                                }
                                                {
                                                    topConcierge.countryAlpha2Code && (
                                                        <Typography className={classes.locationInfo}>
                                                            {topConcierge.countryAlpha2Code} -
                                                        </Typography>
                                                    )
                                                }
                                                {
                                                    topConcierge.preferredTimezoneTzab && (
                                                        <Typography className={classes.locationInfo}>
                                                            Timezone {topConcierge.preferredTimezoneTzab}
                                                        </Typography>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>                            
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default HomeView;