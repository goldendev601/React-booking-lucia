import React from "react";
import {Dialog} from "@material-ui/core";
import {tabsStyles} from "styles";
import {DialogTitle} from "@core/components";
import Typography from "@material-ui/core/Typography";
import {colors} from "styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {
    closeAllDialogForms,
    dialogFormsStateSelector,
    setCategoryFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {setItineraryFormStep, setItineraryStatusCompletion} from "redux/features/dialogForms/itineraryFormSlice";
import {bookingFormSelector} from "redux/features/dialogForms/bookingFormSlice";
import bookingSelector from "./bookingSelector";
import {setAlertDialogOpen} from "redux/features/dialogForms/alertDialogSlice";

const BookingForm = () => {
    const classes = tabsStyles();

    const dispatch = useDispatch();

    const {category} = useSelector(bookingFormSelector);
    const {bookingFormOpen} = useSelector(dialogFormsStateSelector);

    const handleClose = () => {
        dispatch(setAlertDialogOpen());
        dispatch(closeAllDialogForms());
        dispatch(setItineraryFormStep(1));
        dispatch(setItineraryStatusCompletion(false));
        dispatch(setCategoryFormOpen(false));
    }

    return (
        <Dialog
            aria-labelledby="category-dialog"
            open={bookingFormOpen}
            classes={{paper: classes.categoryPaper}}
            data-aos="fade-down"
        >
            <DialogTitle id="category-dialog" onClose={handleClose}>
                <Typography
                    variant="h3"
                    component={'div'}
                    style={{color: `${colors.black1}`, letterSpacing: '0px', margin: '20px 0 5px 30px'}}
                >
                    Add Itinerary
                </Typography>
                {category && bookingSelector(category)}
            </DialogTitle>
        </Dialog>
    );
}

export default BookingForm;