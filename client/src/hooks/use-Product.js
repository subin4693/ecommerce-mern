import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/productapi';

const useProduct = (limit,page) => {
   const [products, setProducts] = useState([])
   

   useEffect(() => {
    const getProduct = async (limit,page) => {
        try {
            const data = await getProducts(limit,page);

            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };
    getProduct(limit, page);
    
  }, []);
  return products
}

export default useProduct