import React, {useCallback} from "react";
import {Dialog} from "@material-ui/core";
import {tabsStyles} from "styles";
import {DialogTitle} from "@core/components";
import Typography from "@material-ui/core/Typography";
import {colors} from "styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {
    closeAllDialogForms,
    dialogFormsStateSelector,
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import SelectCategory from "./SelectCategory";
import {
    resetItineraryState,
    setItineraryFormStep,
    setItineraryStatusCompletion,
} from "redux/features/dialogForms/itineraryFormSlice";
import {resetBookingState, setBookingFormStep} from "redux/features/dialogForms/bookingFormSlice";
import {clearPicturesState} from "redux/features/pictures/picturesSlice";
import {clearAmenities, clearPassengers, setStartDate} from "redux/features/itineraries/bookings/bookingsSlice";

const CategoryDialog = () => {
    const classes = tabsStyles();

    const dispatch = useDispatch();

    const {categoryFormOpen} = useSelector(dialogFormsStateSelector);

    const handleClickClose = useCallback(() => {
        dispatch(clearPicturesState());
        dispatch(clearPassengers());
        dispatch(clearAmenities());
        dispatch(setStartDate(null));
        dispatch(setItineraryStatusCompletion(false));
        dispatch(closeAllDialogForms());
        dispatch(resetItineraryState());
        dispatch(resetBookingState());
        setTimeout(() => {
            dispatch(setItineraryFormStep(1));
            dispatch(setBookingFormStep(1));
        }, 100);
    }, [dispatch]);

    return (
        <div>
            <Dialog
                aria-labelledby="category-dialog"
                open={categoryFormOpen}
                classes={{paper: classes.categoryPaper}}
                data-aos="fade-down"
                onClose={handleClickClose}
            >
                <DialogTitle id="category-dialog" onClose={handleClickClose}>
                    <Typography
                        variant="h3"
                        component={'div'}
                        style={{color: `${colors.black1}`, letterSpacing: '0px', margin: '20px 0 5px 30px'}}
                    >
                        Select Category
                    </Typography>
                    {categoryFormOpen && <SelectCategory/>}
                </DialogTitle>
            </Dialog>
        </div>
    );
}

export default CategoryDialog;