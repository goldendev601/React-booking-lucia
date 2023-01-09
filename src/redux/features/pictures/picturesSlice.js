import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "api/axios";
import {
    ADD_ITINERARY_BOOKING_PICTURES,
    ADD_ITINERARY_PICTURES, 
    DELETE_ITINERARY_BOOKING_PICTURE, 
    DELETE_ITINERARY_PICTURE,
    GET_ITINERARY_BOOKING_PICTURES,
    GET_ITINERARY_PICTURES, 
    UPDATE_ITINERARY_LOGO,
    ADD_SUPPLIER_PICTURES,
    GET_SUPPLIER_PICTURES,
    DELETE_SUPPLIER_PICTURE
} from "api/api";
import {camelizeNestedKeys} from "utils";

const picturesFlags = {
    isItineraryPictureDeletedSuccess: false,
    isItineraryPictureDeletedError: false,
    isItineraryPictureAddedSuccess: false,
    isItineraryPictureAddedError: false,

    isBookingPictureDeletedSuccess: false,
    isBookingPictureDeletedError: false,
    isBookingPictureAddedSuccess: false,
    isBookingPictureAddedError: false,

    isItineraryLogoPictureUpdatedSuccess: false,
    isItineraryLogoPictureUpdatedError: false,

    isSupplierPictureDeletedSuccess: false,
    isSupplierPictureDeletedError: false,
    isSupplierPictureAddedSuccess: false,
    isSupplierPictureAddedError: false,
}

const initialState = {
    pictures: [],
    itineraryLogoPicture: [],
    errorMessage: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    maxPictures: 1,
    flags: {
        ...picturesFlags
    }
}

