import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

import app from "../firebase";

import { createProduct } from "../api/productapi";

const AdminNewProduct = () => {
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    const handleUpload = (e) => {
        console.log("image uploading...");
        const file = e.target.files[0];
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImages((prev) => {
                        return [...prev, downloadURL];
                    });
                });
            }
        );
    };

    // const uploadedUrl =
    //     "https://firebasestorage.googleapis.com/v0/b/chat--ap.appspot.com/o/watch_1.webp?alt=media&token=ee44f36b-2b74-493b-b959-1fea8a0a4e2c";
    // setImages((prev) => [...prev, uploadedUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, details, price, category, images);
        try {
            await createProduct({
                name,
                details,
                price,
                images,
                category,
            });
            toast.success("Product created");
            navigate("/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Try again later");
        }
    };

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            {images &&
                images.map((img) => (
                    <img
                        src={img}
                        className="admin-createprod-showimg"
                        alt="product"
                    />
                ))}
            <form className="addProductForm" onSubmit={handleSubmit}>
                <div className="addProductItem">
                    <label>Image</label>
                    <label htmlFor="file">
                        <span>Add</span>
                    </label>
                    <input
                        type="file"
                        id="file"
                        className="admin-hide"
                        onChange={handleUpload}
                    />
                </div>
                <div className="addProductItem">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Rolex"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="addProductItem">
                    <label>Details</label>
                    <textarea
                        placeholder="Write something about product"
                        cols="5"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>

                <div className="addProductItem">
                    <label>Price</label>
                    <input
                        type="number"
                        placeholder="100"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="addProductItem">
                    <label>Category</label>
                    <select
                        name="active"
                        id="active"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="digital">Digital</option>
                        <option value="analog">Analog</option>
                    </select>
                </div>
                <button type="submit" className="addProductButton">
                    Create
                </button>
            </form>
        </div>
    );
};

export default AdminNewProduct;
