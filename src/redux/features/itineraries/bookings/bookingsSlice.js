import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {camelizeNestedKeys} from "utils";
import axios from "api/axios";
import {
    ADD_HOTEL_AMENITY,
    ADD_ITINERARY_BOOKING,
    ADD_ITINERARY_BOOKING_DIVIDER,
    ADD_ITINERARY_BOOKING_HEADER,
    DUPLICATE_ITINERARY_BOOKING,
    SHIFT_ITINERARY_BOOKING,
    ADD_ITINERARY_BOOKING_PASSENGER,
    DELETE_HOTEL_AMENITY,
    DELETE_ITINERARY_BOOKING,
    DELETE_ITINERARY_BOOKING_PASSENGER,
    GET_BOOKING_PASSENGERS, GET_HOTEL_AMENITIES,
    ITINERARY_BOOKING, UPDATE_HOTEL_AMENITY,
    UPDATE_ITINERARY_BOOKING,
    UPDATE_ITINERARY_BOOKING_PASSENGER,
    UPDATE_BOOKING_SEGMENT,
    DELETE_BOOKING_SEGMENT,
    ADD_BOOKING_SEGMENT,
    GET_BOOKING_SEGMENTS,
    ADD_ITINERARY_BOOKING_CABIN,
    UPDATE_ITINERARY_BOOKING_CABIN,
    GET_BOOKING_CABINS,
    DELETE_ITINERARY_BOOKING_CABIN
} from "api/api";

const initialState = {
    booking: null,
    startDate: null,
    startDateInfo: null,
    passengers: null,
    cabins: null,
    segements: null,
    amenities: null,
    bookingPictures: null,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    isDeletedSuccess: false,
    isDeletedError: false,
    isUpdated: false,
    isPictureDeleted: false,
    isPassengerUpdateSuccess: false,
    isPassengerUpdateError: false,  
    isCabinUpdateSuccess: false,
    isCabinUpdateError: false, 
    isPassengerDeletedSuccess: false,
    isPassengerDeletedError: false,
    isCabinDeletedSuccess: false,
    isCabinDeletedError: false,
    isPassengerAddedSuccess: false,
    isPassengerAddedError: false,
    isCabinAddedSuccess: false,
    isCabinAddedError: false,
    isSegmentAddedSuccess: false,
    isSegmentAddedError: false,
    isSegmentUpdateSuccess: false,
    isSegmentUpdateError: false,
    isSegmentDeletedSuccess: false,
    isSegmentDeletedError: false,
    isAmenityUpdateSuccess: false,
    isAmenityUpdateError: false,
    isAmenityAddedSuccess: false,
    isAmenityAddedError: false,
    isAmenityDeletedSuccess: false,
    isAmenityDeletedError: false,
    pendingImages: [],
    editImageIndex: -1,
    roomImage: null,
}

