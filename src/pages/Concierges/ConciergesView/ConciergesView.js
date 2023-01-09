import React, { useEffect, useState } from 'react';
import {conciergesPageStyles} from "styles";
import {Grid, Typography} from "@material-ui/core";
import { getProfile, profileSelector } from "redux/features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    setItineraryFormOpen,
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {itinerariesSelector, advisorRequestsGetTopConcierges, advisorRequestsGetRecentRequests} from "redux/features/itineraries/itinerariesSlice";
import HireAdvisor from "../../ItinerariesDashboard/HireAdvisor/HireAdvisor";
import ButtonIcon1  from '../../../assets/home-icon-1.png';
import ConciergeIcon2  from '../../../assets/ConciergeIcon2.png';
import DefaultAvatar  from '../../../assets/null-profile-image.jpg';
import {dateToMyDate, cleanText} from "utils";


const ConciergesView = () => {

    const classes = conciergesPageStyles();

    const dispatch = useDispatch();
    const history = useHistory()

    const {topConcierges, recentRequests} = useSelector(itinerariesSelector);

    const [showHireAdvisor, setShowHireAdvisor] = useState(false);

    useEffect(() => {
        dispatch(getProfile());
        dispatch(advisorRequestsGetTopConcierges(8));
        dispatch(advisorRequestsGetRecentRequests(3))
    }, [dispatch]);

    

    const goToMyRequests = () => {
        history.push('/advisor-requests');
    } 

    const clickHireAdvisor = () => {
        setShowHireAdvisor(true);
    }

    const option = {
        day : 'numeric',
        month : 'short',
        year : 'numeric'
    }

    return (
        <>
            <div className={classes.root}>
                <Typography className={classes.title}>
                    CoPilot
                </Typography>
                <div className={classes.aboveWrapper}>
                    <div className={classes.container}>
                        <Grid container spacing={4} className={classes.buttonWrapper}>
                            <Grid item xs={3}>
                                <div className={classes.buttonDivFirst} onClick={() => clickHireAdvisor()}>
                                    <img src={ButtonIcon1} alt="buttonIcon1" className={classes.buttonIcon}/>
                                    <Typography className={classes.buttonTitle}>
                                        Try a Freelancer
                                    </Typography>
                                    <Typography className={classes.buttonDescription}>
                                        Off-board some of your workload to our trusted CoPilots.
                                    </Typography>
                                </div>                            
                            </Grid>
                            <Grid item xs={9}>
                                {
                                    (recentRequests && (recentRequests.length > 0)) ? (
                                        <div className={classes.recentRequestsWrapper}>
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <Typography className={classes.subTitle}>
                                                    Recent Requests
                                                </Typography>
                                                <Typography className={classes.clickableTitle} onClick={() => goToMyRequests()}>
                                                    View All
                                                </Typography>
                                            </div>
                                            <div className={classes.recentRequestDetailWrapper}>
                                                <div className={classes.recentRequestInfoWrapper}>
                                                    <div style={{display: 'flex'}}>
                                                        <Typography className={classes.requestNumberInfo}>
                                                            REQUEST #{recentRequests[0].id}
                                                        </Typography>
                                                        <Typography className={classes.requestTitleInfo}>
                                                            {recentRequests[0].requestTitle}
                                                        </Typography>
                                                    </div>
                                                    {
                                                        recentRequests[0].notes.length > 50 ? (
                                                            <Typography className={classes.requestNoteInfo}>
                                                                {recentRequests[0].notes.substring(0, 50)}...
                                                            </Typography>
                                                        ) : (
                                                            <Typography className={classes.requestNoteInfo}>
                                                                {recentRequests[0].notes}
                                                            </Typography>
                                                        )
                                                    }
                                                </div>
                                                <Typography className={classes.dateInfo}>
                                                    {dateToMyDate(recentRequests[0].createdAt).toLocaleDateString('en-US', option)}
                                                </Typography>
                                            </div>
                                            {
                                                recentRequests.length > 1 && (
                                                    <div className={classes.recentRequestDetailWrapper}>
                                                        <div className={classes.recentRequestInfoWrapper}>
                                                            <div style={{display: 'flex'}}>
                                                                <Typography className={classes.requestNumberInfo}>
                                                                    REQUEST #{recentRequests[1].id}
                                                                </Typography>
                                                                <Typography className={classes.requestTitleInfo}>
                                                                    {recentRequests[1].requestTitle}
                                                                </Typography>
                                                            </div>
                                                            {
                                                                recentRequests[1].notes.length > 50 ? (
                                                                    <Typography className={classes.requestNoteInfo}>
                                                                        {recentRequests[1].notes.substring(0, 50)}...
                                                                    </Typography>
                                                                ) : (
                                                                    <Typography className={classes.requestNoteInfo}>
                                                                        {recentRequests[1].notes}
                                                                    </Typography>
                                                                )
                                                            }
                                                        </div>
                                                        <Typography className={classes.dateInfo}>
                                                            {dateToMyDate(recentRequests[1].createdAt).toLocaleDateString('en-US', option)}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                            {
                                                recentRequests.length > 2 && (
                                                    <div className={classes.recentRequestDetailWrapperLast}>
                                                        <div className={classes.recentRequestInfoWrapper}>
                                                            <div style={{display: 'flex'}}>
                                                                <Typography className={classes.requestNumberInfo}>
                                                                    REQUEST #{recentRequests[2].id}
                                                                </Typography>
                                                                <Typography className={classes.requestTitleInfo}>
                                                                    {recentRequests[2].requestTitle}
                                                                </Typography>
                                                            </div>
                                                            {
                                                                recentRequests[2].notes.length > 50 ? (
                                                                    <Typography className={classes.requestNoteInfo}>
                                                                        {recentRequests[2].notes.substring(0, 50)}...
                                                                    </Typography>
                                                                ) : (
                                                                    <Typography className={classes.requestNoteInfo}>
                                                                        {recentRequests[2].notes}
                                                                    </Typography>
                                                                )
                                                            }
                                                        </div>
                                                        <Typography className={classes.dateInfo}>
                                                            {dateToMyDate(recentRequests[2].createdAt).toLocaleDateString('en-US', option)}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ) : (
                                        <div className={classes.buttonDivSecond}>
                                            <img src={ConciergeIcon2} alt="ConciergeIcon2" className={classes.buttonIcon2}/>
                                            <div style={{marginLeft: '20px'}}>
                                                <Typography className={classes.buttonTitle2}>
                                                    All of your recent freelance requests will be displayed here. 
                                                </Typography>
                                                <Typography className={classes.buttonDescription2}>
                                                    If you want access to all of your requests, click the "My requests" tab.
                                                </Typography>
                                            </div>
                                        </div>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={classes.belowWrapper}>
                    <div className={classes.container}>
                        <Typography className={classes.subTitle} style={{marginTop: '50px'}}>
                            Browse Top Freelancers & their Specialties
                        </Typography>
                        <Grid container spacing={4} className={classes.freelancersWrapper}>
                            {topConcierges.map((topConcierge, index) => {
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
                                                {/* {
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
                                                } */}
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
            <HireAdvisor
                showHireAdvisor={showHireAdvisor}
                setShowHireAdvisor={setShowHireAdvisor}
            />
        </>
    )
}

export default ConciergesView;