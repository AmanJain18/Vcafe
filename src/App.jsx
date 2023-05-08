import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Toaster, toast } from 'react-hot-toast'
import { Header, Footer } from './components'
import { HomePage } from './pages'
import SignInPage from './pages/signin/SignInPage'
import SignUpPage from './pages/signup/SignUpPage'
import AboutUs from './pages/aboutUs/AboutUs'
import ContactUs from './pages/contactUs/ContactUs'
import Cart from './pages/cart/Cart'
import { fetchData, authApi } from './utils/api'
import { getProducts, getCategories } from './store/homePageSlice'
import Menus from './pages/menupage/Menus'
import PageNotFound from './pages/pnf/PageNotFound'
import { isValid } from './store/authSlice'
import { PaymentFailed, PaymentSuccess } from './pages/payments/Pageref'
import ScrollToTop from './components/ScrollToTop'
import OrderPage from './pages/myOrder/OrderPage'
import ProtectedRoutes from './components/protected/ProtectedRoute'

function App () {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  // const { products, categories } = useSelector((state) => state.homepage);
  // const navigate = useNavigate();

  const authuser = async () => {
    let token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await authApi.get('/me');
        if (res) {
          res.data.user.role === 'admin' ? dispatch(isValid({ valid: true, data: res.data.user, isAdmin: true })) :
            dispatch(isValid({ valid: true, data: res.data.user, isAdmin: false }));
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
          // console.log(error.response.data.error);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.message);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('cartItems');
        dispatch(isValid({ valid: false, data: null }));
        window.location.reload();
      }

    } else {
      dispatch(isValid({ valid: false, data: null }));
    }
  }

  useEffect(() => {
    datas();
    authuser();
  }, []);

  const datas = async () => {
    let promises = [];
    let endpoints = ['products', 'category'];
    let products = {};
    let categories = {};
    endpoints.forEach((endpoint) => {
      promises.push(fetchData(`/${endpoint}`));
    });
    const resData = await Promise.all(promises);
    products = [...resData[0]];
    categories = [...resData[1]];
    dispatch(getProducts(products));
    dispatch(getCategories(categories));
  };

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-screen">
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menus />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/signin" element={!isLoggedIn ? <SignInPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isLoggedIn ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/cart" element={<Cart />} />
          {isLoggedIn ? <Route path="/orders" element={<OrderPage />} />
            : <Route path="/orders" element={<Navigate to="/signin" />} />
          }
          <Route element={<ProtectedRoutes />}>
          </Route>
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/failed" element={<PaymentFailed />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
