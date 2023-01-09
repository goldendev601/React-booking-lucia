import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {CssBaseline} from "@material-ui/core";
import './index.css';
import "antd/lib/button/style/css";
import "antd/lib/date-picker/style/css";
import 'rsuite/dist/styles/rsuite-default.css';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';
import {combineReducers, configureStore, createAction} from '@reduxjs/toolkit'
import authSlice from "redux/features/auth/authSlice";
import recoverySlice from "./redux/features/auth/recoverySlice";
import itinerariesSlice from "./redux/features/itineraries/itinerariesSlice";
import travelersSlice from 'redux/features/travelers/travelersSlice';
import profileSlice from "./redux/features/profile/profileSlice";
import itineraryMultiFormSlice from "./redux/features/dialogForms/itineraryFormSlice";
import bookingFormSlice from "./redux/features/dialogForms/bookingFormSlice";
import dialogFormsOpenStateSlice from "./redux/features/dialogForms/dialogFormsOpenStateSlice";
import alertDialogSlice from "./redux/features/dialogForms/alertDialogSlice";
import {createFilter} from "redux-persist-transform-filter";
import otherSlice from "./redux/features/itineraries/bookings/otherSlice";
import bookingsSlice from "./redux/features/itineraries/bookings/bookingsSlice";
import calendarSlice from "./redux/features/calendar/calendarSlice";
import shareCodeSlice from "./redux/features/shareCode/shareCodeSlice";
import suppliersSlice from "./redux/features/suppliers/suppliersSlice";
import picturesSlice from "./redux/features/pictures/picturesSlice";
import globalSearchSlice from "./redux/features/globalSearch/globalSearchSlice";
import constantsSlice from "./redux/features/constants/constantsSlice";
import roomsSlice from "./redux/features/rooms/roomsSlice";
import flightsSlice from "./redux/features/flights/flightsSlice";
import requestSlice from "./redux/features/request/requestSlice";
import noteSlice from "./redux/features/notes/notesSlice";

const authBlackList = createFilter(
    'auth',
    null,
    ['user', 'accessToken']
);

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['dialogFormsOpenState', 'pictures', 'suppliers'],
    transforms: [authBlackList],
}

const rootReducer = combineReducers({
    auth: authSlice,
    recovery: recoverySlice,
    calendar: calendarSlice,
    pictures: picturesSlice,
    rooms: roomsSlice,
    globalSearch: globalSearchSlice,
    itinerary: itinerariesSlice,
    traveler: travelersSlice,
    suppliers: suppliersSlice,
    profile: profileSlice,
    itineraryForm: itineraryMultiFormSlice,
    bookingForm: bookingFormSlice,
    dialogFormsOpenState: dialogFormsOpenStateSlice,
    alertDialogs: alertDialogSlice,
    shareCode: shareCodeSlice,
    bookings: bookingsSlice,
    other: otherSlice,
    constants: constantsSlice,
    flights: flightsSlice,
    requests: requestSlice,
    noteInfo: noteSlice
});

export const resetAction = createAction('reset')

const resettableReducer = (state, action) => {
    if (resetAction.match(action)) {
        return rootReducer(undefined, action)
    }
    return rootReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, resettableReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});

export let persistor = persistStore(store);

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
