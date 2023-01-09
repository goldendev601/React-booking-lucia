import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {camelizeNestedKeys} from "utils";
import axios from "api/axios";

const initialState = {
    other: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    status: null,
    errorMessage: null,
}

export const addItineraryOther = createAsyncThunk(
    'other/addItineraryBooking',
    async (arg, thunkAPI) => {
        const {api, itineraryId, bookingCategory, data} = arg;
        try {
            return await axios.post(api(itineraryId, bookingCategory), data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        },
    },
    extraReducers: {
        [addItineraryOther.fulfilled]: (state, {payload}) => {
            state.other = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [addItineraryOther.pending]: (state) => {
            state.isFetching = true;
        },
        [addItineraryOther.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.data;
        },
    }
});

export const {clearState} = otherSlice.actions;

export const otherSelector = (state) => state.other;

export default otherSlice.reducer;