import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "../../../PublicItinerary/Cards/CardComponents/CardContent";
import ViewMoreButton from "./ViewMoreButton";
import ViewLessButton from "./ViewLessButton";
import CardPictures from "../../../PublicItinerary/Cards/CardComponents/CardPictures";

const useStyles = makeStyles({
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
});

const BookingCardPicturesDropdown = ({handleExpandClick, expanded, pictures}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            {pictures.length >= 1 &&
            <React.Fragment>
                <CardActions disableSpacing>
                    <ViewMoreButton handleExpandClick={handleExpandClick} expanded={expanded}/>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <div className={classes.imageWrapper}>
                            <CardPictures pictures={pictures}/>
                            <ViewLessButton expanded={expanded} handleExpandClick={handleExpandClick}/>
                        </div>
                    </CardContent>
                </Collapse>
            </React.Fragment>
            }
        </React.Fragment>
    );
}

export default BookingCardPicturesDropdown;