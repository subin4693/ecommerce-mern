import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getOrderedProducts } from "../api/productapi";
const AdminProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const res = await getOrderedProducts();
            console.log(res);
            setProducts(res);
        };
        getOrders();
    }, []);

    return (
        <div>
            <br />
            <br />

            <br />
            <br />

            <table className="admin-productlist-container">
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Price</th>
                <tr />

                {products &&
                    products.map((product) => (
                        <>
                            <td
                                className="admin-productList-user"
                                key={product._id}
                            >
                                <img
                                    src={product.productId.images[0]}
                                    className="widgetSmImg"
                                />
                                {console.log(product.productId)}
                                {product.productId.name}
                            </td>
                            <td>{product.productId.category}</td>
                            <td>success</td>
                            <td>{product.productId.price}</td>
                            <td>
                                <Link
                                    to={
                                        "/product-details/" +
                                        product.productId._id
                                    }
                                >
                                    <BsThreeDotsVertical />
                                </Link>
                            </td>
                            <tr />
                        </>
                    ))}
            </table>
        </div>
    );
};

export default AdminProductList;