export const getItineraryPictures = createAsyncThunk(
    'pictures/getItineraryPictures',
    async (itineraryId, thunkAPI) => {
        try {
            return await axios.get(GET_ITINERARY_PICTURES(itineraryId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItineraryPicture = createAsyncThunk(
    'pictures/addItineraryPicture',
    async (arg, thunkAPI) => {
        const {itineraryId, images} = arg;
        try {
            return await axios.post(ADD_ITINERARY_PICTURES(itineraryId), images, {headers: {"Content-Type": "multipart/form-data"}});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addSupplierPicture = createAsyncThunk(
    'pictures/addSupplierPicture',
    async (arg, thunkAPI) => {
        const {supplierId, images} = arg;
        try {
            return await axios.post(ADD_SUPPLIER_PICTURES(supplierId), images, {headers: {"Content-Type": "multipart/form-data"}});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getItineraryLogoPicture = createAsyncThunk(
    'pictures/getItineraryLogoPicture',
    async (itineraryId, thunkAPI) => {
        try {
            return await axios.post(UPDATE_ITINERARY_LOGO(itineraryId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryLogoPicture = createAsyncThunk(
    'pictures/updateItineraryLogoPicture',
    async (arg, thunkAPI) => {
        const {itineraryId, logo} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY_LOGO(itineraryId), logo, {headers: {"Content-Type": "multipart/form-data"}});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteItineraryPicture = createAsyncThunk(
    'pictures/deleteItineraryPicture',
    async (arg, thunkAPI) => {
        const {itineraryId, pictureId} = arg;
        try {
            return await axios.delete(DELETE_ITINERARY_PICTURE(itineraryId, pictureId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getItineraryBookingPictures = createAsyncThunk(
    'pictures/getItineraryBookingPictures',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, bookingCategory} = arg;
        try {
            return await axios.get(GET_ITINERARY_BOOKING_PICTURES(itineraryId, bookingId, bookingCategory));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getSupplierPictures = createAsyncThunk(
    'pictures/getSupplierPictures',
    async (arg, thunkAPI) => {
        const {supplierId} = arg;
        try {
            return await axios.get(GET_SUPPLIER_PICTURES(supplierId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItineraryBookingPicture = createAsyncThunk(
    'pictures/addItineraryBookingPicture',
    async (arg, thunkAPI) => {
        const {bookingId, itineraryId, bookingCategory, images} = arg;
        try {
            return await axios.post(ADD_ITINERARY_BOOKING_PICTURES(itineraryId, bookingId, bookingCategory), images, {headers: {"Content-Type": "multipart/form-data"}});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteItineraryBookingPicture = createAsyncThunk(
    'pictures/deleteItineraryBookingPicture',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, pictureId, bookingCategory} = arg;
        try {
            return await axios.delete(DELETE_ITINERARY_BOOKING_PICTURE(itineraryId, bookingId, pictureId, bookingCategory));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteSupplierPicture = createAsyncThunk(
    'pictures/deleteSupplierPicture',
    async (arg, thunkAPI) => {
        const {supplierId, supplierPictureId} = arg;
        try {
            return await axios.delete(DELETE_SUPPLIER_PICTURE(supplierId, supplierPictureId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

const picturesSlice = createSlice({
    name: 'pictures',
    initialState,
    reducers: {
        clearPicturesState: () => initialState,
        clearPicturesFlags(state) {
            state.flags = picturesFlags;
        },
        setItineraryLogo(state, {payload}) {
            state.itineraryLogoPicture = payload;
        },
        removeItineraryLogoPicture(state, {payload}) {
            state.itineraryLogoPicture = payload;
        },
        removeLastPicture(state) {
            const index = state.pictures.findIndex(picture => picture?.imageName);
            if (index !== -1) {
                state.pictures.pop();
            }
        },
        setPicture(state, {payload}) {
            if (state.pictures.length === 0) {
                state.pictures = [payload]
            } else {
                const existingPictures = JSON.parse(JSON.stringify(state.pictures));
                const index = existingPictures.findIndex(picture => {
                    return picture.imageName === payload.imageName
                });
                if (index === -1) {
                    if (state.pictures.length < state.maxPictures) {
                        state.pictures = [...state.pictures, payload]
                    } else {
                        let pictures = [...state.pictures]
                        pictures.splice(-1, 1, payload)
                        state.pictures = pictures
                    }
                } else {
                    state.pictures[index] = payload;
                }
            }
        },
        setMaxPictures(state, {payload}) {
            state.maxPictures = payload 
        },
        removePicture(state, {payload}) {
            state.pictures = payload;
        },
        clearPictures(state) {
            state.pictures = [];
        },
    },
    extraReducers: {
        //Itinerary pictures
        [getItineraryPictures.fulfilled]: (state, {payload}) => {
            state.pictures = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
        },
        [getItineraryPictures.pending]: (state) => {
            state.isFetching = true;
        },
        [getItineraryPictures.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
        [addItineraryPicture.fulfilled]: (state) => {
            state.flags.isItineraryPictureAddedSuccess = true;
            state.errorMessage = null;
            state.isFetching = false;
        },
        [addItineraryPicture.pending]: (state) => {
            state.isFetching = true;
        },
        [addItineraryPicture.rejected]: (state, {payload}) => {
            state.flags.isItineraryPictureAddedError = true
            state.errorMessage = payload?.data;
            state.isFetching = false;
        },
        [deleteItineraryPicture.fulfilled]: (state) => {
            state.flags.isItineraryPictureDeletedSuccess = true;
            state.errorMessage = null;
            state.isFetching = false;
        },
        [deleteItineraryPicture.pending]: (state) => {
            state.isFetching = false;
        },
        [deleteItineraryPicture.rejected]: (state, {payload}) => {
            state.flags.isItineraryPictureDeletedError = true;
            state.errorMessage = payload?.data;
            state.isFetching = false;
        },
        // Itinerary logo picture
        [getItineraryLogoPicture.fulfilled]: (state, {payload}) => {
            state.itineraryLogoPicture = payload.data?.itinerary_theme?.itinerary_logo_url ? [{imageUrl: payload?.data?.itinerary_theme?.itinerary_logo_url}] : []
            state.errorMessage = null;
            state.isFetching = false;
        },
        [getItineraryLogoPicture.pending]: (state) => {
            state.isFetching = true;
        },
        [updateItineraryLogoPicture.fulfilled]: (state) => {
            state.flags.isItineraryLogoPictureUpdatedSuccess = true;
            state.errorMessage = null;
            state.isFetching = false;
        },
        [updateItineraryLogoPicture.pending]: (state) => {
            state.isFetching = true;
        },
        [updateItineraryLogoPicture.rejected]: (state, {payload}) => {
            state.flags.isItineraryLogoPictureUpdatedError = true;
            state.errorMessage = payload?.data;
            state.isFetching = false;
        },
        //Booking pictures
        [getItineraryBookingPictures.fulfilled]: (state, {payload}) => {
            state.pictures = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
        },
        [getItineraryBookingPictures.pending]: (state) => {
            state.isFetching = true;
        },
        [getItineraryBookingPictures.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
        [addItineraryBookingPicture.fulfilled]: (state) => {
            state.flags.isBookingPictureAddedSuccess = true;
            state.errorMessage = null;
            state.isFetching = false;
        },
        [addItineraryBookingPicture.pending]: (state) => {
            state.isFetching = true;
        },
        [addItineraryBookingPicture.rejected]: (state, {payload}) => {
            state.flags.isBookingPictureAddedError = true
            state.errorMessage = payload?.data;
            state.isFetching = false;
        },
        [deleteItineraryBookingPicture.fulfilled]: (state) => {
            state.flags.isBookingPictureDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteItineraryBookingPicture.pending]: (state) => {
            state.isFetching = true;
        },
        [deleteItineraryBookingPicture.rejected]: (state, {payload}) => {
            state.flags.isBookingPictureDeletedSuccess = true;
            state.errorMessage = payload?.data;
            state.isFetching = false;
        },
        //Supplier pictures
        [addSupplierPicture.fulfilled]: (state) => {
            state.flags.isSupplierPictureAddedSuccess = true;
            state.errorMessage = null;
            state.isFetching = false;
        },
        [addSupplierPicture.pending]: (state) => {
            state.isFetching = true;
        },
        [addSupplierPicture.rejected]: (state, {payload}) => {
            state.flags.isSupplierPictureAddedError = true
            state.errorMessage = payload?.data;
            state.isFetching = false;
        },
        [getSupplierPictures.fulfilled]: (state, {payload}) => {
            state.pictures = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
        },
        [getSupplierPictures.pending]: (state) => {
            state.isFetching = true;
        },
        [getSupplierPictures.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload?.data;
        },
        [deleteSupplierPicture.fulfilled]: (state) => {
            state.flags.isSupplierPictureDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteSupplierPicture.pending]: (state) => {
            state.isFetching = true;
        },
        [deleteSupplierPicture.rejected]: (state, {payload}) => {
            state.flags.isSupplierPictureDeletedSuccess = true;
            state.errorMessage = payload?.data;
            state.isFetching = false;
        },
    }
});

export const {
    setPicture,
    removeLastPicture,
    setItineraryLogo,
    removePicture,
    removeItineraryLogoPicture,
    clearPictures,
    clearPicturesState,
    clearPicturesFlags,
    setMaxPictures,
} = picturesSlice.actions;

export const picturesSelector = (state) => state.pictures;

export default picturesSlice.reducer;
