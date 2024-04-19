import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartContext } from "./context/CartContext.jsx";
import { UserContext } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <CartContext>
        <UserContext>
            <App />
        </UserContext>
    </CartContext>
);
