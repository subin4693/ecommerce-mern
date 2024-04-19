import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import "../AdminLayout.css";

const AdminLayout = () => {
    return (
        <div className="admin_container">
            <Sidebar />
            <main className="home">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
