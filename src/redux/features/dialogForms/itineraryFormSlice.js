import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    step: 1,
    itineraryData: null,
    images: null,
    itineraryStatusCompletion: false,
    editItineraryTab: null,
}

const itineraryFormSlice = createSlice({
    name: 'itineraryForm',
    initialState,
    reducers: {
        setItineraryImages(state, {payload}) {
            state.images = payload;
        },
        setItineraryFormStep(state, {payload}) {
            state.step = payload || state.step + 1;
        },
        setItineraryFormData(state, {payload}) {
            return {
                ...state,
                itineraryData: {
                    ...state.itineraryData, ...payload,
                },
            }
        },
        setItineraryStatusCompletion(state, {payload}) {
            state.itineraryStatusCompletion = payload;
        },
        resetItineraryState: () => initialState,
        setEditTab: (state, {payload}) => {
            state.editItineraryTab = payload;
        },
    },
});

export const {
    setItineraryFormOpen,
    setItineraryFormStep,
    setItineraryFormData,
    resetItineraryState,
    setItineraryImages,
    setEditTab,
    setItineraryStatusCompletion,
} = itineraryFormSlice.actions;

export const itineraryMultiFormSelector = (state) => state.itineraryForm;

export default itineraryFormSlice.reducer;
