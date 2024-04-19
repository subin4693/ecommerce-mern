import React, { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import Product from "../components/Product";
import FooterBanner from "../components/FooterBanner";

import { getBannerData } from "../api/bannerapi";
import useProduct from "../hooks/use-Product";

const Home = () => {
    let products = useProduct(6).products;

    const [banner, setBanner] = useState({});

    useEffect(() => {
        const getBanner = async () => {
            try {
                const ba = await getBannerData();

                setBanner(ba);
            } catch (error) {
                console.log(error);
            }
        };
        getBanner();
    }, []);

    return (
        <div>
            <HeroBanner heroBanner={banner && banner} />
            <div className="products-heading">
                <h2>Best Seller Products</h2>
                <p>speaker There are many variations passages</p>
            </div>
            <div className="products-container">
                {products?.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
            <FooterBanner banner={banner && banner} />
        </div>
    );
};

export default Home;
