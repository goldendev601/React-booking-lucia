import React, {useEffect} from "react";
import AccessCode from "pages/Auth/AccessCode/AccessCode";
import SignIn from "../pages/Auth/SignIn/SignIn";
import MainRecoveryForm from "../pages/Auth/MainRecoveryForm/MainRecoveryForm";
import SignUp from "../pages/Auth/SignUp/SignUp";
import Terms from "../pages/Auth/SignUp/Terms";
import {ItinerariesDashboard, SuppliersDashboard, TravelersDashboard, NotesDashboard} from "../components";
import CalendarView from "../pages/Calendar/CalendarView/CalendarView";
import HomeView from "../pages/Home/HomeView/HomeView";
import ConciergesView from "../pages/Concierges/ConciergesView/ConciergesView";
import ItineraryView from "../pages/Itinerary/PublicItinerary/ItineraryView";
import Route from "components/RouteWrapper/RouteWrapper";
import {Switch, useHistory, useLocation, useParams} from "react-router-dom";
import ItineraryDetails from "../pages/Itinerary/ItineraryDetails/ItineraryDetails";
import {SubscriptionDashboard} from '../pages/SubscriptionDashboard';
import { MyRequest } from "../pages/MyRequest";
import { RateMyCopilot } from "../pages/MyRequest";
import {useDispatch, useSelector} from "react-redux";
import {clearState, impersonate, userSelector} from "../redux/features/auth/authSlice";
import {error, success} from "../styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import {createErrorMessage} from "../utils";

const ROUTES = [
    {path: "/", exact: true, isPrivate: true, component: () => <HomeView/>},
    {path: "/access-code", exact: true, component: () => <AccessCode/>}, 
    {path: "/signin", exact: true, component: () => <SignIn/>},    
    {path: "/recovery", exact: true, component: () => <MainRecoveryForm/>},
    {path: "/signup", exact: true, component: () => <SignUp/>},
    {path: "/terms-conditions", exact: true, component: () => <Terms/>},
    {path: "/advisor-requests", exact: true, isPrivate: true, component: () => <MyRequest/>},
    {path: "/concierges", exact: true, isPrivate: true, component: () => <ConciergesView/>},
    {path: "/subscription", exact: true, isPrivate: true, component: () => <SubscriptionDashboard/>},
    {path: "/itineraries", exact: true, isPrivate: true, component: () => <ItinerariesDashboard/>},
    {path: "/suppliers", exact: true, isPrivate: true, component: () => <SuppliersDashboard/>},
    {path: "/notes", exact: true, isPrivate: true, component: () => <NotesDashboard/>},
    {path: "/travelers", exact: true, isPrivate: true, component: () => <TravelersDashboard/>},
    {path: "/calendar", exact: true, isPrivate: true, component: () => <CalendarView/>},
    {path: "/public/itinerary/:id", exact: true, component: () => <ItineraryView/>},
    {path: "/rate-my-copilot/:id", exact: true, component: () => <RateMyCopilot/>},
    {path: "/itinerary-details/:id", exact: true, component: () => <ItineraryDetails/>},
    {path: "/auth/impersonate/:impersonateToken", exact: true, component: () => <Impersonate/>},
];

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Impersonate = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const {impersonateIsSuccess, impersonateIsError, errorMessage} = useSelector(userSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const {impersonateToken} = useParams();
    const redirectPath = query.get("redirect");

    useEffect(() => {
        if (impersonateToken) {
            dispatch(impersonate(impersonateToken));
        }
    }, [dispatch, history, impersonateToken, redirectPath]);

    useEffect(() => {
        if (impersonateIsSuccess) {
            openSnackbarSuccess('Impersonate is successfully completed');
            dispatch(clearState());
            if (redirectPath) {
                history.push(redirectPath);
            } else {
                history.push('/');
            }
        }
        if (impersonateIsError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
            history.push('/');
        }
    }, [errorMessage, impersonateIsError, impersonateIsSuccess, openSnackbarError, openSnackbarSuccess, redirectPath]);

    return null;
}

export const RenderRoutes = ({routes}) => {
    return (
        <Switch>
            {routes.map((route, i) => {
                return <Route key={i} {...route} />;
            })}
        </Switch>
    );
}

export default ROUTES;
