import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {GLOBAL_SEARCH} from "api/api";
import {camelizeNestedKeys} from "utils";
import axios from "api/axios";

const initialState = {
    searchResponse: null,
    searchQuery: '',
    onlyBookings: true,
    isFetching: false,
    isSuccess: false,
    isError: false,
}

export const globalSearch = createAsyncThunk(
    'globalSearch/globalSearch',
    async (query, thunkAPI) => {
        try {
            return await axios.get(GLOBAL_SEARCH(query));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

const globalSearchSlice = createSlice({
    name: 'globalSearch',
    initialState,
    reducers: {
        setSearchQuery(state, {payload}) {
            state.searchQuery = payload;
        },
        setOnlyBookings(state) {
            state.onlyBookings = !state.onlyBookings;
        },
        clearGlobalSearch: () => initialState
    },
    extraReducers: {
        [globalSearch.fulfilled]: (state, {payload}) => {
            state.searchResponse = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMessage = null;
        },
        [globalSearch.pending]: (state) => {
            state.isFetching = true;
        },
        [globalSearch.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload?.data;
        },
    }
});

export const {
    setSearchQuery,
    setOnlyBookings,
    clearGlobalSearch,
} = globalSearchSlice.actions;

export const globalSearchSelector = (state) => state.globalSearch;

export default globalSearchSlice.reducer;