import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "api/axios";
import {
    GET_AIRLINES,
    GET_AIRPORTS,
    GET_BEDDING_TYPES, 
    GET_BOOKING_CATEGORIES,
    GET_CURRENCY_TYPES,
    GET_AMENITIES,
    GET_ADVISOR_REQUEST_TYPES,
    GET_AGENCY_USAGE_MODE,
    GET_AVATARS
} from "api/api";
import {camelizeNestedKeys} from "utils";

const initialState = {
    currencyTypes: null,
    airports: null,
    avatars: null,
    beddingTypes: null,
    bookingCategories: null,
    airlines: null,
    filters: ['Upcoming', 'Active'],
    errorMessage: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
}

export const getCurrencyTypes = createAsyncThunk(
    'constants/getCurrencyTypes',
    async (_, thunkAPI) => {
        try {
            return await axios.get(GET_CURRENCY_TYPES);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getAirports = createAsyncThunk(
    'constants/getAirports',
    async (_, thunkAPI) => {
        try {
            return await axios.get(GET_AIRPORTS);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


export const getAvatars = createAsyncThunk(
    'constants/getAvatars',
    async (_, thunkAPI) => {
        try {
            return await axios.get(GET_AVATARS);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getAirlines = createAsyncThunk(
    'constants/getAirlines',
    async (_, thunkAPI) => {
        try {
            return await axios.get(GET_AIRLINES);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getAmenities = createAsyncThunk(
    'constants/getAmenities',
    async (_, thunkAPI) => {
        try {
            return await axios.get(GET_AMENITIES);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getAdvisorRequestTypes = createAsyncThunk(
    'constants/getAdvisorRequestTypes',
    async (_, thunkAPI) => {
        try {
            return await axios.get(GET_ADVISOR_REQUEST_TYPES);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getAgencyUsageMode = createAsyncThunk(
    'constants/getAgencyUsageMode',
    async (_, thunkAPI) => {
        try {
            return await axios.get(GET_AGENCY_USAGE_MODE);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getBeddingTypes = createAsyncThunk(
    'constants/getBeddingTypes',
    async (_, thunkAPI) => {
        try {
            return await axios.get(GET_BEDDING_TYPES);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getBookingCategories = createAsyncThunk(
    'constants/getBookingCategories',
    async (_, thunkAPI) => {
        try {
            return await axios.get(GET_BOOKING_CATEGORIES);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

const constantsSlice = createSlice({
    name: 'constants',
    initialState,
    reducers: {
        setFilterValue:(state, {payload}) => {
            state.filters = payload;
        },
    },
    extraReducers: {
        //Currency types
        [getCurrencyTypes.fulfilled]: (state, {payload}) => {
            state.currencyTypes = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getCurrencyTypes.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
         //Airports
         [getAirports.fulfilled]: (state, {payload}) => {
            state.airports = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getAirports.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
        //Avatars
        [getAvatars.fulfilled]: (state, {payload}) => {
            state.avatars = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getAvatars.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
        //Bedding types
        [getBeddingTypes.fulfilled]: (state, {payload}) => {
            state.beddingTypes = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getBeddingTypes.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
        //Booking categories
        [getBookingCategories.fulfilled]: (state, {payload}) => {
            state.bookingCategories = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getBookingCategories.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
        //Airlines
        [getAirlines.fulfilled]: (state, {payload}) => {
            state.airlines = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getAirlines.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
        //Amenities
        [getAmenities.fulfilled]: (state, {payload}) => {
            state.amenities = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getAmenities.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
        //Advisor Request Types
        [getAdvisorRequestTypes.fulfilled]: (state, {payload}) => {
            state.advisorRequestTypes = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getAdvisorRequestTypes.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
        //Agency Usage Mode
        [getAgencyUsageMode.fulfilled]: (state, {payload}) => {
            state.agencyUsageModes = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getAgencyUsageMode.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
    }
});

export const {setFilterValue} = constantsSlice.actions;
export const constantsSelector = (state) => state.constants;

export default constantsSlice.reducer;
