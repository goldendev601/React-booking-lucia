import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout";
import HomeLayout from "../Layouts/HomeLayout";
import NotAuthorizedLayout from "../Layouts/NotAuthorizedLayout";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/features/auth/authSlice";
import { profileSelector, checkout, getProfile, clearState } from "redux/features/profile/profileSlice";
import { CircularProgress, Grid } from "@material-ui/core";



export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const { user, isFetching } = useSelector(userSelector);
    const { redirectUrl, profileUser } = useSelector(profileSelector);
    const dispatch = useDispatch();
    const redirect_url = process.env.REACT_APP_DOMAIN_URL + '/';
    const forceLicenseCheck = process.env.REACT_APP_FORCE_LICENSE_CHECK;

    useEffect(() => {
        dispatch(getProfile);
    })

    useEffect(() => {
        if (redirectUrl) {
            dispatch(clearState());
            window.location.href = redirectUrl
        }
    }, [redirectUrl])

    useEffect(() => {

        if (forceLicenseCheck === 'TRUE') {
            // if (user && !user.hasValidLicense && rest.path !== '/subscription') {
            if (profileUser && !profileUser.hasValidLicense) {
                const data = {
                    subscription_price_id: 1,
                    redirect_url: redirect_url
                }
                dispatch(checkout(data));
                // return <Redirect to="/subscription"/>;
            }

            if (profileUser && profileUser.hasValidLicense && rest.path === '/subscription') {
                return <Redirect to="/" />;
            }
        }

    }, [profileUser])


    

    // if (accessCodeMessage !== 'passed' && rest.path === '/signup') {
    //     return <Redirect to="/access-code" />;
    // }

    // if (accessCodeMessage === 'passed' && rest.path === '/access-code') {
    //     return <Redirect to="/signup" />;
    // }

    if (isPrivate && !user) {
        return <Redirect to="/signin" />;
    }

    var Layout = null;

    if (user) {
        if (rest.path === '/') {
            Layout = HomeLayout;
        } else {
            Layout = DefaultLayout;
        }
    } else {
        Layout = NotAuthorizedLayout;
    }

    // const Layout = (user) ? DefaultLayout : NotAuthorizedLayout;

    return (
        <Route
            {...rest}
            render={props => (
                <React.Fragment>
                    {isFetching
                        ? <Grid
                            container
                            justify="center"
                            alignItems="center"
                            style={{ height: '100vh' }}
                        >
                            <CircularProgress />
                        </Grid>
                        : <Layout>
                            <Component {...props} />
                        </Layout>
                    }
                </React.Fragment>
            )}
        />
    );
}
