import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword'

import History from './pages/user/History';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';

import CategoryCreate from './pages/admin/category/CategoryCreate';

// implement protected Routes:
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';

import UserNav from './components/nav/UserNav';
// import Main from './pages/test/Main';


import React, { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';

import { currentUser } from './components/functions/auth';


import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RegisterComplete from './pages/auth/RegisterComplete';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        // console.log('user from useEffect', user)
        // dispatch({
        //   type: 'LOGGED_IN_USER',
        //   payload: {
        //     email: user.email,
        //     token: idTokenResult.token
        //   }
        // })
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch(err => console.log(err));

      }
    })
    // cleanUp
    return () => unsubcribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <>
        {/* <RegisterComplete /> */}
        <Header />
        <ToastContainer />

        <Routes>
          <Route path="/test" element={<UserNav />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/complete" element={<RegisterComplete />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          {/* <UserRoute path="/user/history" element={<History />} /> */}
          {/* private Route : protected Routes */}
          {/* can access this routes only if you are logged in: if not would navigte to login page */}
          <Route element={<UserRoute />}>
            <Route path='/user/history' element={<History />} />
            <Route path='/user/password' element={<Password />} />
            <Route path='/user/wishlist' element={<Wishlist />} />

          </Route>
          {/* Protected Route For Admin */}
          <Route element={<AdminRoute />}>
            <Route path='/admin/dashboard' element={< AdminDashboard />} />
            <Route path='/admin/category' element={< CategoryCreate />} />
          </Route>

        </Routes>

      </>

    </BrowserRouter>
  );
}

export default App;


//subscriber