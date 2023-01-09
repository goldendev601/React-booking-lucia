import React from 'react';
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Lottie from 'react-lottie';

const Final = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: require("./clock.json"),
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const useStyles = makeStyles({
        finalWrapper: {
            width: '100%',
            textAlign: 'center',
            padding: 30,
            height: 520
        },
        titleContainer: {
            marginTop: 30,
            textAlign: 'center',
            width: '100%',
        },
        title: {
            fontFamily: 'MADE Mirage',
            fontSize: 28,
            fontWeight: 'normal',
            color: '#242424',
            marginTop: 15,
            margin: 'auto'
        },
        description: {
            fontFamily: 'Raleway',
            fontSize: 14,
            fontWeight: 'normal',
            color: '#242424'
        },
        descriptionAboveContainer: {
            marginTop: 20
        },
        descriptionBottomContainer: {
            marginTop: 20
        }
    });

    const classes = useStyles();

    return (
        <div className={classes.finalWrapper}>
            <Lottie options={defaultOptions}
                height={150}
                width={150} 
                />
            <div className={classes.titleContainer}>
                <Typography component="h1" className={classes.title}>Your request </Typography>
                <Typography component="h1" className={classes.title}>has been submitted!</Typography>
            </div>
            <div className={classes.descriptionAboveContainer}>
                <Typography component="h8" className={classes.description}>
                    A CoPilot will get in touch with you soon.
                </Typography>
            </div>
            <div className={classes.descriptionBottomContainer}>
                <Typography component="h8" className={classes.description}>
                    Head to the My Requests tab to view all your requests.
                </Typography>
            </div>
        </div>
    )
}

export default Final