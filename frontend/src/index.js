// Import necessary modules and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import store from './store';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Create routes using react-router-dom based on the provided elements
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Various routes for different screens */}
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      {/* Routes for registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      {/* Routes for admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

// Create a root for rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Use HelmetProvider for managing document head */}
    <HelmetProvider>
      {/* Provide the Redux store to the application */}
      <Provider store={store}>
        {/* Provide PayPalScriptProvider for loading PayPal scripts */}
        <PayPalScriptProvider deferLoading={true}>
          {/* Provide the router to the application */}
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// Function to report web vitals
reportWebVitals();

/*
The code sets up the main entry point of the React application.
It imports various modules, components, and styles required for the application.
The app routes are defined using react-router-dom and grouped into different categories like normal routes, private routes for registered users, and admin routes.
The app uses react-redux to provide the Redux store to the application.
The app uses @paypal/react-paypal-js for managing PayPal payment scripts.
The ReactDOM.createRoot method is used to render the app with the specified elements and routes.
Web vitals are reported using the reportWebVitals function.
*/
