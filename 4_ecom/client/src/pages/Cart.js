import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
    //GET FROM REDUX STORE
    const { cart, user } = useSelector((state) => ({ ...state }));
    //TO UPDATE REDUX
    const dispatch = useDispatch()
    return (
        <div>
            <div>
                <h4 className='text-red-600 text-2xl text-center'>Card page here.......</h4>
                {JSON.stringify(cart)}
            </div>
        </div>
    )
}

export default Cart
