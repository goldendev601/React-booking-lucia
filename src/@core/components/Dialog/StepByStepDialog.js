import React, {useCallback} from "react";
import {Dialog} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {tabsStyles} from "styles";
import {colors} from "styles/colors";
import {TabsDock, DialogTitle, DialogActions} from "@core/components";
import {useDispatch, useSelector} from "react-redux";
import {resetBookingState, setBookingFormStep} from "redux/features/dialogForms/bookingFormSlice";
import {
    closeAllDialogForms,
    dialogFormsStateSelector, setEdit,
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {
    resetItineraryState, setEditTab,
    setItineraryFormStep,
    setItineraryStatusCompletion,
} from "redux/features/dialogForms/itineraryFormSlice";
import {AlertDialog} from "../AlertDialog";
import {alertDialogSelector, setAlertDialogOpen} from "redux/features/dialogForms/alertDialogSlice";
import {clearPicturesState} from "redux/features/pictures/picturesSlice";
import {removeFlights} from "redux/features/flights/flightsSlice";
import {clearAmenities, clearPassengers, setStartDate} from "redux/features/itineraries/bookings/bookingsSlice";
import {setPreviousProviderName, setSupplier, clearSupplier} from "../../../redux/features/suppliers/suppliersSlice";

const StepByStepDialog = ({
                              formik,
                              formId,
                              open,
                              alertType,
                              setCompleteStatus,
                              nextStep,
                              step,
                              handleStateChange,
                              setImages,
                              createTabsDock,
                              id,
                              description,
                              unlockTabs,
                              closePictureUpload,
                              uploadPictures,
                              cancelPictureUpload
                          }) => {
    const classes = tabsStyles();
    const dispatch = useDispatch();

    const {alertDialogOpen} = useSelector(alertDialogSelector);
    const {edit} = useSelector(dialogFormsStateSelector);

    const handleClickClose = useCallback(() => {
        dispatch(clearPicturesState());
        dispatch(setSupplier([]));
        dispatch(setPreviousProviderName(''));
        dispatch(clearPassengers());
        dispatch(clearAmenities());
        dispatch(clearSupplier())
        dispatch(setStartDate(null));
        dispatch(setEdit(false));
        dispatch(setEditTab(null));
        dispatch(removeFlights());
        // dispatch(setAlertDialogOpen());
        dispatch(setItineraryStatusCompletion(false));
        dispatch(resetItineraryState());
        dispatch(resetBookingState());
        dispatch(closeAllDialogForms());
        setTimeout(() => {
            dispatch(setItineraryFormStep(1));
            dispatch(setBookingFormStep(1));
        }, 100);
    }, [dispatch]);

    const handleClickOpenAlert = () => {
        dispatch(setAlertDialogOpen());
    };

    const tabsDock = createTabsDock(handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik);

    return (
        <div>
            <AlertDialog
                open={alertDialogOpen}
                handleClose={handleClickOpenAlert}
                handleClick={handleClickClose}
                type={alertType}
            />
            <Dialog
                aria-labelledby={id}
                open={open}
                classes={{paper: classes.paper}}
                onClose={handleClickClose}
                data-aos="fade-down"
            >
                <DialogTitle id={id} onClose={formik.handleSubmit}>
                    <Typography
                        variant="h3"
                        component={'div'}
                        style={{color: `${colors.black1}`, letterSpacing: '0px', margin: '20px 0 5px 30px'}}
                    >
                        {description}
                    </Typography>
                    <TabsDock unlockTabs={unlockTabs} step={step} tabsDock={tabsDock}/>
                </DialogTitle>
                <DialogActions cancelPictureUpload={cancelPictureUpload} uploadPictures={uploadPictures} closePictureUpload={closePictureUpload} formId={formId} formik={formik} closeAction={handleClickClose}/>
            </Dialog>
        </div>
    );
}

export default StepByStepDialog;
