import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';
import axios from "api/axios";
import {
    ADD_ITINERARY, ADD_ITINERARY_PASSENGER,
    DELETE_ITINERARY,
    SET_ITINERARY_STATUS,    
    DELETE_ITINERARY_PASSENGER,
    FETCH_ITINERARIES,
    FETCH_ITINERARY, FETCH_PACKED_ITINERARY,
    FETCH_SHARED_ITINERARY,
    GET_ITINERARY_PASSENGERS,
    UPDATE_ITINERARY,
    Add_ITINERARY_DOCUMENT,
    Add_ITINERARY_TASK,
    MARK_ITINERARY_TASK_COMPLETED,
    DELETE_ITINERARY_DOCUMENT,
    IMPORT_BOOKING,
    CLONE_ITINERARY,
    UPDATE_ITINERARY_ABSTRACT, 
    UPDATE_ITINERARY_BOOKING_POSITION,
    UPDATE_ITINERARY_PASSENGER,
    FETCH_PROPERTY_DESIGNS,
    ADVISOR_REQUESTS_HIRE,
    ADVISOR_REQUESTS_GET_CONCIERGES,
    ADVISOR_REQUESTS_GET_NOTIFICATIONS,
    ADVISOR_REQUESTS_GET_TOP_CONCIERGES,
    ADVISOR_REQUESTS_GET_RECENT_REQUESTS,
    ADVISOR_REQUESTS_PAY_USING_INTENT,
    ADVISOR_REQUESTS_APPLY_DISCOUNT,
    ADVISOR_REQUESTS_COMPLETE_INTENT_PAYMENT,
    GET_PAYMENT_METHODS,
    ADVISOR_REQUESTS_PAY_USING_STORED_PAYMENT
} from "api/api";
import {camelizeNestedKeys} from "utils";

const initialState = {
    itinerary: null,
    packedItinerary: null,
    page: 1,
    start: 0,
    expanded: false,
    itineraryId: null,
    advisorRequestType: null,
    concierge: null,
    pictures: null,
    passengers: null,
    itineraries: null,
    advisorRequest: null,
    advisorRequestId: null,
    advisorRequestPaymentMethod: 0,
    defaultStripeTokenId: null,
    isFetching: false,
    isHiring: false,
    hiredSuccess: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    clientSecret: null,
    paidRequestsInfo: null,
    updatedRequestsInfo: null,
    advisorRequestDiscounted: null,
    stripeKey: null,
    advisorRequestCompletePaymentResponse: null,
    concierges: [],
    topConcierges: [],
    recentRequests: [],
    notifications: 0,
    paymentMethods: [],
    isPayUsingIntentSuccess: false,
    isPayUsingIntentError: false,
    isApplyDiscountSuccess: false,
    isApplyDiscountError: false,
    isPayUsingStoredPaymentSuccess: false,
    isPayUsingStoredPaymentError: false,    
    picturesErrorMessage: null,
    addedSuccess: false,
    addedError: false,
    hiredError: false,
    getConciergesSuccess: false,
    getConciergesError: false,
    getTopConciergesSuccess: false,
    getTopConciergesError: false,
    getRecentRequestsSuccess: false,
    getRecentRequestsError: false,
    getPaymentMethodsSuccess: false,
    getPaymentMethodsError: false,
    isDeletedSuccess: false,
    isDeletedError: false,
    isItineraryUpdated: false,
    isItineraryUpdatedError: false,
    isItineraryStatusUpdated: false,
    isItineraryStatusUpdatedError: false,
    isItineraryDocumentAdded: false,
    isItineraryTaskAdded: false,
    isItineraryTaskMarked: false,
    isUploadingDocument: false,
    isItineraryDocumentAddedError: false,
    isItineraryTaskAddedError: false,
    isItineraryTaskMarkedError: false,
    isItineraryBookingImported: false,
    isItineraryBookingImportedError: false,
    isItineraryCloned: false,
    isItineraryClonedError: false,
    isPassengerDeletedSuccess: false,
    isPassengerDeletedError: false,
    isDocumentDeletedSuccess: false,
    isDocumentDeletedError: false,
    itineraryPassengersIsFetching: false,
    itineraryPassengersIsSuccess: false,
    isItineraryBookingPositionError: false,
    isItineraryBookingPositionSuccess: false,
}

