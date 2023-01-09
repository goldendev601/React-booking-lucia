import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    alertDialogOpen: false,
}

const alertDialogSlice = createSlice({
    name: 'alertDialogs',
    initialState,
    reducers: {
        setAlertDialogOpen(state) {
            state.alertDialogOpen = !state.alertDialogOpen;
        },
    },
});

export const {
    setAlertDialogOpen,
} = alertDialogSlice.actions;

export const alertDialogSelector = (state) => state.alertDialogs;

export default alertDialogSlice.reducer;
