import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "../context/UserContext";
import { signin } from "../api/userapi";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { setUser } = useUserContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) return toast.error("Fill all the field");
        else if (password.length < 8)
            return toast.error("Password must have minimum 8 characters.");

        try {
            toast.loading("Signup...");

            const userData = await signin({ email, password });
            setUser(userData);

            toast.remove();
            toast.success("Success");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.remove();
            toast.error("Try again later");
        }
    };

    return (
        <div className="auth-form">
            <form className="addProductForm" onSubmit={handleSubmit}>
                <h1>Signin</h1>
                <br />

                <div className="addProductItem">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="eg:abc@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="addProductItem">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="eg:password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="addProductButton">
                    Signup
                </button>
                <br />
                <br />
                <p>
                    Dont't have an account
                    <Link to="/auth/signup" className="auth-link">
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signin;
