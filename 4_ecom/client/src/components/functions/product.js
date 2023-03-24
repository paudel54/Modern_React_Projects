//functions to send req with header and body to backend:

import axios from "axios";
//porducts contains object of product created info
export const createProduct = async (product, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken,
        },
    });

//get req to backend 
export const getProductsByCount = async (count) =>
    await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

//remove product:
export const removeProduct = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken,
        },
    });

export const getProduct = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);



export const updateProduct = async (slug, product, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: {
            authtoken,
        },
    });
