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