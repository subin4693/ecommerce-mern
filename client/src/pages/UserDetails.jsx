import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useUserContext } from "../context/UserContext";
import { signin } from "../api/userapi";
import { buyProduct } from "../api/productapi";

const UserDetails = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const navigate = useNavigate();

    const { id } = useParams();

    const handleBuyNow = async (e) => {
        e.preventDefault();
        try {
            const res = await buyProduct(id, true);
            console.log(res);
            navigate("/success");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth-form">
            <form className="addProductForm">
                <h1>Enter all details</h1>
                <br />
                <div className="addProductItem">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="addProductItem">
                    <label>Phone number</label>
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
                <div className="addProductItem">
                    <label>Address</label>
                    <textarea
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={5}
                    />
                </div>
                <button className="addProductButton" onClick={handleBuyNow}>
                    Cash on delivery
                </button>{" "}
                &nbsp;&nbsp;
                <Link to={"/pay/" + id} className="addProductButton">
                    Pay using card
                </Link>
                <br />
                <br />
            </form>
        </div>
    );
};

export default UserDetails;
