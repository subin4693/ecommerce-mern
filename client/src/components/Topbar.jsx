import React from "react";
import { FiWatch } from "react-icons/fi";
import { IoWatchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const Topbar = () => {
    return (
        <div>
            <div className="product-searchbox">
                <input type="text" />
            </div>
            <div className="product-filtericon-container">
                <Link to="/products?type=analog">
                    <button type="button" className="cart-icon">
                        <FiWatch />
                    </button>
                </Link>
                <Link to="/products?type=digital">
                    <button type="button" className="cart-icon">
                        <IoWatchOutline />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Topbar;
