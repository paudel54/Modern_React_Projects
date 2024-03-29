import axios from 'axios';

export const getSubs = async () =>
    await axios.get(`${process.env.REACT_APP_API}/subs`);

//to get single category: send req to server and fetch from db
export const getSub = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
        headers: {
            authtoken,
        },
    });

//updated name is sent as mid argument called as category: its update info
export const updateSub = async (slug, sub, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
        headers: {
            authtoken,
        },
    });

//category info consists of input feild of newly created form is passed from axios to create category!
//category is a payload on request: with json {name: "value"}
export const createSub = async (sub, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
        headers: {
            authtoken,
        },
    });