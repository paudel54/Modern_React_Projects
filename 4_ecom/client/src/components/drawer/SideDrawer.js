import React from 'react'
import { Drawer, Button } from 'antd';
//access redux
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import laptop from '../../images/computer/laptop.png';

const SideDrawer = () => {

    const dispatch = useDispatch();
    //on redux state value of drawer by defalut is false 
    const { drawer, cart } = useSelector((state) => ({ ...state }))
    const onClose = () => dispatch({
        type: 'SET_VISIBLE',
        payload: false
    });

    const imageStyle = {
        width: '100%',
        height: '50px',
        objectFit: 'contain'
    }

    return (
        <Drawer onClose={onClose} open={drawer} className='text-center' title={`${cart.length} Products in Cart`} >
            {cart.map((p) => (
                <div key={p._id}>
                    <div>
                        {p.images[0] ? (
                            <div className='border mb-3'>
                                <img src={p.images[0].url} style={imageStyle} alt='defalut img' className='mb-[2px]' />
                                <p className='text-center bg-gray-600 text-white'>{p.title} x {p.count} </p>
                            </div>
                        ) : (
                            <div className='border mb-3'>
                                <img src={laptop} style={imageStyle} alt='icon' className='mb-[2px]' />
                                <p className='text-center '>{p.title} x {p.count} </p>
                            </div>
                        )
                        }
                    </div>
                </div>
            ))}
            <div>
                <Link to='/cart' >
                    <button onClick={() => (
                        dispatch(
                            {
                                type: "SET_VISIBLE",
                                payload: false
                            }
                        )
                    )}
                        className='text-white w-1/2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-1 outline-none'>
                        Go To Cart
                    </button>
                </Link>
            </div>

        </Drawer>
    )
}

export default SideDrawer
