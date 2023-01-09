import React from "react";
import {Button} from "@core/components";
import {addItineraryStyles} from "styles/muiStyles";
import {useDispatch, useSelector} from "react-redux";
import {itineraryMultiFormSelector, setItineraryStatusCompletion} from "redux/features/dialogForms/itineraryFormSlice";
// import {setAlertDialogOpen} from "redux/features/dialogForms/alertDialogSlice";
import {dialogFormsStateSelector} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {bookingFormSelector} from "redux/features/dialogForms/bookingFormSlice";
import { travelersSelector } from "redux/features/travelers/travelersSlice";

const DialogActions = ({closePictureUpload, uploadPictures, cancelPictureUpload, formik, closeAction}) => {
    const classes = addItineraryStyles();
    const {edit} = useSelector(dialogFormsStateSelector);
    const {isEdit} = useSelector(travelersSelector);
    const {category} = useSelector(bookingFormSelector);
    const {editItineraryTab} = useSelector(itineraryMultiFormSelector);

    const dispatch = useDispatch();

    const handleCloseAllDialogForms = () => {
        dispatch(setItineraryStatusCompletion(false));
        // dispatch(setAlertDialogOpen());
        closeAction()
    }

    const handleClick = () => {
        formik.submitForm();
        // closeAction();
    }

    return (
        <div className={classes.formActions}>
            <Button
                $outlined
                $width={'50%'}
                onClick={() => cancelPictureUpload ? cancelPictureUpload() : handleCloseAllDialogForms()}
            >
                Cancel
            </Button>
            <Button
                $primary
                $width={'50%'}
                type={closePictureUpload ? 'button' : "submit"}
                form={ 'addTraveler' || category || editItineraryTab || 'addItinerary' }
                onClick={() => uploadPictures ? uploadPictures() : handleClick()}
            >
                {edit || isEdit ? 'Save' : 'Add'}
            </Button>
        </div>
    );
}

export default DialogActions;
