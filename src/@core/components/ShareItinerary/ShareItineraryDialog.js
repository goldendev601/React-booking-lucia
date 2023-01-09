import React from "react";
import {DialogTitle} from "../Dialog";
import Typography from "@material-ui/core/Typography";
import {colors} from "styles/colors";
import {Dialog} from "@material-ui/core";
import {tabsStyles} from "styles";
import ShareItinerary from "./ShareItinerary";

const ShareItineraryDialog = ({shareItineraryOpen, handleShareItinerary}) => {
    const classes = tabsStyles();

    return (
        <Dialog
            aria-labelledby="share-itinerary-dialog"
            open={shareItineraryOpen}
            onClose={handleShareItinerary}
            classes={{paper: classes.shareItineraryPaper}}
            data-aos="fade-down"
        >
            <DialogTitle id="share-itinerary-dialog" onClose={handleShareItinerary}>
                <Typography
                    variant="h3"
                    component={'div'}
                    style={{color: `${colors.black1}`, letterSpacing: '0px', margin: '20px 0 30px 30px'}}
                >
                    Share this itinerary
                </Typography>
                <ShareItinerary onClose={handleShareItinerary}/>
            </DialogTitle>
        </Dialog>
    );
}

export default ShareItineraryDialog;