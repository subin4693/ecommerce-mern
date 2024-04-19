import React, { useEffect, useState } from "react";
import Product from "../components/Product";
 
import useProduct from "../hooks/use-Product";
 

const Products = () => {
    let products = useProduct("");

    return (
        <div>
            
            <div className="products-container">
                {products?.products?.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
