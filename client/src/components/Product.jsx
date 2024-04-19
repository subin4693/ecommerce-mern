import React from "react";

import { Link } from "react-router-dom";

const Products = ({ product }) => {
    return (
        <div>
            <Link to={`/product-details/${product._id}`}>
                <div className="product-card">
                    <img
                        src={product.images[0]}
                        width={250}
                        height={250}
                        className="product-image"
                    />
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">&#8377;{product.price}</p>
                </div>
            </Link>
        </div>
    );
};

export default Products;
