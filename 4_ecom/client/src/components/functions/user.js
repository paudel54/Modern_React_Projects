//function to cart
import axios from 'axios';
//creating endpoint to send cart into /user/cart from redux store to backend
//sending as an object, with cart value of array
//axios URL, BODY , Header
export const userCart = async (cart, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/user/cart`, { cart }, {
        headers: {
            authtoken,
        },
    });

export const getUserCart = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authtoken,
        },
    });

//put method to update data on server and requires a body
export const emptyUserCart = async (authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authtoken,
        },
    });

//sending address to backend

export const saveUserAddress = async (authtoken, address) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/address`,
        { address },
        {
            headers: {
                authtoken,
            },
        }
    );

//applyCoupon
export const applyCoupon = async (authtoken, coupon) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart/coupon`,
        { coupon },
        {
            headers: {
                authtoken,
            },
        }
    );

//function to create New Order. 
export const createOrder = async (stripeResponse, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/order`,
        { stripeResponse },
        {
            headers: {
                authtoken,
            },
        }
    );
//getuserOrders, to show up in user purchase history

export const getuserOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
        headers: {
            authtoken,
        }
    })

export const getWishlist = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
        headers: {
            authtoken,
        },
    });

export const removeWishlist = async (productId, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
        {}, {
        headers: {
            authtoken,
        },
    });
//adding to wishList sending the product Id on request body
export const addToWishlist = async (productId, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/wishlist`,
        { productId },
        {
            headers: {
                authtoken,
            },
        }
    );
