import React, { useEffect } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { CiStopwatch, CiLogin, CiLogout } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";

import { useCartContext } from "../context/CartContext";
import { useUserContext } from "../context/UserContext";
import Cart from "./Cart";

import { MdOutlineLogout } from "react-icons/md";
import { MdWatch } from "react-icons/md";
import { MdOutlineLocalShipping } from "react-icons/md";
import { signout } from "../api/userapi";

const Navbar = () => {
    const { showCart, setShowCart } = useCartContext();
    const { user, setUser } = useUserContext();

    const signOut = async () => {
        try {
            await signout();
            console.log("signing out");
            setUser(null);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="navbar-container">
            <p className="logo">
                <Link to="/">W-H</Link>
            </p>
            {user && (
                <nav className="navitems-container">
                    <NavLink
                        to="/"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <button type="button" className="cart-icon">
                            <TiHomeOutline size={25} />
                            Home
                        </button>
                    </NavLink>
                    <NavLink
                        to="products"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        {/* <Link to="products"> */}
                        <button type="button" className="cart-icon">
                            <MdWatch size={25} />
                            Watches
                        </button>
                        {/* </Link> */}
                    </NavLink>
                    {user && user.role === "admin" && (
                        <NavLink
                            to="admin"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            <button type="button" className="cart-icon">
                                <GrUserAdmin size={25} />
                                Admin
                            </button>
                        </NavLink>
                    )}

                    <button
                        type="button"
                        className="cart-icon"
                        onClick={() => setShowCart(true)}
                    >
                        <AiOutlineShopping size={25} />
                        Cart
                        {/* <span className="cart-item-qty">10</span> */}
                    </button>

                    <NavLink
                        to="orders"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <button type="button" className="cart-icon">
                            <MdOutlineLocalShipping size={25} />
                            Orders
                            {/* <span className="cart-item-qty">10</span> */}
                        </button>
                    </NavLink>
                    <button
                        type="button"
                        className="cart-icon"
                        onClick={() => signOut()}
                    >
                        <MdOutlineLogout size={25} />
                        Logout
                        {/* <span className="cart-item-qty">10</span> */}
                    </button>

                    {showCart && <Cart />}
                </nav>
            )}
        </div>
    );
};

export default Navbar;
