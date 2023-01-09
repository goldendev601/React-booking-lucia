import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "api/axios";
import {FETCH_NOTES, AUTOCOMPLETE_NOTES, DELETE_NOTE, ADD_NOTE, UPDATE_NOTE} from "api/api";
import {camelizeNestedKeys} from "utils";

const noteFlags = {
    isNoteUpdatedSuccess: false,
    isNoteUpdatedError: false,

    isNoteAddedSuccess: false,
    isNoteAddedError: false,

    isNoteDeletedSuccess: false,
    isNoteDeletedError: false,

    isNotePictureAddedSuccess: false,
    isNotePictureAddedError: false,
}

const initialState = {
    noteInfo: null,
    note: null,
    noteList: [],
    noteId: null,
    page: 1,
    start: 0,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    flags: {
        ...noteFlags
    }
}

export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (page, thunkAPI) => {
        try {
            return await axios.get(FETCH_NOTES(page));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addNote = createAsyncThunk(
    'notes/addNote',
    async (note, thunkAPI) => {
        try {
            return await axios.post(ADD_NOTE, note);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async (arg, thunkAPI) => {
        const {noteId, note} = arg;
        try {
            return await axios.post(UPDATE_NOTE(noteId), note);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const autocompleteNotes = createAsyncThunk(
    'notes/autocompleteNotes',
    async (arg, thunkAPI) => {
        const {search} = arg;
        try {
            return await axios.get(AUTOCOMPLETE_NOTES(search));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (noteId, thunkAPI) => {
        try {
            return await axios.delete(DELETE_NOTE(noteId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const notesSlice = createSlice({
    name: 'noteInfo',
    initialState,
    reducers: {
        setNoteId: (state, {payload}) => {
            state.noteId = payload;
        },
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.noteId = null;
            return state;
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
            }
        },
        clearNoteFlags(state) {
            state.flags = noteFlags;
        },
        setNote: (state, {payload}) => {
            state.note = payload;
        },
    },
    extraReducers: {
        //Get notes
        [fetchNotes.fulfilled]: (state, {payload}) => {
            state.noteInfo = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
        },
        [fetchNotes.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchNotes.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        //Add note
        [addNote.fulfilled]: (state) => {
            state.flags.isNoteAddedSuccess = true;
            state.errorMessage = null;
        },
        [addNote.rejected]: (state, {payload}) => {
            state.flags.isNoteAddedError = true;
            state.errorMessage = payload?.data;
        },
        //Update note
        [updateNote.fulfilled]: (state) => {
            state.flags.isNoteUpdatedSuccess = true;
            state.errorMessage = null;
        },
        [updateNote.rejected]: (state, {payload}) => {
            state.flags.isNoteUpdatedError = true;
            state.errorMessage = payload?.data;
        },
        //Delete note
        [deleteNote.fulfilled]: (state) => {
            state.flags.isNoteDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteNote.rejected]: (state, {payload}) => {
            state.flags.isNoteDeletedError = true;
            state.errorMessage = payload?.data;
        },
        //Notes autocomplete
        [autocompleteNotes.fulfilled]: (state, {payload}) => {
            state.noteList = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
        },
        [autocompleteNotes.pending]: (state) => {
            state.isFetching = true;
        },
        [autocompleteNotes.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
    }
});

export const {clearState, setNote, clearNoteFlags, setNoteId, setPage, setStart} = notesSlice.actions;

export const notesSelector = (state) => state.noteInfo;

export default notesSlice.reducer;
