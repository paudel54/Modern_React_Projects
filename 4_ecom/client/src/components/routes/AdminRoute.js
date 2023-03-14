
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentAdmin } from '../functions/auth'
import { Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then(res => {
                    console.log('Current admin response', res);
                    setOk(true);
                })
                .catch(err => {
                    console.log('ADMIN ROUTE ERROR', err);
                    setOk(false);
                });
        }
    }, [user])
    //here outlet imples go to the directed nested  route defined onto myapp comp
    return ok ? <Outlet /> : <LoadingToRedirect />
}

export default AdminRoute
