import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL


export const createProduct = async(data) => {
    const res = await axios.post(BASE_URL+"products/admin",data,{withCredentials:true})
 
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
    
    return res.data.data.product
}

export const getProducts = async(limit,page) => {
    page = page?page:""
    const res = await axios.get(BASE_URL+"products?limit="+limit+"&&page="+page)
    // products?limit=5&&page=1
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
    console.log(res.data.data)
    return res.data.data
    
}

export const getSingleProduct = async(id) => {
    const res = await axios.get(BASE_URL+"products/"+id)
    
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
    
    return res.data.data.product
    
}

export const addToCart = async(id,quantity) => {
    const res = await axios.post(BASE_URL+"products/cart/carts?prod="+id,{ quantity},{withCredentials:true})
   
    
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
     
    return res.data.data.product
}

export const getCart = async () => {
    const res = await axios.get(BASE_URL+"products/cart/carts",{withCredentials:true})
   
    
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
    console.log(res.data.data);     
    return res.data.data 
}   

export const removeFromCart = async(id) => {
    const res = await axios.delete(BASE_URL+"products/cart/carts?prod="+id,{withCredentials:true})
   
    
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
    console.log(res.data.data);     
    return res.data.data 
}

export const buyProduct = async(id, cod) => {
    let cashOnDelivery = "";
    if(cod){
        cashOnDelivery = "&&cod=true"
    }
    console.log(cashOnDelivery);
    const res = await axios.post(BASE_URL+"products/order/orders?product="+id+cashOnDelivery,{},{withCredentials:true})
   
    console.log(res);
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
    console.log(res.data.data);     
    return res.data.data 
}

export const getLatestTransactions = async () => {
    const res = await axios.get(BASE_URL+"products/order/orders",{withCredentials:true})

    
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
    console.log(res);     
    return res.data.data.transactions 
}

export const getOrderedProducts = async () => {
    const res = await axios.get(BASE_URL+"products/orders/get-orders",{withCredentials:true})
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
    console.log(res.data.data);     
    return res.data.data.orders 
}

export const deleteProduct = async(deleteId) => {
    let del="";
    if(deleteId){
        del="?del="+deleteId
    }
    const res = await axios.delete(BASE_URL+"products/admin"+del,{withCredentials:true})
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
    console.log(res.data.data);     
    return res.data.data

}