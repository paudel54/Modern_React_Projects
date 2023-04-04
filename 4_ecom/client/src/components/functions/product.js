//functions to send req with header and body to backend routes: and then to controller and back to frontend with result:

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

export const getProducts = async (sort, order, page) =>
    await axios.post(`${process.env.REACT_APP_API}/products`, {
        //this will be accessable to backend as request body
        sort,
        order,
        page,
    });

export const getProductsCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}/products/total`);


export const productStar = async (productId, star, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/product/star/${productId}`, { star }, {
        headers: {
            authtoken,
        },
    });


export const getRelated = async (productId) =>
    await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);


//to hit backend to get filter data
export const fetchProductsByFilter = async (arg) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);

