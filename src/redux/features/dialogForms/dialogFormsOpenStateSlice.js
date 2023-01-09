import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    globalSearchOpen: false,
    hireCopilotFormOpen: false,
    pictureUploadOpen: false,
    fileUploadOpen: false,
    importBookingOpen: false,
    roomPictureUploadOpen: false,
    itineraryMultiFormOpen: false,
    travelerMultiFormOpen: false,
    deadlineMultiFormOpen: false,
    categoryFormOpen: false,
    bookingFormOpen: false,
    suppliersFormOpen: false,
    notesFormOpen: false,
    editItineraryAbstractOpen: false,
    editItineraryInformationOpen: false,
    editItineraryPictureOpen: false,
    editItineraryTravelersOpen: false,
    editItineraryTasksOpen: false,
    edit: false,
    editPicture: {
        id: null,
        index: null
    }
}

const dialogFormsOpenStateSlice = createSlice({
    name: 'dialogFormsOpenState',
    initialState,
    reducers: {
        setGlobalSearchOpen(state, {payload}) {
            state.globalSearchOpen = payload;
        },
        setHireCopilotFormOpen(state, {payload}) {
            state.hireCopilotFormOpen = payload;
        },
        setItineraryFormOpen(state, {payload}) {
            state.itineraryMultiFormOpen = payload;
        },
        setTravelerFormOpen(state, {payload}) {
            state.travelerMultiFormOpen = payload;
        },
        setDeadlineFormOpen(state, {payload}) {
            state.deadlineMultiFormOpen = payload;
        },
        setPictureUploadOpen(state, {payload}) {
            state.pictureUploadOpen = payload;
        },
        setFileUploadOpen(state, {payload}) {
            state.fileUploadOpen = payload;
        },
        setImportBookingOpen(state, {payload}) {
            state.importBookingOpen = payload;
        },
        setRoomPictureUploadOpen(state, {payload}) {
            state.roomPictureUploadOpen = payload;
        },
        setEditPictureInfo(state, {payload}) {
            state.editPicture=payload
        },
        setCategoryFormOpen(state, {payload}) {
            state.categoryFormOpen = payload;
        },
        setBookingFormOpen(state, {payload}) {
            state.bookingFormOpen = payload;
        },
        setEdit(state, {payload}) {
            state.edit = payload;
        },
        setSuppliersFormOpen(state, {payload}) {
            state.suppliersFormOpen = payload;
        },
        setNotesFormOpen(state, {payload}) {
            state.notesFormOpen = payload;
        },
        setEditItineraryAbstractOpen(state, {payload}) {
            state.editItineraryAbstractOpen = payload;
        },
        setEditItineraryInformationOpen(state, {payload}) {
            state.editItineraryInformationOpen = payload;
        },
        setEditItineraryPictureOpen(state, {payload}) {
            state.editItineraryPictureOpen = payload;
        },
        setEditItineraryTravelersOpen(state, {payload}) {
            state.editItineraryTravelersOpen = payload;
        },
        setEditItineraryTasksOpen(state, {payload}) {
            state.editItineraryTasksOpen = payload;
        },
        closeAllDialogForms: () => initialState,
    },
});

export const {
    setGlobalSearchOpen,
    setHireCopilotFormOpen,
    setPictureUploadOpen,
    setFileUploadOpen,
    setImportBookingOpen,
    setRoomPictureUploadOpen,
    setItineraryFormOpen,
    setTravelerFormOpen,
    setDeadlineFormOpen,
    setCategoryFormOpen,
    setBookingFormOpen,
    setEdit,
    closeAllDialogForms,
    setSuppliersFormOpen,
    setNotesFormOpen,
    setEditItineraryInformationOpen,
    setEditItineraryPictureOpen,
    setEditItineraryTravelersOpen,
    setEditItineraryTasksOpen,
    setEditItineraryAbstractOpen,
    setEditPictureInfo
} = dialogFormsOpenStateSlice.actions;

export const dialogFormsStateSelector = (state) => state.dialogFormsOpenState;

export default dialogFormsOpenStateSlice.reducer;
