//functions to send req with header and body to backend:

import axios from "axios";
//porducts contains object of product created info
export const createProduct = async (product, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken,
        },
    });
