import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signup = async (data) => {
    const res = await axios.post(BASE_URL + "users/signup", data, {
        withCredentials: true,
    });

    if (res.data.status !== "success") {
        console.log(res);
        throw new Error(res.message);
    }
    console.log(res.data.data);
    return res.data.data.user;
};

export const signin = async (data) => {
    const res = await axios.post(BASE_URL + "users/signin", data, {
        withCredentials: true,
    });

    if (res.data.status !== "success") {
        console.log(res);
        throw new Error(res.message);
    }

    return res.data.data.user;
};

export const getUsers = async (data) => {
    const res = await axios.get(BASE_URL + "users?limit=6");

    if (res.data.status !== "success") {
        console.log(res);
        throw new Error(res.message);
    }

    return res.data.data.users;
};

export const verifyUser = async () => {
    const res = await axios.get(BASE_URL + "users/verify", {
        withCredentials: true,
    });

    if (res.data.status !== "success") {
        throw new Error(res);
    }
    if (res.data.message) {
        return null;
    }

    return res.data.data.user;
};

export const getUserForChart = async () => {
    const res = await axios.get(BASE_URL + "users/chart", {
        withCredentials: true,
    });
    if (res.data.status !== "success") {
        throw new Error(res);
    }

    console.log(res.data.data);
    return res.data.data.userData;
};


export const signout = async() => {
    const res = await axios.post(BASE_URL + "users/signout",{}, {
        withCredentials: true,
    });
    if (res.data.status !== "success") {
        throw new Error(res);
    }

}