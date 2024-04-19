import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineLeft,
    AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useCartContext } from "../context/CartContext";

import { getCart, removeFromCart } from "../api/productapi";

const Cart = () => {
    const cartRef = useRef();

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);

    const { setShowCart } = useCartContext();

    const toggleCartItemQuanitity = () => {};

    const handleCheckout = async () => {};

    const onRemove = async (id) => {
        try {
            const data = await removeFromCart(id);
            console.log(cartItems);
            setCartItems((cartItem) =>
                cartItem.filter((val) => val.productId._id !== id)
            );

            toast.success("Removed from cart");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const products = await getCart();

                setCartItems(products.cart);
                setTotalPrice(products.totalPrice);
                setTotalQuantities(products.cart.length);
            } catch (error) {
                console.log(error);
            }
        };
        getCartItems();
    }, []);

    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button
                    type="button"
                    className="cart-heading"
                    onClick={() => setShowCart(false)}
                >
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className="cart-num-items">
                        ({totalQuantities} items)
                    </span>
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <Link to="/products">
                            <button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className="btn"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className="product-container">
                    {cartItems.length >= 1 &&
                        cartItems.map((item) => (
                            <Link to={"/product-details/" + item.productId._id}>
                                <div className="product" key={item._id}>
                                    <img
                                        src={item.productId.images[0]}
                                        className="cart-product-image"
                                    />
                                    <div className="item-desc">
                                        <div className="flex top">
                                            <h5>{item.productId.name}</h5>
                                            <h4>${item.productId.price}</h4>
                                        </div>
                                        <div className="product-detail-desc">
                                            <h4>Details: </h4>

                                            {item.productId.details}
                                        </div>

                                        <div className="flex bottom">
                                            {/* <div>
                                            <p className="quantity-desc">
                                                <span
                                                    className="minus"
                                                    onClick={() =>
                                                        toggleCartItemQuanitity(
                                                            item._id,
                                                            "dec"
                                                        )
                                                    }
                                                >
                                                    <AiOutlineMinus />
                                                </span> */}
                                            <span className="num">
                                                Quantity: {item.quantity}
                                            </span>
                                            {/* <span
                                                    className="plus"
                                                    onClick={() =>
                                                        toggleCartItemQuanitity(
                                                            item._id,
                                                            "inc"
                                                        )
                                                    }
                                                >
                                                    <AiOutlinePlus />
                                                </span>
                                            </p>
                                        </div> */}
                                            <button
                                                type="button"
                                                className="remove-item"
                                                onClick={() =>
                                                    onRemove(item.productId._id)
                                                }
                                            >
                                                <TiDeleteOutline />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        {/* <div className="btn-container">
                            <button
                                type="button"
                                className="btn"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
