import React from "react"
import { createBrowserRouter, Navigate } from "react-router-dom";
import AboutPage from "../features/about/AboutPage";
import Catalog from "../features/catalog/Catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import ContactPage from "../features/contact/ContactPage";
import HomePage from "../features/home/HomePage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import App from "../layout/App";
import BasketPage from "../features/basket/BasketPage";
import Register from "../features/account/Register";
import Login from "../features/account/Login";
import RequireAuth from "./RequiredAuth";
import Orders from "../features/Order/Orders";
import CheckoutWrapper from "../features/checkout/CheckoutWrapper";
import Inventory from "../features/admin/Inventory";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'checkout', element: <CheckoutWrapper />},
                {path: 'orders', element: <Orders />},
                {path: 'inventory', element: <Inventory />},
            ]},
            // Admin roles
            {element: <RequireAuth roles={['Admin']} />, children: [
                {path: 'inventory', element: <Inventory />},
            ]},
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'basket', element: <BasketPage />},
            {path: 'not-found', element: <NotFound />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
])