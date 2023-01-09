import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "api/axios";
import {
    SEARCH_FLIGHT_NUMBER,
    // DELETE_FLIGHT_SEGMENT,
    GET_FLIGHT_SEGMENT_DETAIL
} from "api/api";
import {camelizeNestedKeys} from "utils";

const initialState = {
    flights: null,
    segment: null,
    segmentDetail: null,
    segments: null,
    flightNumber: '',
    departureDay: '',
    editSegment: -1,
    errorMessage: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
}

export const searchFlights = createAsyncThunk(
    'flights/searchFlights',
    async (arg, thunkAPI) => {
        const {itineraryId, flightNumber, departureDate} = arg || {};
        try {
            return await axios.get(SEARCH_FLIGHT_NUMBER(itineraryId, flightNumber, departureDate));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

// export const deleteFlightSegment = createAsyncThunk(
//     'flights/deleteFlightSegment',
//     async (arg, thunkAPI) => {
//         const {itineraryId, flightId, flightSegmentId} = arg;
//         try {
//             return await axios.delete(DELETE_FLIGHT_SEGMENT(itineraryId, flightId, flightSegmentId));
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e.response);
//         }
//     }
// );

export const getFlightSegmentDetail = createAsyncThunk(
    'flights/getFlightSegmentDetail',
    async (arg, thunkAPI) => {
        const {itineraryId, flightId, flightSegmentId} = arg;
        try {
            return await axios.get(GET_FLIGHT_SEGMENT_DETAIL(itineraryId, flightId, flightSegmentId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

const flightsSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {
        removeFlights(state) {
            state.flights = null;
        },
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = null;
            return state;
        },
        clearSegments:(state) => {
            state.segments = null;
        },
        clearSegment:(state) => {
            state.segment = null;
        },
        clearSegmentDetail:(state) => {
            state.segmentDetail = null;
        },
        setEditSegment:(state, {payload}) => {
            state.editSegment = payload
        }
    },
    extraReducers: {
        [searchFlights.fulfilled]: (state, {payload}) => {
            state.flights = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
        },
        [searchFlights.pending]: (state) => {
            state.isFetching = true;
        },
        [searchFlights.rejected]: (state, {payload}) => {
            state.flights = null;
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
        // [deleteFlightSegment.fulfilled]: (state) => {
        //     state.isSuccess = true;
        //     state.isFetching = false;
        // },
        // [deleteFlightSegment.pending]: (state) => {
        //     state.isFetching = true;
        // },
        // [deleteFlightSegment.rejected]: (state, {payload}) => {
        //     state.isError = true;
        //     state.errorMessage = payload?.data;
        // },
        [getFlightSegmentDetail.fulfilled]: (state, {payload}) => {
            state.segmentDetail = camelizeNestedKeys(payload.data);
        },
    }
});

export const {removeFlights, clearState, clearSegments, clearSegment, clearSegmentDetail, setEditSegment} = flightsSlice.actions;

export const flightsSelector = (state) => state.flights;

export default flightsSlice.reducer;
