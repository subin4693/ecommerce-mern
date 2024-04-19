import React from "react";

import Home from "./pages/Home";
import Layout from "./Layouts/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products";

import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import AdminLayout from "./Layouts/AdminLayout";
import AdminProduct from "./pages/Admin-Product";
import AdminProductList from "./pages/Admin-ProductList";
import AdminUserList from "./pages/Admin-UserList";
import AdminNewProduct from "./pages/Admin-NewProduct";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";

import { Toaster } from "react-hot-toast";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import ProtuctedRoute from "./components/ProtuctedRoute";
import UserDetails from "./pages/UserDetails";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",

            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: (
                        <ProtuctedRoute>
                            <Home />
                        </ProtuctedRoute>
                    ),
                },
                {
                    path: "/products",
                    element: (
                        <ProtuctedRoute>
                            {" "}
                            <Products />
                        </ProtuctedRoute>
                    ),
                },
                {
                    path: "/orders",
                    element: (
                        <ProtuctedRoute>
                            <Orders />
                        </ProtuctedRoute>
                    ),
                },
                {
                    path: "/user-details/:id",
                    element: (
                        <ProtuctedRoute>
                            <UserDetails />
                        </ProtuctedRoute>
                    ),
                },
                {
                    path: "/success",
                    element: (
                        <ProtuctedRoute>
                            {" "}
                            <Success />
                        </ProtuctedRoute>
                    ),
                },
                {
                    path: "/pay/:id",
                    element: (
                        <ProtuctedRoute>
                            {" "}
                            <Pay />
                        </ProtuctedRoute>
                    ),
                },
                {
                    path: "/product-details/:id",
                    element: (
                        <ProtuctedRoute>
                            {" "}
                            <ProductDetails />
                        </ProtuctedRoute>
                    ),
                },
                {
                    path: "/auth/signup",
                    element: <Signup />,
                },
                {
                    path: "/auth/signin",
                    element: <Signin />,
                },
                {
                    path: "/admin",
                    element: (
                        <ProtuctedRoute>
                            {" "}
                            <AdminLayout />
                        </ProtuctedRoute>
                    ),
                    children: [
                        {
                            path: "/admin",
                            element: <Admin />,
                        },
                        {
                            path: "/admin/users",
                            element: <AdminUserList />,
                        },
                        {
                            path: "/admin/products",
                            element: <AdminProductList />,
                        },
                        {
                            path: "/admin/products/:id",
                            element: <AdminProduct />,
                        },
                        {
                            path: "/admin/create-product",
                            element: <AdminNewProduct />,
                        },
                    ],
                },
            ],
        },
    ]);

    return (
        <>
            <div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
