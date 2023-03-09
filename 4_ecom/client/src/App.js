import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword'


import React, { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';



import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RegisterComplete from './pages/auth/RegisterComplete';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        // console.log('user from useEffect', user)
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })

      }
    })
    // cleanUp
    return () => unsubcribe();
  }, []);

  return (
    <BrowserRouter>
      <>
        {/* <RegisterComplete /> */}
        <Header />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/complete" element={<RegisterComplete />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
        </Routes>

      </>

    </BrowserRouter>
  );
}

export default App;
