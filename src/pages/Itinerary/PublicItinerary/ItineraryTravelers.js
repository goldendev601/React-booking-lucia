import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../../styles/colors";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width:1150px)': {
            textAlign: 'center'
        },
        maxWidth: '190px',
    },
    travelers: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: '10px'
        },
    },
    span: {
        fontSize: '18px',
        fontWeight: '600',
        color: colors.brand,
        marginBottom: '20px'
    }
});

const ItineraryTravelers = ({travelers, clientName}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className={classes.span}>Travelers</span>
            <div className={classes.travelers}>
                <span>{clientName}</span>
            </div>
            <div className={classes.travelers}>
                {travelers?.map((traveler, index) => <span key={index}>{traveler.name}</span>)}
            </div>
        </div>
    );
}

export default ItineraryTravelers;