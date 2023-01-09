import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../api/axios";

export const getItineraryBookings = createAsyncThunk(
    'booking/getItineraryBookings',
    async (arg, thunkAPI) => {
        const {api, itineraryId, bookingCategory} = arg;
        try {
            return await axios.get(api(itineraryId, bookingCategory));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