export const fetchItineraries = createAsyncThunk(
    'itineraries/fetchItineraries',
    async (arg, thunkAPI) => {
        const {start, past, active, upcoming} = arg;
        try {
            return await axios.get(FETCH_ITINERARIES(start, past, active, upcoming));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const fetchPackedItinerary = createAsyncThunk(
    'itineraries/fetchPackedItinerary',
    async (itineraryId, thunkAPI) => {
        try {
            return await axios.get(FETCH_PACKED_ITINERARY(itineraryId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryBookingPosition = createAsyncThunk(
    'itineraries/updateItineraryBookingPosition',
    async (arg, thunkAPI) => {
        const {itineraryId, formData} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY_BOOKING_POSITION(itineraryId), formData, {headers: {"Content-Type": "multipart/form-data"}});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


export const advisorRequestsPayUsingIntent = createAsyncThunk(
    'itineraries/advisorRequestsPayUsingIntent',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.post(ADVISOR_REQUESTS_PAY_USING_INTENT(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const advisorRequestsApplyDiscount = createAsyncThunk(
    'itineraries/advisorRequestsApplyDiscount',
    async (arg, thunkAPI) => {
        const {advisorId, data} = arg;
        try {
            return await axios.post(ADVISOR_REQUESTS_APPLY_DISCOUNT(advisorId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const advisorRequestsPayUsingStoredPayment = createAsyncThunk(
    'itineraries/advisorRequestsPayUsingStoredPayment',
    async (arg, thunkAPI) => {
        const {advisorId, data} = arg;
        try {
            return await axios.post(ADVISOR_REQUESTS_PAY_USING_STORED_PAYMENT(advisorId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);




export const advisorRequestsCompleteIntentPayment = createAsyncThunk(
    'itineraries/advisorRequestsCompleteIntentPayment',
    async (arg, thunkAPI) => {
        const {advisorId} = arg;
        try {
            return await axios.post(ADVISOR_REQUESTS_COMPLETE_INTENT_PAYMENT(advisorId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const fetchItinerary = createAsyncThunk(
    'itineraries/fetchItinerary',
    async (id, thunkAPI) => {
        try {
            return await axios.get(FETCH_ITINERARY(id));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const fetchSharedItinerary = createAsyncThunk(
    'itineraries/fetchSharedItinerary',
    async (key, thunkAPI) => {
        try {
            return await axios.get(FETCH_SHARED_ITINERARY(key));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getItineraryPassengers = createAsyncThunk(
    'itineraries/getItineraryPassengers',
    async (itineraryId, thunkAPI) => {
        try {
            return await axios.get(GET_ITINERARY_PASSENGERS(itineraryId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getPropertyDesigns = createAsyncThunk(
    'itineraries/getPropertyDesigns',
    async (thunkAPI) => {
        try {
            return await axios.get(FETCH_PROPERTY_DESIGNS);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItinerary = createAsyncThunk(
    'itineraries/addItinerary',
    async (formData, thunkAPI) => {
        try {
            return await axios.post(ADD_ITINERARY, formData);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


export const advisorRequestsHire = createAsyncThunk(
    'itineraries/advisorRequestsHire',
    async (formData, thunkAPI) => {
        try {
            return await axios.post(ADVISOR_REQUESTS_HIRE, formData);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const advisorRequestsGetConcierges = createAsyncThunk(
    'itineraries/advisorRequestsGetConcierges',
    async (thunkAPI) => {
        try {
            return await axios.get(ADVISOR_REQUESTS_GET_CONCIERGES);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const advisorRequestsGetNotifications = createAsyncThunk(
    'itineraries/advisorRequestsGetNotifications',
    async (thunkAPI) => {
        try {
            return await axios.get(ADVISOR_REQUESTS_GET_NOTIFICATIONS);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const advisorRequestsGetTopConcierges = createAsyncThunk(
    'itineraries/advisorRequestsGetTopConcierges',
    async (limit, thunkAPI) => {
        try {
            return await axios.get(ADVISOR_REQUESTS_GET_TOP_CONCIERGES(limit));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const advisorRequestsGetRecentRequests = createAsyncThunk(
    'itineraries/advisorRequestsGetRecentRequests',
    async (limit, thunkAPI) => {
        try {
            return await axios.get(ADVISOR_REQUESTS_GET_RECENT_REQUESTS(limit));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getPaymentMethods = createAsyncThunk(
    'itineraries/getPaymentMethods',
    async (thunkAPI) => {
        try {
            return await axios.get(GET_PAYMENT_METHODS);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItineraryPassenger = createAsyncThunk(
    'itineraries/addItineraryPassenger',
    async (arg, thunkAPI) => {
        const {itineraryId, passenger} = arg;
        try {
            return await axios.post(ADD_ITINERARY_PASSENGER(itineraryId), passenger);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteItinerary = createAsyncThunk(
    'itineraries/deleteItinerary',
    async (id, thunkAPI) => {
        try {
            return await axios.delete(DELETE_ITINERARY(id));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteItineraryPassenger = createAsyncThunk(
    'itineraries/deleteItineraryPassenger',
    async (arg, thunkAPI) => {
        const {itineraryId, passengerId} = arg;
        try {
            return await axios.delete(DELETE_ITINERARY_PASSENGER(itineraryId, passengerId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryAbstract = createAsyncThunk(
    'itineraries/updateItineraryAbstract',
    async (arg, thunkAPI) => {
        const {itineraryId, abstract} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY_ABSTRACT(itineraryId), abstract);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const setItineraryStatus = createAsyncThunk(
    'itineraries/setItineraryStatus',
    async (arg, thunkAPI) => {
        const {itineraryId, data} = arg;
        try {
            return await axios.post(SET_ITINERARY_STATUS(itineraryId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryInformation = createAsyncThunk(
    'itineraries/updateItineraryInformation',
    async (arg, thunkAPI) => {
        const {itineraryId, data} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY(itineraryId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItineraryDocument = createAsyncThunk(
    'itineraries/addItineraryDocument',
    async (arg, thunkAPI) => {
        const {itineraryId, data} = arg;
        try {
            return await axios.post(Add_ITINERARY_DOCUMENT(itineraryId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addItineraryTask = createAsyncThunk(
    'itineraries/addItineraryTask',
    async (arg, thunkAPI) => {
        const {itineraryId, data} = arg;
        try {
            return await axios.post(Add_ITINERARY_TASK(itineraryId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const markItineraryTaskCompleted = createAsyncThunk(
    'itineraries/markItineraryTaskCompleted',
    async (arg, thunkAPI) => {
        const {itineraryId, taskId} = arg;
        try {
            return await axios.post(MARK_ITINERARY_TASK_COMPLETED(itineraryId, taskId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const deleteItineraryDocument = createAsyncThunk(
    'itineraries/deleteItineraryDocument',
    async (arg, thunkAPI) => {
        const {itineraryId, documentId} = arg;
        try {
            return await axios.delete(DELETE_ITINERARY_DOCUMENT(itineraryId, documentId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const importBooking = createAsyncThunk(
    'itineraries/importBooking',
    async (arg, thunkAPI) => {
        const {itineraryId, data} = arg;
        try {
            return await axios.post(IMPORT_BOOKING(itineraryId), data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const cloneItineraryInformation = createAsyncThunk(
    'itineraries/cloneItineraryInformation',
    async (arg, thunkAPI) => {
        const {itineraryId} = arg;
        try {
            return await axios.post(CLONE_ITINERARY(itineraryId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryPassenger = createAsyncThunk(
    'itineraries/updateItineraryPassenger',
    async (arg, thunkAPI) => {
        const {itineraryId, passengerId, passenger} = arg;
        try {
            return await axios.post(UPDATE_ITINERARY_PASSENGER(itineraryId, passengerId), passenger);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const itinerariesSlice = createSlice({
    name: 'itinerary',
    initialState,
    reducers: {
        setItineraryId: (state, {payload}) => {
            state.itineraryId = payload;
        },
        setPage: (state, {payload}) => {
            state.page = payload;
        },
        setAdvisorRequestType: (state, {payload}) => {
            state.advisorRequestType = payload;
        },
        setAdvisorRequestPaymentMethod: (state, {payload}) => {
            state.advisorRequestPaymentMethod = payload;
        },
        setDefaultStripeTokenId: (state, {payload}) => {
            state.defaultStripeTokenId = payload;
        },
        setConcierge: (state, {payload}) => {
            state.concierge = payload;
        },
        setTravelerProfileExpanded: (state, {payload}) => {
            state.expanded = payload;
        },
        setBookings: (state, {payload}) => {
            state.packedItinerary.bookings[payload.dateSource] = payload.sourceBookings;
            state.packedItinerary.bookings[payload.dateDestination] = payload.destinationBookings;
        },
        setStart: (state, {payload}) => {
            if (!payload) {
                if (state.page === 1) {
                    state.start = 0
                } else {
                    state.start = (state.page - 1) * 10 + 1;
                }
            } else {
                state.start = Math.ceil(payload - 1) + 1;
            }
        },
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.addedError = false;
            state.addedSuccess = false;
            state.isDeletedSuccess = false;
            state.isDeletedError = false;
            state.isItineraryUpdated = false;
            state.isItineraryUpdatedError = false;
            state.isItineraryStatusUpdated = false;
            state.isItineraryStatusUpdatedError = false;
            state.isItineraryDocumentAdded = false;
            state.isUploadingDocument = false;
            state.isItineraryDocumentAddedError = false;
            state.isItineraryBookingImported = false;
            state.isItineraryBookingImportedError = false;
            state.isItineraryCloned = false;
            state.isItineraryClonedError = false;
            state.hiredError = false;
            state.hiredSuccess = false;
            return state;
        },
        clearDelete: (state) => {
            state.isDeleted = false;
            state.isError = false;
            return state;
        },
        clearAdded: (state) => {
            state.addedSuccess = false;
            state.addedError = false;
        },
        clearPassengerDeleted: (state) => {
            state.isPassengerDeletedSuccess = false;
            state.isPassengerDeletedError = false;
        },
        clearDocumentDeleted: (state) => {
            state.isDocumentDeletedSuccess = false;
            state.isDocumentDeletedError = false;
        },
        clearItineraryUpdated: (state) => {
            state.isItineraryUpdated = false;
            state.isItineraryUpdatedError = false;
        },
        clearItineraryStatusUpdated: (state) => {
            state.isItineraryStatusUpdated = false;
            state.isItineraryStatusUpdatedError = false;
        },
        clearItineraryDocumentAdded: (state) => {
            state.isItineraryDocumentAdded = false;
            state.isItineraryDocumentAddedError = false;
        },
        clearItineraryTaskAdded: (state) => {
            state.isItineraryTaskAdded = false;
            state.isItineraryTaskAddedError = false;
        },
        clearItineraryTaskMarked: (state) => {
            state.isItineraryTaskMarked = false;
            state.isItineraryTaskMarkedError = false;
        },
        clearItineraryBookingImported: (state) => {
            state.isItineraryBookingImported = false;
            state.isItineraryBookingImportedError = false;
        },
        clearItineraryCloned: (state) => {
            state.isItineraryCloned = false;
            state.isItineraryClonedError = false;
        },
        clearItineraryPassengersSuccess: (state) => {
            state.itineraryPassengersIsSuccess = false;
        },
        clearItineraryBookingPositionFlags: (state) => {
            state.isItineraryBookingPositionSuccess = false;
            state.isItineraryBookingPositionError = false;
        },
        clearAdvisorPayUsingStoredPaymentFlags: (state) => {
            state.isPayUsingStoredPaymentSuccess = false;
            state.isPayUsingStoredPaymentError = false;
        },
        clearAdvisorApplyDiscountFlags: (state) => {
            state.isApplyDiscountSuccess = false;
            state.isApplyDiscountError = false;
        },
        clearStripeKey: (state) => {
            state.stripeKey = null;
            state.clientSecret = null;
        },
        clearAdvisorId: (state) => {
            state.advisorRequestId = null;
            state.advisorRequestType = null;
            state.advisorRequestPaymentMethod = 0;
            state.concierge = null;
            state.isHiring = false;
            state.hiredSuccess = false;
            state.hiredError = false;
            state.advisorRequestDiscounted = null;
        },
    },
    extraReducers: {
        //Update itinerary booking position
        [updateItineraryBookingPosition.fulfilled]: (state, {payload}) => {
            state.isItineraryBookingPositionSuccess = true;
            state.packedItinerary = camelizeNestedKeys(payload.data);
            state.errorMessage = null;
        },
        [updateItineraryBookingPosition.rejected]: (state, {payload}) => {
            state.isItineraryBookingPositionError = true;
            state.errorMessage = payload?.data;
        },
        // Fetch packed itinerary
        [fetchPackedItinerary.fulfilled]: (state, {payload}) => {
            state.packedItinerary = camelizeNestedKeys(payload.data);
            state.isFetching = false;
        },
        [fetchPackedItinerary.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchPackedItinerary.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        // Fetch itinerary
        [fetchItineraries.fulfilled]: (state, {payload}) => {
            state.itineraries = camelizeNestedKeys(payload.data);
            state.isFetching = false;
        },
        [fetchItineraries.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchItineraries.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        [addItinerary.fulfilled]: (state, {payload}) => {
            state.itinerary = camelizeNestedKeys(payload.data);
            state.itineraryId = payload.data.id;
            state.isFetching = false;
            state.addedSuccess = true;
            state.errorMessage = null;
        },
        [addItinerary.pending]: (state) => {
            state.isFetching = true;
        },
        [addItinerary.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.addedError = true;
            state.errorMessage = payload?.data;
        },
        [advisorRequestsHire.fulfilled]: (state, {payload}) => {
            state.advisorRequest = camelizeNestedKeys(payload.data);
            state.advisorRequestId = payload.data.id;
            state.isHiring = false;
            state.hiredSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsHire.pending]: (state) => {
            state.isHiring = true;
        },
        [advisorRequestsHire.rejected]: (state, {payload}) => {
            state.isHiring = false;
            state.hiredError = true;
            state.errorMessage = payload?.data;
        },
        [advisorRequestsGetConcierges.fulfilled]: (state, {payload}) => {
            state.concierges = camelizeNestedKeys(payload.data);
            state.getConciergesSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsGetConcierges.rejected]: (state, {payload}) => {
            state.getConciergesError = true;
            state.errorMessage = payload?.data;
        },
        [advisorRequestsGetNotifications.fulfilled]: (state, {payload}) => {
            state.notifications = payload.data.notifications;
            state.getNotificationsSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsGetNotifications.rejected]: (state, {payload}) => {
            state.getNotificationsError = true;
            state.errorMessage = payload?.data;
        },
        [advisorRequestsGetTopConcierges.fulfilled]: (state, {payload}) => {
            state.topConcierges = camelizeNestedKeys(payload.data);
            state.getTopConciergesSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsGetTopConcierges.rejected]: (state, {payload}) => {
            state.getTopConciergesError = true;
            state.errorMessage = payload?.data;
        },
        [advisorRequestsGetRecentRequests.fulfilled]: (state, {payload}) => {
            state.recentRequests = camelizeNestedKeys(payload.data);
            state.getRecentRequestsSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsGetRecentRequests.rejected]: (state, {payload}) => {
            state.getRecentRequestsError = true;
            state.errorMessage = payload?.data;
        },
        [getPaymentMethods.fulfilled]: (state, {payload}) => {
            state.paymentMethods = camelizeNestedKeys(payload.data);
            state.getPaymentMethodsSuccess = true;
            state.errorMessage = null;
        },
        [getPaymentMethods.rejected]: (state, {payload}) => {
            state.getPaymentMethodsError = true;
            state.errorMessage = payload?.data;
        },
        [advisorRequestsPayUsingIntent.fulfilled]: (state, {payload}) => {
            state.clientSecret = payload.data.clientSecret;
            state.stripeKey = payload.data.stripe_key;
            state.isPayUsingIntentSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsPayUsingIntent.rejected]: (state, {payload}) => {
            state.isPayUsingIntentError = true;
            state.errorMessage = payload?.data;
        },
        [advisorRequestsApplyDiscount.fulfilled]: (state, {payload}) => {
            state.advisorRequestDiscounted = camelizeNestedKeys(payload.data);
            state.isApplyDiscountSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsApplyDiscount.rejected]: (state, {payload}) => {
            state.isApplyDiscountError = true;
            state.errorMessage = payload?.data;
        },
        [advisorRequestsPayUsingStoredPayment.fulfilled]: (state, {payload}) => {
            state.paidRequestsInfo = payload.data;
            state.isPayUsingStoredPaymentSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsPayUsingStoredPayment.rejected]: (state, {payload}) => {
            state.isPayUsingStoredPaymentError = true;
            state.errorMessage = payload?.data;
        },
    
        [advisorRequestsCompleteIntentPayment.fulfilled]: (state, {payload}) => {
            state.advisorRequestCompletePaymentResponse = camelizeNestedKeys(payload.data);
            state.isPayUsingIntentSuccess = true;
            state.errorMessage = null;
        },
        [advisorRequestsCompleteIntentPayment.rejected]: (state, {payload}) => {
            state.isPayUsingIntentError = true;
            state.errorMessage = payload?.data;
        },
        [deleteItinerary.fulfilled]: (state) => {
            state.isDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteItinerary.rejected]: (state, {payload}) => {
            state.isDeletedError = false
            state.errorMessage = payload?.data;
        },
        [deleteItineraryPassenger.fulfilled]: (state) => {
            state.isPassengerDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteItineraryPassenger.rejected]: (state, {payload}) => {
            state.isPassengerDeletedError = true
            state.errorMessage = payload?.data;
        },
        [deleteItineraryDocument.fulfilled]: (state) => {
            state.isDocumentDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteItineraryDocument.rejected]: (state, {payload}) => {
            state.isDocumentDeletedError = true
            state.errorMessage = payload?.data;
        },
        [fetchItinerary.fulfilled]: (state, {payload}) => {
            state.itinerary = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
        },
        [fetchItinerary.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchItinerary.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        [fetchSharedItinerary.fulfilled]: (state, {payload}) => {
            state.itinerary = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
        },
        [fetchSharedItinerary.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchSharedItinerary.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        [getItineraryPassengers.fulfilled]: (state, {payload}) => {
            state.passengers = camelizeNestedKeys(payload.data);
            state.itineraryPassengersIsFetching = false;
            state.itineraryPassengersIsSuccess = true;
        },
        [getItineraryPassengers.pending]: (state) => {
            state.itineraryPassengersIsFetching = true;
        },
        [getItineraryPassengers.rejected]: (state) => {
            state.itineraryPassengersIsFetching = false;
        },
        [getPropertyDesigns.fulfilled]: (state, {payload}) => {
            state.propertyDesigns = camelizeNestedKeys(payload.data);
            state.propertyDesignsIsFetching = false;
            state.propertyDesignsIsSuccess = true;
        },
        [getPropertyDesigns.pending]: (state) => {
            state.propertyDesignsIsFetching = true;
        },
        [getPropertyDesigns.rejected]: (state) => {
            state.propertyDesignsIsFetching = false;
        },
        [addItineraryPassenger.fulfilled]: (state) => {
            state.isItineraryUpdated = true;
            state.isItineraryUpdatedError = false;
        },
        [addItineraryPassenger.rejected]: (state, {payload}) => {
            state.isItineraryUpdated = false;
            state.isItineraryUpdatedError = true;
            state.errorMessage = payload?.data;
        },
        [updateItineraryAbstract.fulfilled]: (state) => {
            state.isItineraryUpdated = true;
            state.isItineraryUpdatedError = false;
        },
        [updateItineraryAbstract.rejected]: (state, {payload}) => {
            state.isItineraryUpdated = false;
            state.errorMessage = payload?.data;
            state.isItineraryUpdatedError = true;
        },
        [updateItineraryInformation.fulfilled]: (state) => {
            state.isItineraryUpdated = true;
            state.isItineraryUpdatedError = false;
        },
        [updateItineraryInformation.rejected]: (state, {payload}) => {
            state.isItineraryUpdated = false;
            state.errorMessage = payload?.data;
            state.isItineraryUpdatedError = true;
        },
        [setItineraryStatus.fulfilled]: (state, {payload}) => {
            state.packedItinerary.markAsClientApproved = payload.data.mark_as_client_approved;
            state.isItineraryStatusUpdated = true;
            state.isItineraryStatusUpdatedError = false;
        },
        [setItineraryStatus.rejected]: (state, {payload}) => {
            state.isItineraryStatusUpdated = false;
            state.errorMessage = payload?.data;
            state.isItineraryStatusUpdatedError = true;
        },
        [addItineraryDocument.fulfilled]: (state, {payload}) => {
            state.packedItinerary.documents = payload.data.map(document => document.document_url)
            state.isUploadingDocument = false;
            state.isItineraryDocumentAdded = true;
            state.isItineraryDocumentAddedError = false;
        },
        [addItineraryDocument.rejected]: (state, {payload}) => {
            state.isItineraryDocumentAdded = false;
            state.isUploadingDocument = false;
            state.errorMessage = payload?.data;
            state.isItineraryDocumentAddedError = true;
        },
        [addItineraryDocument.pending]: (state) => {
            state.isUploadingDocument = true;
        },
        [addItineraryTask.fulfilled]: (state, {payload}) => {
            state.isItineraryTaskAdded = true;
            state.isItineraryTaskAddedError = false;
        },
        [addItineraryTask.rejected]: (state, {payload}) => {
            state.isItineraryTaskAdded = false;
            state.errorMessage = payload?.data;
            state.isItineraryTaskAddedError = true;
        },
        [markItineraryTaskCompleted.fulfilled]: (state, {payload}) => {
            state.isItineraryTaskMarked = true;
            state.isItineraryTaskMarkedError = false;
        },
        [markItineraryTaskCompleted.rejected]: (state, {payload}) => {
            state.isItineraryTaskMarked = false;
            state.errorMessage = payload?.data;
            state.isItineraryTaskMarkedError = true;
        },
        [importBooking.fulfilled]: (state) => {
            state.isItineraryBookingImported = true;
            state.isItineraryBookingImportedError = false;
        },
        [importBooking.rejected]: (state, {payload}) => {
            state.isItineraryBookingImported = false;
            state.errorMessage = payload?.data;
            state.isItineraryBookingImportedError = true;
        },
        [cloneItineraryInformation.fulfilled]: (state, {payload}) => {
            // if (state.itineraries) {
            //     console.log(current(state.itineraries))
            //     state.itineraries = {
            //         ...state.itineraries,
            //         data: [
            //             ...state.itineraries.data,
            //             ...[camelizeNestedKeys(payload.data)]
            //         ],
            //         recordsFiltered: state.itineraries.recordFilterd + 1,
            //         recordsTotal: state.itineraries.recordsTotal + 1
            //     };
            // } else {
            //     state.itineraries = [camelizeNestedKeys(payload.data)]
            // }
            state.isItineraryCloned = true;
            state.isItineraryClonedError = false;
        },
        [cloneItineraryInformation.rejected]: (state, {payload}) => {
            state.isItineraryCloned = false;
            state.errorMessage = payload?.data;
            state.isItineraryClonedError = true;
        },
        [updateItineraryPassenger.fulfilled]: (state) => {
            state.isItineraryUpdated = true;
            state.isItineraryUpdatedError = false;
        },
        [updateItineraryPassenger.rejected]: (state, {payload}) => {
            state.isItineraryUpdated = false;
            state.isItineraryUpdatedError = true;
            state.errorMessage = payload?.data;
        },
    }
});

export const {
    clearState,
    clearDelete,
    setPage,
    setStart,
    setTravelerProfileExpanded,
    setBookings,
    clearItineraryBookingPositionFlags,
    setItineraryId,
    setAdvisorRequestType,
    setAdvisorRequestPaymentMethod,
    clearAdvisorApplyDiscountFlags,
    setDefaultStripeTokenId,
    setConcierge,
    clearPassengerDeleted,
    clearDocumentDeleted,
    clearItineraryPassengersSuccess,
    clearItineraryUpdated,
    clearItineraryDocumentAdded,
    clearItineraryTaskAdded,
    clearItineraryBookingImported,    
    clearItineraryCloned,
    clearShareCode,
    clearAdvisorPayUsingStoredPaymentFlags,
    clearStripeKey,
    clearAdvisorId
} = itinerariesSlice.actions;

export const itinerariesSelector = (state) => state.itinerary;
export const itineraryPassengersSelector = (state) => state.itinerary.passengers;

export default itinerariesSlice.reducer;
