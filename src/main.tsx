import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { theme } from "./theme.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import Category from './pages/admin/categories/Category.tsx';
import Product from './pages/admin/products/Product.tsx';
import CreateProduct from './pages/admin/products/CreateProduct.tsx';
import UserLayout from './layouts/user/UserLayout.tsx';
import Home from './pages/user/home/Home.tsx';
import ProductDetail from './pages/user/products/ProductDetail.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store/Store.ts';
import Cart from './pages/user/cart/Cart.tsx';
import Login from './pages/user/auth/Login.tsx';
import Signup from './pages/user/auth/Register.tsx';
import AuthLayout from './layouts/user/AuthLayout.tsx';
import VerifyEmail from './pages/user/auth/VerifyEmail.tsx';
import LoginSuccess from './pages/user/auth/LoginSuccess.tsx';

const router = createBrowserRouter([
    {
        path: '/admin/dashboard',
        element: <AdminLayout><Dashboard /></AdminLayout>
    },
    {
        path: '/admin/product/category',
        element: <AdminLayout><Category /></AdminLayout>
    },
    {
        path: '/admin/product',
        element: <AdminLayout><Product /></AdminLayout>
    },
    {
        path: '/admin/product/create',
        element: <AdminLayout><CreateProduct /></AdminLayout>
    },
    {
        path: '/',
        element: <UserLayout><Home /></UserLayout>
    },
    {
        path: '/products/:id',
        element: <UserLayout><ProductDetail /></UserLayout>
    }, {
        path: '/cart',
        element: <UserLayout><Cart /></UserLayout>
    },
    {
        path: '/auth/login',
        element: <AuthLayout><Login></Login></AuthLayout>
    },
    {
        path: '/auth/register',
        element: <AuthLayout><Signup></Signup></AuthLayout>
    },
    {
        path: '/auth/verify-email',
        element: <AuthLayout><VerifyEmail></VerifyEmail></AuthLayout>
    },
    {
        path: '/auth/login-success',
        element: <LoginSuccess></LoginSuccess>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
                {/*<App/>*/}
            </CssVarsProvider>
        </Provider>
    </React.StrictMode>,
)
