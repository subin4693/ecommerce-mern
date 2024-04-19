import React, { useEffect, useState } from "react";
import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiFillStar,
    AiOutlineStar,
} from "react-icons/ai";

import toast from "react-hot-toast";
import Product from "../components/Product";
import { useCartContext } from "../context/CartContext";
import { Link, useParams } from "react-router-dom";
import { addToCart, buyProduct, getSingleProduct } from "../api/productapi";
import useProduct from "../hooks/use-Product";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);

    const [index, setIndex] = useState(0);
    const { setShowCart } = useCartContext();

    let products = useProduct(4).products;

    const createCart = async () => {
        try {
            const product = await addToCart(id, quantity);

            toast.success("added to cart");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getSingleProducts = async () => {
            try {
                const data = await getSingleProduct(id);

                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        };
        getSingleProducts();
    }, [id]);

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img
                            src={product && product?.images[index]}
                            className="product-detail-image"
                        />
                    </div>
                    <div className="small-images-container">
                        {product &&
                            product?.images?.map((item, i) => (
                                <img
                                    key={i}
                                    src={item}
                                    className={
                                        i === index
                                            ? "small-image selected-image"
                                            : "small-image"
                                    }
                                    onMouseEnter={() => setIndex(i)}
                                />
                            ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{product?.name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{product?.details}</p>
                    <p className="price">&#8377;{product?.price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span
                                className="minus"
                                onClick={() => {
                                    setQuantity((prev) => prev - 1);
                                }}
                            >
                                <AiOutlineMinus />
                            </span>
                            <span className="num">{quantity}</span>
                            <span
                                className="plus"
                                onClick={() => {
                                    setQuantity((prev) => prev + 1);
                                }}
                            >
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button
                            type="button"
                            className="add-to-cart"
                            onClick={() => createCart()}
                        >
                            Add to Cart
                        </button>
                        <Link to={`/user-details/${id}`}>
                            <button className="buy-now">Buy Now</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products &&
                            products?.map((item) => (
                                <Product key={item._id} product={item} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
