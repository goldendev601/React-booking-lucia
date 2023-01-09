import React, {useEffect} from "react";
import {createErrorMessage} from "utils";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import {useDispatch} from "react-redux";
import {closeAllDialogForms} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {resetBookingState} from "redux/features/dialogForms/bookingFormSlice";

const NotificationHandler = ({children, isError, isSuccess, errorMessage, clearState, successMessage, closeDialogs, ...props}) => {
    const dispatch = useDispatch();
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const close = (closeDialogs) => {
        if (closeDialogs) {
            dispatch(closeAllDialogForms())
            dispatch(resetBookingState());
        }
    }

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            close(closeDialogs);
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess(successMessage);
            dispatch(clearState());
            setTimeout(() => {
                close(closeDialogs);
            }, 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);

    return (
        <div {...props}>
            {children}
        </div>
    );
}

export default NotificationHandler;