export const addItineraryBooking = createAsyncThunk(
    'booking/addItineraryBooking',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingCategory, data} = arg;
        try {
            return await axios.post(ADD_ITINERARY_BOOKING(itineraryId, bookingCategory), data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItineraryBookingDivider = createAsyncThunk(
    'booking/addItineraryBookingDivider',
    async (arg, thunkAPI) => {
        const {itineraryId, data} = arg;
        try {
            return await axios.post(ADD_ITINERARY_BOOKING_DIVIDER(itineraryId), data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItineraryBookingHeader = createAsyncThunk(
    'booking/addItineraryBookingHeader',
    async (arg, thunkAPI) => {
        const {itineraryId, data} = arg;
        try {
            return await axios.post(ADD_ITINERARY_BOOKING_HEADER(itineraryId), data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const duplicateItineraryBooking = createAsyncThunk(
    'booking/duplicateItineraryBooking',
    async (arg, thunkAPI) => {
        const {itineraryId, data} = arg;
        try {
            return await axios.post(DUPLICATE_ITINERARY_BOOKING(itineraryId), data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


export const shiftItineraryBooking = createAsyncThunk(
    'booking/shiftItineraryBooking',
    async (arg, thunkAPI) => {
        const {itineraryId, data} = arg;
        try {
            return await axios.post(SHIFT_ITINERARY_BOOKING(itineraryId), data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItineraryBookingPassenger = createAsyncThunk(
    'booking/addItineraryBookingPassenger',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, bookingCategory, passenger} = arg;
        try {
            return await axios.post(ADD_ITINERARY_BOOKING_PASSENGER(itineraryId, bookingId, bookingCategory), passenger);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItineraryBookingCabin = createAsyncThunk(
    'booking/addItineraryBookingCabin',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, bookingCategory, cabin} = arg;
        try {
            return await axios.post(ADD_ITINERARY_BOOKING_CABIN(itineraryId, bookingId, bookingCategory), cabin);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getItineraryBooking = createAsyncThunk(
    'booking/getItineraryBooking',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, bookingCategory} = arg;
        try {
            return await axios.get(ITINERARY_BOOKING(itineraryId, bookingId, bookingCategory));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getItineraryBookingPassengers = createAsyncThunk(
    'booking/getItineraryBookingPassengers',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, bookingCategory} = arg;
        try {
            return await axios.get(GET_BOOKING_PASSENGERS(itineraryId, bookingId, bookingCategory));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getItineraryBookingCabins = createAsyncThunk(
    'booking/getItineraryBookingCabins',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, bookingCategory} = arg;
        try {
            return await axios.get(GET_BOOKING_CABINS(itineraryId, bookingId, bookingCategory));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getItineraryBookingSegments = createAsyncThunk(
    'booking/getItineraryBookingSegments',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, bookingCategory} = arg;
        try {
            return await axios.get(GET_BOOKING_SEGMENTS(itineraryId, bookingId, bookingCategory));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteItineraryBooking = createAsyncThunk(
    'booking/deleteItineraryBooking',
    async (arg, thunkAPI) => {
        const {bookingId, itineraryId, bookingCategory} = arg;
        try {
            return await axios.delete(DELETE_ITINERARY_BOOKING(itineraryId, bookingId, bookingCategory));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteItineraryBookingPassenger = createAsyncThunk(
    'booking/deleteItineraryBookingPassenger',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, passengerId, bookingCategory} = arg;
        try {
            return await axios.delete(DELETE_ITINERARY_BOOKING_PASSENGER(itineraryId, bookingId, passengerId, bookingCategory));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteItineraryBookingCabin = createAsyncThunk(
    'booking/deleteItineraryBookingCabin',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, cabinId, bookingCategory} = arg;
        try {
            return await axios.delete(DELETE_ITINERARY_BOOKING_CABIN(itineraryId, bookingId, cabinId, bookingCategory));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteItineraryBookingSegment = createAsyncThunk(
    'booking/deleteItineraryBookingSegment',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, segmentId, bookingCategory} = arg;
        try {
            return await axios.delete(DELETE_BOOKING_SEGMENT(itineraryId, bookingId, segmentId, bookingCategory));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryBooking = createAsyncThunk(
    'booking/updateItineraryBooking',
    async (arg, thunkAPI) => {
        const {bookingId, itineraryId, bookingCategory, data} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY_BOOKING(itineraryId, bookingId, bookingCategory), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryBookingPassenger = createAsyncThunk(
    'booking/updateItineraryBookingPassenger',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, passengerId, bookingCategory, passenger} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY_BOOKING_PASSENGER(itineraryId, bookingId, passengerId, bookingCategory), passenger);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryBookingCabin = createAsyncThunk(
    'booking/updateItineraryBookingCabin',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, cabinId, bookingCategory, cabin} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY_BOOKING_CABIN(itineraryId, bookingId, cabinId, bookingCategory), cabin);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryBookingSegment = createAsyncThunk(
    'booking/updateItineraryBookingSegment',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, flightSegmentId, bookingCategory, segment} = arg;
        try {
            return await axios.post(UPDATE_BOOKING_SEGMENT(itineraryId, bookingId, flightSegmentId, bookingCategory), segment);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItineraryBookingSegment = createAsyncThunk(
    'booking/addItineraryBookingSegment',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, bookingCategory, segment} = arg;
        try {
            return await axios.post(ADD_BOOKING_SEGMENT(itineraryId, bookingId, bookingCategory), segment);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addHotelAmenity = createAsyncThunk(
    'booking/addHotelAmenity',
    async (arg, thunkAPI) => {
        const {bookingId, itineraryId, amenity} = arg;
        try {
            return await axios.post(ADD_HOTEL_AMENITY(itineraryId, bookingId), amenity);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateHotelAmenity = createAsyncThunk(
    'booking/updateHotelAmenity',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, hotelAmenityId, amenity} = arg;
        try {
            return await axios.post(UPDATE_HOTEL_AMENITY(itineraryId, bookingId, hotelAmenityId), amenity);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteHotelAmenity = createAsyncThunk(
    'booking/deleteHotelAmenity',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, hotelAmenityId} = arg;
        try {
            return await axios.delete(DELETE_HOTEL_AMENITY(itineraryId, bookingId, hotelAmenityId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getHotelAmenities = createAsyncThunk(
    'booking/getHotelAmenities',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId} = arg;
        try {
            return await axios.get(GET_HOTEL_AMENITIES(itineraryId, bookingId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        setStartDate:(state, {payload}) => {
            state.startDate = payload;
            state.startDateInfo = payload;
        },
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isDeletedSuccess = false;
            state.isDeletedError = false;
            state.isUpdated = false;
            state.isPictureDeleted = false;
            state.isPassengerUpdateSuccess = false;
            state.isPassengerUpdateError = false;
            state.isPassengerDeletedSuccess = false;
            state.isPassengerDeletedError = false;
            state.isPassengerAddedSuccess = false;
            state.isPassengerAddedError = false;
            state.isSegmentAddedSuccess = false;
            state.isSegmentAddedError = false;
            state.isSegmentUpdateSuccess = false;
            state.isSegmentUpdateError = false;
            state.isSegmentDeletedSuccess = false;
            state.isSegmentDeletedError = false;
            state.isAmenityUpdateSuccess = false;
            state.isAmenityUpdateError = false;
            state.isAmenityAddedSuccess = false;
            state.isAmenityAddedError = false;
            state.isAmenityDeletedSuccess = false;
            state.isAmenityDeletedError = false;
            return state;
        },
        clearPassengers:(state) => {
            state.passengers = null;
        },
        clearCabins:(state) => {
            state.cabins = null;
        },
        clearAmenities:(state) => {
            state.amenities = null;
        },
        setImage(state, {payload}) {
            state.roomImage = payload
        },
        removeImage(state) {
            state.roomImage = null
        },
        setEditIndex(state, {payload}) {
            state.editImageIndex = payload
        },
        setRoomImage(state) {
            const pendingImages = state.pendingImages ? [...state.pendingImages] : [];
            const pendingImage = pendingImages.find(image => {
                return image.index === state.editImageIndex
            })
            if (pendingImage) {
                pendingImage.image = state.roomImage
            } else {
                pendingImages.push({
                    index: state.editImageIndex,
                    image: state.roomImage
                })
            }

            state.pendingImages = pendingImages;
            state.roomImage = null;
        },
        removeRoomImage(state, {payload = undefined}) {
            const pendingImages = state.pendingImages? [...state.pendingImages]: [];
            const filtered = pendingImages.filter((value, index, arr) => {
                if (typeof payload == 'undefined') {
                    return value.index !== state.editImageIndex;
                } else {
                    return value.index !== payload;
                }
            });
            state.pendingImages = filtered
            state.roomImage = null;
        },
        resetImages(state) {
            state.roomImage = null;
            state.pendingImages = [];
            state.editImageIndex = 0;
        },
        resetBooking(state) {
            state.booking = null
        },
    },
    extraReducers: {
        [getItineraryBooking.fulfilled]: (state, {payload}) => {
            state.booking = camelizeNestedKeys(payload.data);
            state.isFetching = false;
        },
        [getItineraryBooking.pending]: (state) => {
            state.isFetching = true;
        },
        [getItineraryBookingPassengers.fulfilled]: (state, {payload}) => {
            state.passengers = camelizeNestedKeys(payload.data);
            state.isFetching = false;
        },
        [getItineraryBookingPassengers.pending]: (state) => {
            state.isFetching = true;
        },
        [getItineraryBookingPassengers.rejected]: (state, {payload}) => {
            state.isFetching = true;
            state.errorMessage = payload?.data;
        },
        [getItineraryBookingCabins.fulfilled]: (state, {payload}) => {
            state.cabins = camelizeNestedKeys(payload.data);
            state.isFetching = false;
        },
        [getItineraryBookingCabins.pending]: (state) => {
            state.isFetching = true;
        },
        [getItineraryBookingCabins.rejected]: (state, {payload}) => {
            state.isFetching = true;
            state.errorMessage = payload?.data;
        },
        [getItineraryBookingSegments.fulfilled]: (state, {payload}) => {
            state.segments = camelizeNestedKeys(payload.data);
            state.isFetching = false;
        },
        [getItineraryBookingSegments.pending]: (state) => {
            state.isFetching = true;
        },
        [getItineraryBookingSegments.rejected]: (state, {payload}) => {
            state.isFetching = true;
            state.errorMessage = payload?.data;
        },
        [addItineraryBooking.fulfilled]: (state, {payload}) => {
            state.booking = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.errorMessage = null;
        },
        [addItineraryBooking.rejected]: (state, {payload}) => {
            state.isError = true;
            state.errorMessage = payload?.data;
        },
        [addItineraryBookingDivider.fulfilled]: (state, {payload}) => {
            state.booking = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.errorMessage = null;
        },
        [addItineraryBookingDivider.rejected]: (state, {payload}) => {
            state.isError = true;
            state.errorMessage = payload?.data;
        },
        [addItineraryBookingHeader.fulfilled]: (state, {payload}) => {
            state.booking = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.errorMessage = null;
        },
        [addItineraryBookingHeader.rejected]: (state, {payload}) => {
            state.isError = true;
            state.errorMessage = payload?.data;
        },
        [duplicateItineraryBooking.fulfilled]: (state, {payload}) => {
            state.booking = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.errorMessage = null;
        },
        [duplicateItineraryBooking.rejected]: (state, {payload}) => {
            state.isError = true;
            state.errorMessage = payload?.data;
        },
        [shiftItineraryBooking.fulfilled]: (state, {payload}) => {
            state.booking = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.errorMessage = null;
        },
        [shiftItineraryBooking.rejected]: (state, {payload}) => {
            state.isError = true;
            state.errorMessage = payload?.data;
        },
        [deleteItineraryBooking.fulfilled]: (state, {payload}) => {
            state.status = payload.status;
            state.isDeletedError = false;
            state.errorMessage = null;
            state.isDeletedSuccess = true;
        },
        [deleteItineraryBooking.rejected]: (state, {payload}) => {
            state.isDeletedError = true;
            state.errorMessage = payload.data;
        },
        [updateItineraryBooking.fulfilled]: (state, {payload}) => {
            state.booking = camelizeNestedKeys(payload.data);
            state.pendingImages = [];
            state.editImageIndex = 0;
            state.roomImage = null
            state.isSuccess = true;
            state.errorMessage = null;
            state.isUpdated = true;
        },
        [updateItineraryBooking.rejected]: (state, {payload}) => {
            state.isError = true;
            state.errorMessage = payload?.data;
            state.isUpdated = false;
        },
        [updateItineraryBookingPassenger.fulfilled]: (state) => {
            state.isPassengerUpdateSuccess = true;
            state.errorMessage = null;
        },
        [updateItineraryBookingPassenger.rejected]: (state, {payload}) => {
            state.isPassengerUpdateError = true;
            state.errorMessage = payload?.data;
        },
        [updateItineraryBookingCabin.fulfilled]: (state) => {
            state.isCabinUpdateSuccess = true;
            state.errorMessage = null;
        },
        [updateItineraryBookingCabin.rejected]: (state, {payload}) => {
            state.isCabinUpdateError = true;
            state.errorMessage = payload?.data;
        },
        [deleteItineraryBookingPassenger.fulfilled]: (state) => {
            state.isPassengerDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteItineraryBookingPassenger.rejected]: (state, {payload}) => {
            state.isPassengerDeletedError = true
            state.errorMessage = payload?.data;
        },
        [deleteItineraryBookingCabin.fulfilled]: (state) => {
            state.isCabinDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteItineraryBookingCabin.rejected]: (state, {payload}) => {
            state.isCabinDeletedError = true
            state.errorMessage = payload?.data;
        },
        [deleteItineraryBookingSegment.fulfilled]: (state) => {
            state.isSegmentDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteItineraryBookingSegment.rejected]: (state, {payload}) => {
            state.isSegmentDeletedSuccess = true
            state.errorMessage = payload?.data;
        },
        [addItineraryBookingPassenger.fulfilled]: (state) => {
            state.isPassengerAddedSuccess = true;
            state.errorMessage = null;
        },
        [addItineraryBookingPassenger.rejected]: (state, {payload}) => {
            state.isPassengerAddedError = true
            state.errorMessage = payload?.data;
        },
        [addItineraryBookingCabin.fulfilled]: (state) => {
            state.isCabinAddedSuccess = true;
            state.errorMessage = null;
        },
        [addItineraryBookingCabin.rejected]: (state, {payload}) => {
            state.isCabinAddedError = true
            state.errorMessage = payload?.data;
        },
        [updateItineraryBookingSegment.fulfilled]: (state) => {
            state.isSegmentUpdateSuccess = true;
            state.errorMessage = null;
        },
        [updateItineraryBookingSegment.rejected]: (state, {payload}) => {
            state.isSegmentUpdateSuccess = true;
            state.errorMessage = payload?.data;
        },
        [addItineraryBookingSegment.fulfilled]: (state) => {
            state.isSegmentAddedSuccess = true;
            state.errorMessage = null;
        },
        [addItineraryBookingSegment.rejected]: (state, {payload}) => {
            state.isSegmentAddedSuccess = true;
            state.errorMessage = payload?.data;
        },
        [updateHotelAmenity.fulfilled]: (state) => {
            state.isAmenityUpdateSuccess = true;
            state.errorMessage = null;
        },
        [updateHotelAmenity.rejected]: (state, {payload}) => {
            state.isAmenityUpdateError = true;
            state.errorMessage = payload?.data;
        },
        [deleteHotelAmenity.fulfilled]: (state) => {
            state.isAmenityDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteHotelAmenity.rejected]: (state, {payload}) => {
            state.isAmenityDeletedError = true
            state.errorMessage = payload?.data;
        },
        [addHotelAmenity.fulfilled]: (state) => {
            state.isAmenityAddedSuccess = true;
            state.errorMessage = null;
        },
        [addHotelAmenity.rejected]: (state, {payload}) => {
            state.isAmenityAddedError = true
            state.errorMessage = payload?.data;
        },
        [getHotelAmenities.fulfilled]: (state, {payload}) => {
            state.amenities = camelizeNestedKeys(payload.data);
        },
    }
});

export const {clearState, clearPassengers, clearCabins, clearAmenities, setStartDate, setImage, removeRoomImage, removeImage, setEditIndex, setRoomImage, resetImages, resetBooking} = bookingsSlice.actions;

export const bookingsSelector = (state) => state.bookings;
export const bookingsIsFetchingSelector = (state) => state.bookings.isFetching;

export default bookingsSlice.reducer;
