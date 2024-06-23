import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {CssBaseline} from "@mui/material";
import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';
import {theme} from "./theme.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import Category from './pages/admin/categories/Category.tsx';
import Product from './pages/admin/products/Product.tsx';
import CreateProduct from './pages/admin/products/CreateProduct.tsx';
import UserLayout from './layouts/user/UserLayout.tsx';
import Home from './pages/user/home/Home.tsx';
import ProductDetail from './pages/user/products/ProductDetail.tsx';

const router = createBrowserRouter([
    {
        path:'/admin/dashboard',
        element:<AdminLayout><Dashboard/></AdminLayout>
    },
    {
        path:'/admin/product/category',
        element:<AdminLayout><Category/></AdminLayout>
    },
    {
        path:'/admin/product',
        element:<AdminLayout><Product/></AdminLayout>
    },
    {
        path:'/admin/product/create',
        element:<AdminLayout><CreateProduct/></AdminLayout>
    },
    {
        path:'/',
        element:<UserLayout><Home/></UserLayout>
    },
    {
        path: '/products/:id',
        element: <UserLayout><ProductDetail/></UserLayout>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CssVarsProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={router}/>
            {/*<App/>*/}
        </CssVarsProvider>

    </React.StrictMode>,
)
