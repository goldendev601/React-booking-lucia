import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "api/axios";
import {
    GET_MY_REQUESTS,
    DELETE_REQUEST,
    MARK_COMPLETED,
    ADVISOR_REQUESTS_EXTEND_DEADLINE,
    SEND_MESSAGE,
    SEND_FILE,
    LIST_CHATS,
    MARK_SEEN,
    SUBMIT_FEEDBACK
} from "api/api";
import {camelizeNestedKeys} from "utils";

const initialState = {
    openRequests: null,
    isRequestDeletedSuccess: false,
    messages: null,
    openRequestsIsFetching: false,
    myRequests: null,
    myRequestsIsFetching: false,
    selectedRequest: null,
    selectedMyRequest: null,
    acceptRequest: null,
    isAccepting: false,
    isSent: false,
    isSentError: false,
    isSentFile: false,
    isSentFileError: false,
    isSubmitFeedback: false,
    isSubmitFeedbackError: false,
    isExtendedDeadlineSuccess: false,
    isExtendedDeadlineError: false,
    acceptedSuccess: false,
    errorMessage: null,
    acceptedError: false,
    isMarkCompleted: false,
    isMarkSeen: false,
    isMarkCompletedError: false,  
    isMarkSeenError: false,  
    messagesIsFetching: false, 
}

export const getMyRequests = createAsyncThunk(
    'getMyRequests',
    async (thunkAPI) => {
        try {
            return await axios.get(GET_MY_REQUESTS);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteRequest = createAsyncThunk(
    'deleteRequest',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.delete(DELETE_REQUEST(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const markCompleted = createAsyncThunk(
    'markCompleted',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.post(MARK_COMPLETED(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const advisorRequestsExtendDeadline = createAsyncThunk(
    'advisorRequestsExtendDeadline',
    async (arg, thunkAPI) => {
        const {advisorId, data} = arg;
        try {
            return await axios.post(ADVISOR_REQUESTS_EXTEND_DEADLINE(advisorId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const markSeen = createAsyncThunk(
    'markSeen',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.post(MARK_SEEN(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const sendMessage = createAsyncThunk(
    'sendMessage',
    async (arg, thunkAPI) => {
        const {advisorId, data} = arg;
        try {
            return await axios.post(SEND_MESSAGE(advisorId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const sendFile = createAsyncThunk(
    'sendFile',
    async (arg, thunkAPI) => {
        const {advisorId, data} = arg;
        try {
            return await axios.post(SEND_FILE(advisorId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const submitFeedback = createAsyncThunk(
    'submitFeedback',
    async (arg, thunkAPI) => {
        const {advisorId, data} = arg;
        try {
            return await axios.post(SUBMIT_FEEDBACK(advisorId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const listChats = createAsyncThunk(
    'listChats',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.get(LIST_CHATS(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        selectMyRequest(state, {payload}) {
            state.selectedMyRequest = payload;
        },
        clearState: (state) => {
            state.isMarkCompleted = false;
            state.isMarkCompletedError = false;
            state.selectedMyRequest = null;
            return state;
        },
        clearDeadlineExtended: (state) => {
            state.isExtendedDeadlineSuccess = false;
            state.isExtendedDeadlineError = false;
        },
    },
    extraReducers: {
        [getMyRequests.fulfilled]: (state, {payload}) => {
            state.myRequests = camelizeNestedKeys(payload.data);
            state.myRequestsIsFetching = false;
        },
        [getMyRequests.pending]: (state) => {
            state.myRequestsIsFetching = true;
        },
        [getMyRequests.rejected]: (state) => {
            state.myRequestsIsFetching = false;
        },
        //Delete Request
        [deleteRequest.fulfilled]: (state) => {
            state.isRequestDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteRequest.rejected]: (state, {payload}) => {
            state.isRequestDeletedSuccess = false;
            state.errorMessage = payload?.data;
        },
        [listChats.fulfilled]: (state, {payload}) => {
            state.messagesIsFetching = false;
            if (payload.data.length > 0 && state.messages) {
                const id = payload.data[0].id;
                const index = state.messages.findIndex((message) => message.id === id)
                if (payload.data.length != state.messages.length || index === -1)  {
                    state.messages = camelizeNestedKeys(payload.data);
                }
            } else {
                state.messages = camelizeNestedKeys(payload.data);
            }
        },
        [listChats.pending]: (state) => {
            state.messagesIsFetching = true;
        },
        [listChats.rejected]: (state) => {
            state.messagesIsFetching = false;
        },
        [markCompleted.fulfilled]: (state) => {
            state.isMarkCompleted = true;
            state.selectedMyRequest.advisorRequestStatus = 'COMPLETED';   
            state.selectedMyRequest.advisorRequestStatusId = 4;
            const requestIndex = state.myRequests.findIndex(re => re.id === state.selectedMyRequest.id);
            const stateMyRequests = [...state.myRequests]
            stateMyRequests[requestIndex].advisorRequestStatus = 'COMPLETED';
            stateMyRequests[requestIndex].advisorRequestStatusId = 4;
            state.myRequests = stateMyRequests
            state.isMarkCompletedError = false;
        },
        [markCompleted.rejected]: (state, {payload}) => {
            state.isMarkCompleted = false;
            state.errorMessage = payload?.data;
            state.isMarkCompletedError = true;
        },
        [advisorRequestsExtendDeadline.fulfilled]: (state, {payload}) => {
            if (payload.data) {
                state.selectedMyRequest = camelizeNestedKeys(payload.data.request);
            }
            state.isExtendedDeadlineSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsExtendDeadline.rejected]: (state, {payload}) => {
            state.isExtendedDeadlineError = true;
            state.errorMessage = payload?.data;
        },
        [markSeen.fulfilled]: (state) => {
            state.isMarkSeen = true;
            state.isMarkSeenError = false;
        },
        [markSeen.rejected]: (state, {payload}) => {
            state.isMarkSeen = false;
            state.errorMessage = payload?.data;
            state.isMarkSeenError = true;
        },
        [markSeen.fulfilled]: (state) => {
            state.isMarkSeen = true;
            state.isMarkSeenError = false;
        },
        [sendMessage.fulfilled]: (state) => {
            state.isSent = true;
            state.isSentError = false;
        },
        [sendMessage.rejected]: (state, {payload}) => {
            state.isSent = false;
            state.errorMessage = payload?.data;
            state.isSentError = true;
        },
        [sendFile.fulfilled]: (state) => {
            state.isSentFile = true;
            state.isSentFileError = false;
        },
        [sendFile.rejected]: (state, {payload}) => {
            state.isSentFile = false;
            state.errorMessage = payload?.data;
            state.isSentFileError = true;
        },
        [submitFeedback.fulfilled]: (state) => {
            state.isSubmitFeedback = true;
            state.isSubmitFeedbackError = false;
        },
        [submitFeedback.rejected]: (state, {payload}) => {
            state.isSubmitFeedback = false;
            state.errorMessage = payload?.data;
            state.isSubmitFeedbackError = true;
        },
    }
});

export const {
    selectMyRequest,
    clearState,
    clearDeadlineExtended,
} = requestSlice.actions;


export const requestSelector = (state) => state.requests;

export default requestSlice.reducer;
