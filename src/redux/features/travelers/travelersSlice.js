import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "api/axios";
import {
    ADD_TRAVELER, 
    UPDATE_TRAVELER,
    DELETE_TRAVELER,
    FETCH_TRAVELERS,
    FETCH_TRAVELER, 
    Add_TRAVELER_DOCUMENT
} from "api/api";
import {camelizeNestedKeys} from "utils";

const initialState = {
    traveler: null,
    page: 1,
    start: 0,
    travelerId: null,
    pictures: null,
    passengers: null,
    travelers: null,
    isEdit: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    picturesErrorMessage: null,
    addedSuccess: false,
    addedError: false,
    isDeletedSuccess: false,
    isDeletedError: false,
    isTravelerUpdated: false,
    isTravelerUpdatedError: false,
    isPassengerDeletedSuccess: false,
    isPassengerDeletedError: false,
    travelerPassengersIsFetching: false,
    travelerPassengersIsSuccess: false,
    isTravelerBookingPositionError: false,
    isTravelerBookingPositionSuccess: false,
    travelerDocumentUrls: [],
    travelerDocuments: [],
    isUploadingDocument: false,
    isTravelerDocumentAdded: false,
    isTravelerDocumentAddedError: false
}

export const fetchTravelers = createAsyncThunk(
    'travelers/fetchTravelers',
    async (arg, thunkAPI) => {
        try {
            return await axios.get(FETCH_TRAVELERS(arg));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const fetchTraveler = createAsyncThunk(
    'travelers/fetchTraveler',
    async (id, thunkAPI) => {
        try {
            return await axios.get(FETCH_TRAVELER(id));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


export const addTraveler = createAsyncThunk(
    'travelers/addTraveler',
    async (formData, thunkAPI) => {
        try {
            return await axios.post(ADD_TRAVELER, formData);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateTravelerInformation = createAsyncThunk(
    'travelers/updateTravelerInformation',
    async (arg, thunkAPI) => {
        const {travelerId, data} = arg;
        try {
            return await axios.post(UPDATE_TRAVELER(travelerId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addTravelerDocument = createAsyncThunk(
    'travelers/addTravelerDocument',
    async (arg, thunkAPI) => {
        const {travelerId, data} = arg;
        try {
            return await axios.post(Add_TRAVELER_DOCUMENT(travelerId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteTraveler = createAsyncThunk(
    'travelers/deleteTraveler',
    async (id, thunkAPI) => {
        try {
            return await axios.delete(DELETE_TRAVELER(id));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const travelersSlice = createSlice({
    name: 'traveler',
    initialState,
    reducers: {
        setTravelerId: (state, {payload}) => {
            state.travelerId = payload;
        },
        setPage: (state, {payload}) => {
            state.page = payload;
        },
        setStart: (state, {payload}) => {
            if (!payload) {
                if (state.page === 1) {
                    state.start = 0
                } else {
                    state.start = (state.page - 1) * 10 + 1;
                }
            } else {
                state.start = Math.ceil(payload - 1) + 1;
            }
        },
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isEdit = false;
            state.isFetching = false;
            state.addedError = false;
            state.addedSuccess = false;
            state.isDeletedSuccess = false;
            state.isDeletedError = false;
            state.isTravelerUpdated = false;
            state.isTravelerUpdatedError = false;
            state.traveler = null;
            state.travelerDocumentUrls = [];
            state.travelerDocuments = [];
            state.isUploadingDocument = false;
            state.isTravelerDocumentAdded = false;
            state.isTravelerDocumentAddedError = false;
            return state;
        },
        setEdit: (state, {payload}) => {
            state.isEdit = payload;
            return state;
        },
        clearDelete: (state) => {
            state.isDeleted = false;
            state.isError = false;
            return state;
        },
        clearAdded: (state) => {
            state.addedSuccess = false;
            state.addedError = false;
        },
        clearTravelerUpdated: (state) => {
            state.isTravelerUpdated = false;
            state.isTravelerUpdatedError = false;
        }
    },
    extraReducers: {

        // Fetch traveler
        [fetchTravelers.fulfilled]: (state, {payload}) => {
            state.travelers = camelizeNestedKeys(payload.data);
            state.isFetching = false;
        },
        [fetchTravelers.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchTravelers.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        [addTraveler.fulfilled]: (state, {payload}) => {
            state.traveler = camelizeNestedKeys(payload.data);
            state.travelerId = payload.data.id;
            state.isFetching = false;
            state.addedSuccess = true;
            state.errorMessage = null;
        },
        [addTraveler.pending]: (state) => {
            state.isFetching = true;
        },
        [addTraveler.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.addedError = true;
            state.errorMessage = payload?.data;
        },
        [deleteTraveler.fulfilled]: (state) => {
            state.isDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteTraveler.rejected]: (state, {payload}) => {
            state.isDeletedError = false
            state.errorMessage = payload?.data;
        },
        [fetchTraveler.fulfilled]: (state, {payload}) => {
            state.traveler = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
        },
        [fetchTraveler.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchTraveler.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        [updateTravelerInformation.fulfilled]: (state) => {
            state.isTravelerUpdated = true;
            state.isTravelerUpdatedError = false;
        },
        [updateTravelerInformation.rejected]: (state, {payload}) => {
            state.isTravelerUpdated = false;
            state.errorMessage = payload?.data;
            state.isTravelerUpdatedError = true;
        },
        [addTravelerDocument.fulfilled]: (state, {payload}) => {
            state.travelerDocumentUrls = payload.data.map(document => document.document_url);
            state.travelerDocuments = payload.data;
            state.isUploadingDocument = false;
            state.isTravelerDocumentAdded = true;
            state.isTravelerDocumentAddedError = false;
        },
        [addTravelerDocument.rejected]: (state, {payload}) => {
            state.isTravelerDocumentAdded = false;
            state.isUploadingDocument = false;
            state.errorMessage = payload?.data;
            state.isTravelerDocumentAddedError = true;
        },
        [addTravelerDocument.pending]: (state) => {
            state.isUploadingDocument = true;
        },
    }
});

export const {
    clearState,
    setPage,
    setStart,
    setEdit,
    clearDelete,
    setTravelerId,
    clearAdded,
    clearTravelerUpdated,
} = travelersSlice.actions;

export const travelersSelector = (state) => state.traveler;

export default travelersSlice.reducer;
