import React from 'react'
import ModalImage from "react-modal-image";
import laptop from '../../images/computer/laptop.png';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

const ProductCardInCheckout = ({ p }) => {
    let dispatch = useDispatch();
    const colors = ["Black", "Brown", "Silver", "White", "Blue"];

    const handleColorChange = e => {
        //update local storage for cart color;
        console.log('color changed', e.target.value);
        let cart = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            // cart.map((product, i) => {
            //     if (product._id === p._id) {
            //         cart[i].color = e.target.value
            //     }

            // });
            const cartUpdated = cart.map((product, i) => {
                if (product._id === p._id) {
                    return {
                        ...product,
                        color: e.target.value
                    }
                }
                return product;
            });

            // console.log('cart updated color', cart)
            //set to local storage update it cart[] array
            localStorage.setItem("cart", JSON.stringify(cartUpdated));
            dispatch({
                type: "ADD_TO_CART",
                payload: cartUpdated,
            });
        }
    }
    const handleQuantityChange = (e) => {
        //prevent form -ves value
        // console.log('available quanity', p?.quantity)
        let count = e.target.value < 1 ? 1 : e.target.value;
        if (count > p.quantity) {
            toast.error(`Max available Quanity: ${p.quantity}`)
            return;
        }
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].count = count;
                }
                return product;

            });

            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    }

    const handleRemove = () => {
        // console.log('product id to remove ', p._id)
        //remove from local storage and redux store
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            //update to Local Storage
            cart.map((product, i) => {
                if (product._id === p._id) {
                    //i is index from where it removes , 2nd argument  is how many items you want to remove
                    cart.splice(i, 1);
                }
                return product;

            });
            //update to redux store
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    }

    return (
        <tbody>
            <tr className='bg-white border-b'>
                <td className='px-6 py-4'>
                    <div style={{ width: '100px', height: 'auto' }}>
                        {p.images.length
                            ?
                            (<ModalImage small={p.images[0].url} large={p.images[0].url} />)
                            :
                            (<ModalImage small={laptop} large={laptop} />)
                        }
                    </div>
                </td>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{p.title}</td>
                <td className='px-6 py-4'>${p.price}</td>
                <td className='px-6 py-4'>{p.brand}</td>
                <td className='px-6 py-4'>
                    <select
                        onChange={handleColorChange}
                        name="color"
                        className='form-control'
                    >

                        {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}
                        {colors.filter((c) => c !== p.color).map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </td>
                <td className='px-6 py-4 text-center'>
                    <input type='number' value={p.count} onChange={handleQuantityChange} className='w-[90%]' />
                </td>
                <td className='px-6 py-4 text-center'>
                    {p.shipping === "Yes" ? <CheckCircleOutlined className='text-green-700' /> : <CloseCircleOutlined className='text-red-700' />}
                </td>
                <td className='px-6 py-4 text-center'>
                    <CloseOutlined onClick={handleRemove} className='text-red-700 pointer' />
                </td>

            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout
