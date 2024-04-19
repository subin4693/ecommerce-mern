import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../RootLayout.css";

const RootLayout = () => {
    return (
        <div className="layout">
            <header>
                <Navbar />
            </header>
            <main className="main-container">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default RootLayout;
