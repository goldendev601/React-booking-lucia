import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "api/axios";
import {
    GET_SHARE_CODE, 
    SEND_INVITATION, 
    SEND_INVITATION_TO_CLIENT    
} from "api/api";
import {camelizeNestedKeys} from "utils";

const initialState = {
    shareCode: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
}

export const sendInvite = createAsyncThunk(
    'shareCode/sendInvitation',
    async (formData, thunkAPI) => {
        const {id, data} = formData;
        try {
            return await axios.post(SEND_INVITATION(id), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const sendInviteSMS = createAsyncThunk(
    'shareCode/sendInvitationSMS',
    async (formData, thunkAPI) => {
        const {id, data} = formData;
        try {
            return await axios.post(SEND_INVITATION_TO_CLIENT(id), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getShareCode = createAsyncThunk(
    'shareCode/getShareCode',
    async (id, thunkAPI) => {
        try {
            return await axios.get(GET_SHARE_CODE(id));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const shareCodeSlice = createSlice({
    name: 'shareCode',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        },
        clearShareCode: (state) => {
            state.shareCode = null;
        }
    },
    extraReducers: {
        [sendInvite.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMessage = null;
        },
        [sendInvite.pending]: (state) => {
            state.isFetching = true;
        },
        [sendInvite.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload?.data
        },
        [getShareCode.fulfilled]: (state, {payload}) => {
            state.shareCode = camelizeNestedKeys(payload.data.key);
        },
        [sendInviteSMS.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMessage = null;
        },
        [sendInviteSMS.pending]: (state) => {
            state.isFetching = true;
        },
        [sendInviteSMS.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload?.data
        },       
    }
});

export const {clearState, clearShareCode} = shareCodeSlice.actions;

export const shareCodeSelector = (state) => state.shareCode;

export default shareCodeSlice.reducer;