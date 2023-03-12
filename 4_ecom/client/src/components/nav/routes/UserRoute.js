// to create protected routes : react router dom redirects(!auth)
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.

import React from 'react'
//Route changes to Outlet and lint to Navigate
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './LoadingToRedirect';


// children props implies whatever passed to this route:  ...rest rest of the props
const UserRoute = () => {
    const { user } = useSelector((state) => ({ ...state }));
    return user && user.token ? <Outlet /> : <LoadingToRedirect />
    // return user && user.token ? <Outlet /> : <Navigate to="/login" />
    // return user && user.token ? <Route {...rest} render={() => children} /> : (<h1 className='bg-red-400'>Loading...</h1>)
}

export default UserRoute;