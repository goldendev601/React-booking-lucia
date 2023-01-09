import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "api/axios";
import {
    GET_PROFILE,
    UPDATE_PROFILE,
    UPDATE_ITINERARY_DESIGN,
    UPDATE_PROFILE_PASSWORD,
    BEGIN_GOOGLE_AUTH,
    GENERATE_CARD_TOKEN,
    ADD_PAYMENT_METHOD,    
    GET_SUBSCRIPTION_PRICES,
    SUBSCRIBE,
    CHECKOUT,
    BILLING_PORTAL
} from "api/api";
import {camelizeNestedKeys} from "utils";

const initialState = {
    profileUser: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    status: null,
    errorMessage: null,
    message: null,
    googleAuthUrl: null,
    cardToken: null,
    addPaymentMethodSuccess: false,
    subscriptionPrices: null,
    redirectUrl: null,
    billingPortalredirectUrl: null
};

export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (formData, thunkAPI) => {
        try {
            return await axios.post(UPDATE_PROFILE, formData, {headers: { "Content-Type": "multipart/form-data" }});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateItineraryDesign = createAsyncThunk(
    'profile/updateItineraryDesign',
    async (formData, thunkAPI) => {
        try {
            return await axios.post(UPDATE_ITINERARY_DESIGN, formData, {headers: { "Content-Type": "multipart/form-data" }});
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updatePassword = createAsyncThunk(
    'profile/updatePassword',
    async (formData, thunkAPI) => {
        try {
            return await axios.post(UPDATE_PROFILE_PASSWORD, formData);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async (_, thunkAPI) => {
        try {
            return await axios.get(GET_PROFILE);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const beginGoogleAuth = createAsyncThunk(
    'profile/beginGoogleAuth',
    async (_, thunkAPI) => {
        try {
            return await axios.post(BEGIN_GOOGLE_AUTH, {
                redirect_url: process.env.REACT_APP_DOMAIN_URL
            });
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
)

export const generateCardToken = createAsyncThunk(
    'profile/generateCardToken',
    async (data, thunkAPI) => {
        try {
            return await axios.post(GENERATE_CARD_TOKEN, data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
)

export const subscribe = createAsyncThunk(
    'profile/subscribe',
    async (data, thunkAPI) => {
        try {
            return await axios.post(SUBSCRIBE, data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
)

export const getSubscriptionPrices = createAsyncThunk(
    'profile/getSubscriptionPrices',
    async (data, thunkAPI) => {
        try {
            return await axios.get(GET_SUBSCRIPTION_PRICES);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
)

export const addPaymentMethod = createAsyncThunk(
    'profile/addPaymentMethod',
    async (data, thunkAPI) => {
        try {
            return await axios.post(ADD_PAYMENT_METHOD, data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
)

export const checkout = createAsyncThunk(
    'profile/checkout',
    async (data, thunkAPI) => {
        try {
            return await axios.post(CHECKOUT, data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
)

export const billingPortal = createAsyncThunk(
    'profile/billingPortal',
    async (data, thunkAPI) => {
        try {
            return await axios.post(BILLING_PORTAL, data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.redirectUrl = null;
            state.billingPortalredirectUrl = null;
            return state;
        },
        updateProfileState: (state, key, value) => {
            state.profileUser[key] = value;
            return state;
        },
    },
    extraReducers: {
        [updateProfile.fulfilled]: (state, {payload}) => {
            state.user = payload.data;
            state.isFetching = false;
            state.isSuccess = true;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [updateProfile.pending]: (state) => {
            state.isFetching = true;
        },
        [updateProfile.rejected]: (state, payload) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;
        },
        [updateItineraryDesign.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [updateItineraryDesign.pending]: (state) => {
            state.isFetching = true;
        },
        [updateItineraryDesign.rejected]: (state, payload) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;
        },
        [updatePassword.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [updatePassword.pending]: (state) => {
            state.isFetching = true;
        },
        [updatePassword.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;
        },
        [getProfile.fulfilled]: (state, {payload}) => {
            state.profileUser = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [getProfile.pending]: (state) => {
            state.isFetching = true;
        },
        [getProfile.rejected]: (state, payload) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;
        },
        [beginGoogleAuth.fulfilled]: (state, {payload}) => {
            state.googleAuthUrl = payload.data.url;
            state.isFetching = false;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [beginGoogleAuth.rejected]: (state, payload) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;
        },
        [generateCardToken.fulfilled]: (state, {payload}) => {
            state.cardToken = payload.data.card_token;
            state.isFetching = false;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [generateCardToken.pending]: (state) => {
            state.isFetching = true;
        },
        [generateCardToken.rejected]: (state, payload) => {
            state.cardToken = null;
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;
        },
        [subscribe.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [subscribe.pending]: (state) => {
            state.isFetching = true;
        },
        [subscribe.rejected]: (state, payload) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.payload;            
        },
        [addPaymentMethod.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.status = payload.status;
            state.errorMessage = null;
            state.addPaymentMethodSuccess = true;            
        },
        [addPaymentMethod.pending]: (state) => {
            state.isFetching = true;
        },
        [addPaymentMethod.rejected]: (state, payload) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;            
        },
        [checkout.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.status = payload.status;
            state.errorMessage = null;
            state.redirectUrl = payload.data.url;
        },
        [checkout.pending]: (state) => {
            state.isFetching = true;
        },
        [checkout.rejected]: (state, payload) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;            
        },
        [billingPortal.fulfilled]: (state, {payload}) => {
            // state.isFetching = false;
            state.status = payload.status;
            state.errorMessage = null;
            state.billingPortalredirectUrl = payload.data.url;
            state.isSuccess = true;
        },
        [billingPortal.pending]: (state) => {
            // state.isFetching = true;
        },
        [billingPortal.rejected]: (state, payload) => {
            // state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;            
        },
        [getSubscriptionPrices.fulfilled]: (state, {payload}) => {
            state.subscriptionPrices = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.status = payload.status;
            state.errorMessage = null;
        },
        [getSubscriptionPrices.pending]: (state) => {
            state.isFetching = true;
        },
        [getSubscriptionPrices.rejected]: (state, payload) => {
            state.isFetching = false;
            state.isError = true;
            state.status = payload.status;
            state.errorMessage = payload.data;
        }
    }
});

export const {clearState, updateProfileState} = profileSlice.actions;

export const profileSelector = (state) => state.profile;

export default profileSlice.reducer;