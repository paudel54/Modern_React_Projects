import axios from 'axios';

export const getCategories = async () =>
    await axios.get(`${process.env.REACT_APP_API}/categories`);

//to get single category: send req to server and fetch from db
export const getCategory = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers: {
            authtoken,
        },
    });

//updated name is sent as mid argument called as category: its update info
export const updateCategory = async (slug, category, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers: {
            authtoken,
        },
    });

//category info consists of input feild of newly created form is passed from axios to create category!
//category is a payload on request: with json {name: "value"}
export const createCategory = async (category, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/category`, category, {
        headers: {
            authtoken,
        },
    });