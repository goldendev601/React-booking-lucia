import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "api/axios";
import {
    ADD_HOTEL_ROOM,
    DELETE_HOTEL_ROOM,
    GET_HOTEL_ROOMS, 
    UPDATE_HOTEL_ROOM,
    ADD_HOTEL_ROOM_IMAGE,
    DELETE_HOTEL_ROOM_IMAGE
} from "api/api";
import {camelizeNestedKeys} from "utils";

const hotelRoomsFlags = {
    isHotelRoomDeletedSuccess: false,
    isHotelRoomDeletedError: false,
    isHotelRoomAddedSuccess: false,
    isHotelRoomAddedError: false,
    isHotelRoomUpdatedSuccess: false,
    isHotelRoomUpdatedError: false,
    isHotelRoomImageAddedError: false,
    isHotelRoomImageAddedSuccess: false,
    isHotelRoomImageDeletedError: false,
    isHotelRoomImageDeletedSuccess: false,
}

const initialState = {
    rooms: null,
    hotelRoomsErrorMessage: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    hotelRoomsFlags: {
        ...hotelRoomsFlags
    },
    editImageIndex: -1,
    roomImage: null
}

export const getHotelRooms = createAsyncThunk(
    'rooms/getHotelRooms',
    async (_, thunkAPI) => {
        try {
            return await axios.get(GET_HOTEL_ROOMS);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addHotelRoom = createAsyncThunk(
    'rooms/addHotelRoom',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, room} = arg;
        try {
            return await axios.post(ADD_HOTEL_ROOM(itineraryId, bookingId), room, {headers: {"Content-Type": "multipart/form-data"}});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateHotelRoom = createAsyncThunk(
    'rooms/updateHotelRoom',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, hotelRoomId, room} = arg;
        try {
            return await axios.post(UPDATE_HOTEL_ROOM(itineraryId, bookingId, hotelRoomId), room, {headers: {"Content-Type": "multipart/form-data"}});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addHotelRoomImage = createAsyncThunk(
    'rooms/addHotelRoomImage',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, hotelRoomId, image} = arg;
        try {
            return await axios.post(ADD_HOTEL_ROOM_IMAGE(itineraryId, bookingId, hotelRoomId), image, {headers: {"Content-Type": "multipart/form-data"}});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteHotelRoomImage = createAsyncThunk(
    'rooms/deleteHotelRoomImage',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, hotelRoomId} = arg;
        try {
            return await axios.delete(DELETE_HOTEL_ROOM_IMAGE(itineraryId, bookingId, hotelRoomId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteHotelRoom = createAsyncThunk(
    'rooms/deleteHotelRoom',
    async (arg, thunkAPI) => {
        const {itineraryId, bookingId, hotelRoomId} = arg;
        try {
            return await axios.delete(DELETE_HOTEL_ROOM(itineraryId, bookingId, hotelRoomId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        clearHotelRoomsFlags(state) {
            state.hotelRoomsFlags = hotelRoomsFlags;
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
            state.rooms[state.editImageIndex].imageUrl = state.roomImage
        },
    },
    extraReducers: {
        //Get hotel rooms
        [getHotelRooms.fulfilled]: (state, {payload}) => {
            state.rooms = camelizeNestedKeys(payload.data);
            state.isSuccess = true;
            state.isFetching = false;
            state.hotelRoomsErrorMessage = null;
        },
        [getHotelRooms.pending]: (state) => {
            state.isFetching = true;
        },
        [getHotelRooms.rejected]: (state, {payload}) => {
            state.isError = true
            state.isFetching = false;
            state.isSuccess = false;
            state.hotelRoomsErrorMessage = payload?.data;
        },
        //add hotel room
        [addHotelRoom.fulfilled]: (state) => {
            state.hotelRoomsFlags.isHotelRoomAddedSuccess = true;
            state.isFetching = false;
            state.hotelRoomsErrorMessage = null;
        },
        [addHotelRoom.pending]: (state) => {
            state.isFetching = true;
        },
        [addHotelRoom.rejected]: (state, {payload}) => {
            state.hotelRoomsFlags.isHotelRoomAddedError = true
            state.isFetching = false;
            state.hotelRoomsErrorMessage = payload?.data;
        },
        //update hotel room
        [updateHotelRoom.fulfilled]: (state) => {
            state.hotelRoomsFlags.isHotelRoomUpdatedSuccess = true;
            state.isFetching = false;
            state.hotelRoomsErrorMessage = null;
        },
        [updateHotelRoom.pending]: (state) => {
            state.isFetching = true;
        },
        [updateHotelRoom.rejected]: (state, {payload}) => {
            state.hotelRoomsFlags.isHotelRoomUpdatedError = true
            state.isFetching = false;
            state.hotelRoomsErrorMessage = payload?.data;
        },
        //add hotel room image
        [addHotelRoomImage.fulfilled]: (state) => {
            state.hotelRoomsFlags.isHotelRoomImageAddedSuccess = true;
            state.isFetching = false;
            state.hotelRoomsErrorMessage = null;
        },
        [addHotelRoomImage.pending]: (state) => {
            state.isFetching = true;
        },
        [addHotelRoomImage.rejected]: (state, {payload}) => {
            state.hotelRoomsFlags.isHotelRoomImageAddedError = true
            state.isFetching = false;
            state.hotelRoomsErrorMessage = payload?.data;
        },
        //delete hotel room image
        [addHotelRoomImage.fulfilled]: (state) => {
            state.hotelRoomsFlags.isHotelRoomImageDeletedSuccess = true;
            state.isFetching = false;
            state.hotelRoomsErrorMessage = null;
        },
        [addHotelRoomImage.pending]: (state) => {
            state.isFetching = true;
        },
        [addHotelRoomImage.rejected]: (state, {payload}) => {
            state.hotelRoomsFlags.isHotelRoomImageDeletedError = true
            state.isFetching = false;
            state.hotelRoomsErrorMessage = payload?.data;
        },
        //delete hotel room
        [deleteHotelRoom.fulfilled]: (state) => {
            state.hotelRoomsFlags.isHotelRoomDeletedSuccess = true;
            state.isFetching = false;
            state.hotelRoomsErrorMessage = null;
        },
        [deleteHotelRoom.pending]: (state) => {
            state.isFetching = true;
        },
        [deleteHotelRoom.rejected]: (state, {payload}) => {
            state.hotelRoomsFlags.isHotelRoomDeletedError = true
            state.isFetching = false;
            state.hotelRoomsErrorMessage = payload?.data;
        },
    }
});

export const {
    clearHotelRoomsFlags,
    setRoomImage,
    setImage,
    removeImage,
    setEditIndex,
} = roomsSlice.actions;

export const roomsSelector = (state) => state.rooms;

export default roomsSlice.reducer;
