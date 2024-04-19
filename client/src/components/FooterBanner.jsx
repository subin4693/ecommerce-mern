import React from "react";
import { Link } from "react-router-dom";

const FooterBanner = ({ banner }) => {
    return (
        <div className="footer-banner-container">
            <div className="banner-desc">
                <div className="left">
                    <p>{banner.discount}</p>
                    <h3>{banner.largeText1}</h3>
                    <h3>{banner.largeText2}</h3>
                    <p>{banner.saleTime}</p>
                </div>
                <div className="right">
                    <p>{banner.smallText}</p>
                    <h3>{banner.midText}</h3>
                    <p>{banner.desc}</p>
                    <Link to={`/products`}>
                        <button type="button">{banner.buttonText}</button>
                    </Link>
                </div>

                <img src={banner.image} className="footer-banner-image" />
            </div>
        </div>
    );
};

export default FooterBanner;
