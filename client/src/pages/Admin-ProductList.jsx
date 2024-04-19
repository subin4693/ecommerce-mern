import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";

import useProduct from "../hooks/use-Product";

import { BsTrash } from "react-icons/bs";
import { deleteProduct } from "../api/productapi";

const AdminProductList = () => {
    let products = useProduct("").products;

    const handleDelete = async (deleteId) => {
        try {
            await deleteProduct(deleteId);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Link to="/admin/create-product">
                <button className="productAddButton">Create</button>
            </Link>
            <table className="admin-productlist-container">
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Price</th>
                <tr />

                {products &&
                    products.map((product) => (
                        <>
                            <td className="admin-productList-user">
                                <img
                                    src={product.images[0]}
                                    className="widgetSmImg"
                                />
                                {product.name}
                            </td>
                            <td>{product.category}</td>
                            <td>active</td>
                            <td>{product.price}</td>

                            <td onClick={() => handleDelete(product._id)}>
                                <BsTrash />
                            </td>

                            <tr />
                        </>
                    ))}
            </table>
        </div>
    );
};

export default AdminProductList;
