import React, {useEffect} from 'react';
import './App.css';
import 'aos/dist/aos.css';
import {BrowserRouter, useHistory} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import SnackbarProvider, {useSnackbar} from 'react-simple-snackbar';
import ROUTES, {RenderRoutes} from "./routes/routes";
import {theme} from "styles";
import AOS from 'aos';
import axios from "./api/axios";
import {resetAction, store} from "./index";
import {useDispatch} from "react-redux";
import {error} from "./styles/snackbarStyles/snackbarStyles";
import BookingMasterForm from "./pages/Itinerary/CreateItinerary/Categories/BookingMasterForm";
import ScrollHandler from "./components/ScrollHandler/ScrollHandler";
import PictureUpload from "./@core/components/PictureUpload/PictureUpload";
import RoomPictureUpload from "./@core/components/RoomPictureUpload/PictureUpload";

const UnauthorizedWrapper = ({children}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [openSnackbarError] = useSnackbar(error);

    axios.interceptors.response.use((response) => response, (error) => {
        if (error.response.status === 401) {
            openSnackbarError('Your session has expired. You will be redirected to the login page.');
            dispatch(resetAction());
            history.push('/signin');
            const errorResponse401 = {
                response: {
                    payload: {
                        status: 401,
                        data: ['Unauthorized']
                    }
                }
            }
            return Promise.reject(errorResponse401);
        }

        return Promise.reject(error);
    });

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

function App() {
    useEffect(() => {
        AOS.init({
            disable: false,
            startEvent: 'DOMContentLoaded',
            initClassName: 'aos-init',
            animatedClassName: 'aos-animate',
            useClassNames: false,
            disableMutationObserver: false,
            debounceDelay: 50,
            throttleDelay: 99,
            offset: 120,
            delay: 0,
            duration: 400,
            easing: 'ease',
            once: false,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });
    }, []);

    axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${store.getState().auth.accessToken}`
        return config;
    });

    return (
        <SnackbarProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <UnauthorizedWrapper>
                        <PictureUpload/>
                        <RoomPictureUpload/>
                        <ScrollHandler/>
                        <RenderRoutes routes={ROUTES}/>
                        <BookingMasterForm/>
                    </UnauthorizedWrapper>
                </BrowserRouter>
            </ThemeProvider>
        </SnackbarProvider>
    );
}

export default App;
