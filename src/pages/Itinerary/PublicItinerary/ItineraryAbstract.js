import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    abstractRoot: {
        position: 'relative',
        maxWidth: '840px'
    },
    textCenter: {
        textAlign: 'center'
    },
});

const ItineraryAbstract = ({itineraryInfo}) => {
    const classes = useStyles();

    return (
        <div id="#abstract">
            <div className={classes.abstractRoot}>
                <Typography className={classes.textCenter} style={{marginBottom: '50px'}} variant="h4" component="h4">
                    Abstract
                </Typography>
                <Typography className={classes.textCenter} variant="body1" component="p">
                    {itineraryInfo}
                </Typography>
            </div>
        </div>
    );
}

export default ItineraryAbstract;