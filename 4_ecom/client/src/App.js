import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import SideDrawer from './components/drawer/SideDrawer';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword'

import History from './pages/user/History';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';

import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import ProductCreate from './pages/admin/product/ProductCreate';
import AllProducts from './pages/admin/product/AllProducts';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import Product from './pages/Product';
import CategoryHome from './pages/category/CategoryHome';
import SubHome from './pages/sub/SubHome';
import Shop from './pages/Shop';

import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CreateCouponPage from './pages/coupon/CreateCouponPage';

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
// import { PresetColors } from 'antd/es/theme/internal';
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
        {/* adding component sidebar so it's accessibale form anywhere */}
        <SideDrawer />
        <ToastContainer />

        <Routes>
          {/* Normal Route Path */}
          <Route path="/test" element={<UserNav />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/complete" element={<RegisterComplete />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/category/:slug" element={<CategoryHome />} />
          <Route path="/sub/:slug" element={<SubHome />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          {/* <UserRoute path="/user/history" element={<History />} /> */}
          {/* private Route : protected Routes */}
          {/* can access this routes only if you are logged in: if not would navigte to login page */}
          <Route element={<UserRoute />}>
            <Route path='/user/history' element={<History />} />
            <Route path='/user/password' element={<Password />} />
            <Route path='/user/wishlist' element={<Wishlist />} />
            <Route path='/checkout' element={<Checkout />} />
          </Route>
          {/* Protected Route For Admin */}
          <Route element={<AdminRoute />}>
            <Route path='/admin/dashboard' element={< AdminDashboard />} />
            <Route path='/admin/category' element={< CategoryCreate />} />
            <Route path="/admin/category/:slug" element={< CategoryUpdate />} />
            <Route path="/admin/sub/:slug" element={< SubUpdate />} />
            <Route path="/admin/sub" element={< SubCreate />} />
            <Route path="admin/products" element={<AllProducts />} />
            <Route path="admin/product" element={<ProductCreate />} />
            <Route path="admin/coupon" element={<CreateCouponPage />} />
            <Route path="admin/product/:slug" element={<ProductUpdate />} />
          </Route>

        </Routes>

      </>

    </BrowserRouter>
  );
}

export default App;


//subscriber