import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { buyProduct } from "../api/productapi";
import CheckoutForm from "../components/CheckoutForm";
import { useParams } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
    "pk_test_51LwqOKSFbpHA21vyYlHBOPAh0GYLUqTD6dYffkfrdl8w5MxcoJZvyuFSy54bgbKoQ3HD1J9CIqk1CJTfbXT3ygay00xpnjNc9X"
);

export default function Pay() {
    const [clientSecret, setClientSecret] = useState("");
    const { id } = useParams();
    useEffect(() => {
        console.log("working")
        const handleBuyNow = async () => {
            try {
                const res = await buyProduct(id);
                console.log(res);
                setClientSecret(res.clientSecret);
            } catch (error) {
                console.log(error);
            }
        };
        handleBuyNow();
    }, []);

    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            ):<h1>Loading</h1>}
        </div>
    );
}
