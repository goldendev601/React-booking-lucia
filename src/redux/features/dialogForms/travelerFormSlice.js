import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    step: 1,
    travelerData: null,
    images: null,
    travelerStatusCompletion: false,
    editTravelerTab: null,
}

const travelerFormSlice = createSlice({
    name: 'travelerForm',
    initialState,
    reducers: {
        setTravelerImages(state, {payload}) {
            state.images = payload;
        },
        setTravelerFormStep(state, {payload}) {
            state.step = payload || state.step + 1;
        },
        setTravelerFormData(state, {payload}) {
            return {
                ...state,
                travelerData: {
                    ...state.travelerData, ...payload,
                },
            }
        },
        setTravelerStatusCompletion(state, {payload}) {
            state.travelerStatusCompletion = payload;
        },
        resetTravelerState: () => initialState,
        setEditTab: (state, {payload}) => {
            state.editTravelerTab = payload;
        },
    },
});

export const {
    setTravelerFormOpen,
    setTravelerFormStep,
    setTravelerFormData,
    resetTravelerState,
    setTravelerImages,
    setEditTab,
    setTravelerStatusCompletion,
} = travelerFormSlice.actions;

export const travelerMultiFormSelector = (state) => state.travelerForm;

export default travelerFormSlice.reducer;
