import { createBrowserRouter, Navigate } from "react-router-dom"
import AdminLayout from "../layouts/admin/AdminLayout";
import Product from "../pages/admin/products/Product";
import CreateProduct from "../pages/admin/products/CreateProduct";
import UpdateProduct from "../pages/admin/products/UpdateProduct";
import UserLayout from "../layouts/user/UserLayout";
import ProductDetail from "../pages/user/products/ProductDetail";
import Cart from "../pages/user/cart/Cart";
import Register from "../pages/user/auth/Register";
import VerifyEmail from "../pages/user/auth/VerifyEmail";
import ProtectRoutes from "./ProtectRoutes";
import Login from "../pages/user/auth/Login";
import Home from "../pages/user/home/Home";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/categories/Category";
import App from "../App";
import Provider from "../pages/admin/providers/Provider";
import Order from "../pages/admin/orders/Order";
import OrderUser from "../pages/user/order/Order";
import MessageView from "../pages/admin/chat/MessageView";
import OrderDetail from "../pages/user/order/OrderDetail";
import Payment from "../pages/user/cart/Payment";
import Profile from "../pages/user/profile/Profile";
import Promotion from "../pages/user/products/Promotion";
import ProductUser from "../pages/user/products/Product";
import PaymentSuccess from "../pages/user/cart/PaymentSuccess";
import About from "../pages/user/about/About";
import Brands from "../pages/user/brands/Brands";
import AuthLayout from "../layouts/user/AuthLayout";
import LoginSuccess from "../pages/user/auth/LoginSuccess";
import ForgotPassword from "../pages/user/auth/ForgotPassword";
import { Role } from "../model/user.model";




const adminRoutes = [
    {
        path: '/admin/dashboard',
        element: <Dashboard />
    },
    {
        path: '/admin/product',
        element: <Product />
    },
    {
        path: '/admin/product/create',
        element: <CreateProduct />
    },
    {
        path: '/admin/product/update/:id',
        element: <UpdateProduct />
    },
    {
        path: '/admin/product/category',
        element: <Category/>
    },
    {
        path: '/admin/product/provider',
        element: <Provider/>
    },
    {
        path: '/admin/order',
        element: <Order/>
    },
    {
        path: '/admin/message',
        element: <MessageView/>
    },
]

const userRoutes = [
    {
        path: '/orders',
        element: <OrderUser/>
    },
    {
        path: '/orders/:id',
        element: <OrderDetail/>
    },
    {
        path: '/payment',
        element: <Payment/>
    },
]

const publicRoutes = [
    {
        path: '/home',
        element: <UserLayout><Home/></UserLayout>
    },
    {
        path: '/profile',
        element: <App><ProtectRoutes><Profile/></ProtectRoutes></App>
    },
    {
        path: '/products/:id',
        element: <UserLayout><ProductDetail/></UserLayout>
    },
    {
        path: '/cart',
        element: <UserLayout><Cart/></UserLayout>
    },
    {
        path: '/',
        element: <Navigate to={"/home"}></Navigate>
    
    },
    {
        path: '/promotions',
        element: <UserLayout><Promotion/></UserLayout>
    
    },
    {
        path: '/products',
        element: <UserLayout><ProductUser/></UserLayout>
    
    },
    {
        path: '/payment/success',
        element: <UserLayout><PaymentSuccess/></UserLayout>
    },
    {
        path: '/about',
        element: <UserLayout><About/></UserLayout>
    },
    {
        path: '/brands',
        element: <UserLayout><Brands/></UserLayout>
    },
]

const authRoutes = [
    {
        path: '/auth/login',
        element: <AuthLayout><Login/></AuthLayout>
    
    },
    {
        path: '/auth/login-success',
        element: <LoginSuccess/>
    
    },
    {
        path: '/auth/register',
        element: <AuthLayout><Register/></AuthLayout>
    
    },
    {
        path: '/auth/verify',
        element:<AuthLayout><VerifyEmail/></AuthLayout>
    
    },
    {
        path: '/auth/forgot-password',
        element: <AuthLayout><ForgotPassword/></AuthLayout>
    
    },
]

const adminRoutesRs = adminRoutes.map((route) => {
    return {
        ...route,
        element: <App><ProtectRoutes role={Role.ROLE_ADMIN}><AdminLayout>{route.element}</AdminLayout></ProtectRoutes></App>
    }
}
);

const userRoutesRs = userRoutes.map((route) => {
    return {
       ...route,
        element: <App><ProtectRoutes role={Role.ROLE_USER}><UserLayout>{route.element}</UserLayout></ProtectRoutes></App>
    }
});

const publicRoutesRs = publicRoutes.map((route) => {
    return {
        path: route.path,
        element: <App>{route.element}</App>
    }
});



export const router = createBrowserRouter([
    ...adminRoutesRs,
    ...publicRoutesRs,
    ...userRoutesRs,
    ...authRoutes
    
]);