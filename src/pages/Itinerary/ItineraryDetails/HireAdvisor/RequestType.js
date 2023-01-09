import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import {getAdvisorRequestTypes, constantsSelector} from "redux/features/constants/constantsSlice";
import {setAdvisorRequestType, setConcierge, itinerariesSelector, advisorRequestsGetConcierges} from "redux/features/itineraries/itinerariesSlice";
import { makeStyles } from "@material-ui/core/styles";
import DefaultProfileImage  from '../../../../assets/null-profile-image.jpg';
import {
    Button
} from "@core/components";


const RequestType = ({stepChange, stepIndexChange, formik}) => {
    const dispatch = useDispatch();
    const {concierges} = useSelector(itinerariesSelector);

    useEffect(() => {
        // dispatch(getAdvisorRequestTypes())
        dispatch(advisorRequestsGetConcierges())
    }, [dispatch])

    const useStyles = makeStyles({
        hireAdvisorMainText: {
            fontSize: 12,
            color: '#242424',
            fontFamily: 'Raleway',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            lineHeight: '30px',
            fontWeight: '600',
            paddingBottom:'10px',
        },
        hireAdvisorGrid:{
            width: '100%',
            display: 'flex'
        },
        hireAdvisorImage: {
            width: '120px',
            height: '120px'
        },
        profileImg: {
            width: '120px',
            height: '120px',
            objectFit: 'cover'
        },
        hireAdvisorInfo: {
            padding: 20,
            boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.32)',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            height: '120px',
            '& h4': {
                color: "#BA886E",
                fontFamily: 'Raleway',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '16px',
                textTransform: 'uppercase',
                paddingBottom: '10px'
            },
            '& p1': {
                color: '#828282',
                fontFamily: 'Raleway',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '12px',
                lineHeight:'18px',
                letterSpacing: '0.03em',
                marginTop: 5
            },
            '& p2': {
                color: '#828282',
                fontFamily: 'Raleway',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '12px',
                lineHeight:'18px',
                letterSpacing: '0.03em',
                marginTop: 5
            },
            "&:hover": {
                background: "#BA886E",
                '& h4': {
                    color: '#FFF',
                },
                '& p1': {
                    color: '#FFF',
                },
                '& p2': {
                    color: '#FFF',
                },
                '& p4': {
                    color: '#FFF',
                },
            },
        },
        BgImageMap:{
            position: 'relative',
            '& img':{
                height:'100%',
                width:'100%',
                objectFit: 'contain',
            }
        },
        AirplaneImgTop:{
            position: 'absolute',
            top: '42px',
            left: '0',
            right: '0',
            margin: '0 auto',
        },
        AirplaneImgbottom:{
            position: 'absolute',
            top: '120px',
        },
        nextBtn: {
            fontSize: 16
        },
        skipBtnDescription: {
            color: '#242424',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '12px',
            lineHeight:'18px',
            letterSpacing: '0.03em',
            marginTop: 10
        },
        locationInfo: {
            fontFamily: 'Raleway',
            color: '#828282',
            fontWeight: '500',
            fontSize: '10px',
            lineHeight: '12px',
            marginTop: '8px',
            textAlign: 'center'
        },
    });

    const classes = useStyles();

    const handleAdvisorType = (advisorRequestType) => {
        formik.setFieldValue('advisorRequestTypeId', advisorRequestType.id);
        dispatch(setAdvisorRequestType(advisorRequestType));
        stepChange('requestContent');
        stepIndexChange(1);
    }

    const handleConcierge = (concierge) => {
        formik.setFieldValue('copilotId', concierge.id);
        dispatch(setConcierge(concierge));
        stepChange('requestContent');
        stepIndexChange(1);
    }

    const handleClick = () => {
        stepChange('requestContent');
        stepIndexChange(1);
    }

    return (
        <>
            <Grid item md={12} style={{marginBottom: '30px', width: '100%'}}>
                <Button
                    $primary
                    className={classes.nextBtn}
                    $width='100%'
                    onClick={() => {
                        handleClick()
                    }}
                >
                    Skip Selection
                </Button>
                <Typography className={classes.skipBtnDescription}>By skipping this step any available CoPilot can accept your request, resulting in a quicker response time.</Typography>
            </Grid>
            <Typography component="h6" className={classes.hireAdvisorMainText}>SELECT A COPILOT</Typography>
            <Grid container spacing={2} className={classes.hireAdvisorContentDiv}>
                {
                    concierges && ( 
                        concierges.map((concierge, index) => {
                            return (
                                <Grid item md={12} className={classes.hireAdvisorGrid} key={index}>
                                    <Grid container className={classes.hireAdvisorImage} onClick={() => handleConcierge(concierge)}>
                                        {
                                            concierge.profileImageUrl ? (
                                                <img src={concierge.profileImageUrl} alt="profileImg" className={classes.profileImg}/>
                                            ) : (
                                                <img src={DefaultProfileImage} alt="profileImg" className={classes.profileImg}/>
                                            )
                                        }
                                    </Grid>
                                    <Grid container className={classes.hireAdvisorInfo} onClick={() => handleConcierge(concierge)}>
                                        <Typography component="h4" className={classes.hireAdvisorName}>{concierge.firstName}</Typography>
                                        <div style={{display: 'flex', width: '100%', justifyContent: 'flex-start'}}>
                                            {
                                                concierge.city && (
                                                    <Typography component="p4" className={classes.locationInfo}>
                                                        {concierge.city},
                                                    </Typography>
                                                )
                                            }
                                            {
                                                concierge.countryAlpha2Code && (
                                                    <Typography component="p4" className={classes.locationInfo}>
                                                        {concierge.countryAlpha2Code} -
                                                    </Typography>
                                                )
                                            }
                                            {
                                                concierge.preferredTimezoneTzab && (
                                                    <Typography component="p4" className={classes.locationInfo}>
                                                        Timezone {concierge.preferredTimezoneTzab}
                                                    </Typography>
                                                )
                                            }
                                        </div>
                                        {/* {
                                           concierge.coPilotDuties && concierge.coPilotDuties.length > 0 && (
                                                <Typography component="p1">{concierge.coPilotDuties[0].advisorRequestType}</Typography>
                                            )
                                        } */}
                                        
                                        <Typography component="p2">Select</Typography>
                                    </Grid>
                                </Grid>
                            )
                        })
                    )
                }
            </Grid>
        </>
    )
}

export default RequestType