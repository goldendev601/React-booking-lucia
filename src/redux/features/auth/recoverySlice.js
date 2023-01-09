import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "api/axios";
import {PASSWORD_RESET, UPDATE_PASSWORD, VALIDATE_RESET_TOKEN} from "api/api";

const initialState = {
    isFetching: false,
    isSuccess: false,
    isError: false,
    status: null,
    errorMessage: null,
    message: null,
    sentResetTokenAgainSuccess: false,
    sentResetTokenAgainError: false,
};

export const passwordReset = createAsyncThunk(
    'auth/passwordReset',
    async (email, thunkAPI) => {
        try {
            return await axios.post(PASSWORD_RESET, email);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const sendResetTokenAgain = createAsyncThunk(
    'auth/sendResetTokenAgain',
    async (data, thunkAPI) => {
        try {
            return await axios.post(PASSWORD_RESET, data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const validateResetToken = createAsyncThunk(
    'auth/validateResetToken',
    async (data, thunkAPI) => {
        try {
            return await axios.post(VALIDATE_RESET_TOKEN, data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async (data, thunkAPI) => {
        try {
            return await axios.post(UPDATE_PASSWORD, data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const recoverySlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.sentResetTokenAgainSuccess = false;
            state.sentResetTokenAgainError = false;
            return state;
        },
    },
    extraReducers: {
        [passwordReset.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [passwordReset.pending]: (state) => {
            state.isFetching = true;
        },
        [passwordReset.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;
        },
        [validateResetToken.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [validateResetToken.pending]: (state) => {
            state.isFetching = true;
        },
        [validateResetToken.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;
        },
        [updatePassword.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [updatePassword.pending]: (state) => {
            state.isFetching = true;
        },
        [updatePassword.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;
        },
        [sendResetTokenAgain.fulfilled]: (state, {payload}) => {
            state.sentResetTokenAgainSuccess = true;
            state.sentResetTokenAgainError = false;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [sendResetTokenAgain.rejected]: (state, {payload}) => {
            state.sentResetTokenAgainSuccess = false;
            state.sentResetTokenAgainError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;
        },
    }
});

export const {clearState} = recoverySlice.actions;

export const recoverySelector = (state) => state.recovery;

export default recoverySlice.reducer;