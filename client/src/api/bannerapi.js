import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL

export const getBannerData = async() => {
    const res = await axios.get(BASE_URL+"banner")
 
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
    console.log(res.data.data);
    return res.data.data.banner
}

export const updateBannerData = async(data) => {
    const res = await axios.put(BASE_URL+"banner",{withCredentials:true},data)
 
    if(res.data.status !=="success"){
        console.log(res);
        throw new Error(res.message);
    }
    return res.data.data.banner
}