import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    step: 1,
    open: false,
    category: null,
    bookingData: null,
    images: null,
    hotelAmenities: [],
    bookingStatusCompletion: false,
    passengersBeforeAutocomplete: [],
    cabinsBeforeAutocomplete: [],
}

const bookingFormSlice = createSlice({
    name: 'bookingForm',
    initialState,
    reducers: {
        setBookingFormStep(state, {payload}) {
            state.step = payload || state.step + 1;
        },
        setBookingImages(state, {payload}) {
            state.images = payload;
        },
        setBookingCategory(state, {payload}) {
            state.category = payload;
        },
        setBookingFormData(state, {payload}) {
            return {
                ...state,
                bookingData: {
                    ...state.bookingData, ...payload,
                },
            }
        },
        setBookingStatusCompletion(state) {
            state.bookingStatusCompletion = !state.bookingStatusCompletion;
        },
        setHotelAmenities(state, {payload}) {
            state.hotelAmenities = payload;
        },
        setPassengers(state, {payload}) {
            state.passengersBeforeAutocomplete = payload;
        },
        setCabins(state, {payload}) {
            state.cabinsBeforeAutocomplete = payload;
        },
        resetBookingState: () => initialState,
    },
});

export const {
    setBookingFormStep,
    setBookingCategory,
    setBookingImages,
    setBookingFormData,
    setBookingFormName,
    setBookingStatusCompletion,
    setHotelAmenities,
    setPassengers,
    setCabins,
    resetBookingState,
} = bookingFormSlice.actions;

export const bookingFormSelector = (state) => state.bookingForm;

export default bookingFormSlice.reducer;
