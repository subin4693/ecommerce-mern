import React from "react";
import { Link } from "react-router-dom";

const HeroBanner = ({ heroBanner }) => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="beats-solo">
                    {heroBanner && heroBanner.smallText}
                </p>
                <h3>{heroBanner && heroBanner.midText}</h3>
                <h1>{heroBanner && heroBanner.largeText1}</h1>
                <img
                    src={heroBanner && heroBanner.image}
                    alt="headphones"
                    className="hero-banner-image"
                />

                <div>
                    <Link to={`/products`}>
                        <button type="button">
                            {heroBanner && heroBanner.buttonText}
                        </button>
                    </Link>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>{heroBanner && heroBanner.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
