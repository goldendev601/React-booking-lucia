import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "api/axios";
import {GET_EVENTS} from "api/api";
import {camelizeNestedKeys} from "utils";

const initialState = {
    events: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
}

export const getEvents = createAsyncThunk(
    'calendar/getEvents',
    async (page, thunkAPI) => {
        try {
            return await axios.get(GET_EVENTS());
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


export const calendarSlice = createSlice({
    name: 'calendar',
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
        [getEvents.fulfilled]: (state, {payload}) => {
            state.events = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMessage = null;
        },
        [getEvents.pending]: (state) => {
            state.isFetching = true;
        },
        [getEvents.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload?.data
        },
    }
});

export const {clearState} = calendarSlice.actions;

export const calendarSelector = (state) => state.calendar;

export default calendarSlice.reducer;