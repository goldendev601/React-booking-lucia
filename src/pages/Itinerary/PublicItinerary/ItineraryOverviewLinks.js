import React from "react";
import {StyledLink} from "@core/components";
import {makeStyles} from "@material-ui/core/styles";
import {useLocation} from 'react-router-dom'
import moment from "moment";

const useStyles = makeStyles({
    root: {
        maxWidth: '190px',
        '& > *': {
            marginBottom: '10px'
        },
    },
    li: {
        minWidth: '200px',
    }
});

const ItineraryOverviewLinks = ({bookings, showPriceOnShare}) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <ul className={classes.root}>
            <li><StyledLink $fontsize={'20px'} to={`${location.pathname}#overview`}>Overview</StyledLink></li>
            <li><StyledLink $fontsize={'20px'} to={`${location.pathname}#itinerary`}>Itinerary</StyledLink></li>
            <li>
                <ul style={{paddingLeft: '25px'}}>
                    {bookings && Object.keys(bookings).map((date, index) => {
                            if (bookings[date].length !== 0) {
                                return <li className={classes.li} key={index}><StyledLink
                                    to={`${location?.pathname}#booking${date}`}
                                    $fontsize={'14px'}>{moment(date).format("dddd, MMMM D")}</StyledLink></li>
                            } else {
                                return null;
                            }
                        }
                    )}
                </ul>
            </li>
            {showPriceOnShare &&
            <li><StyledLink $fontsize={'20px'} to={`${location.pathname}#price`}>Price</StyledLink></li>}
            <li><StyledLink $fontsize={'20px'} to={`${location.pathname}#abstract`}>Notes</StyledLink></li>
        </ul>
    );
}

export default ItineraryOverviewLinks;
