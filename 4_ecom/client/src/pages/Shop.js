//when landing on Shop show default page:

import React, { useState, useEffect } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../components/functions/product'
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
// import SubMenu from 'antd/es/menu/SubMenu';
const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
    //state variable to store products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    //for slider request control
    const [ok, setOk] = useState(false);
    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    //1.load products on  page load by default
    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        getProductsByCount(12)
            .then((p) => {
                setProducts(p.data);
                setLoading(false);
            })
    };

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg)
            .then((res) => {
                setProducts(res.data);
            });
    }

    //2.Load Product on user search input, when text changes on redux store make req  to backend to display data onto card. 
    //load based on user Search Input:
    useEffect(() => {
        // console.log('Load Products on user Search input', text)
        //setting up delay to slower request rate
        const delayed = setTimeout(() => {
            fetchProducts({ query: text })
        }, 400)
        return () => clearTimeout(delayed)

    }, [text]);

    //3. Load Product based on Price Range:
    //when price on slider changes run this use Effect
    //when ok state changes fetch product Based on Price
    useEffect(
        () => {
            console.log('Ok to Request');
            fetchProducts({ price });
        }, [ok]);

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: " " }
        });
        setPrice(value);
        setTimeout(() => {
            setOk(!ok);
        }, 400);
    }

    return (
        <div>
            <div className='grid grid-cols-12'>
                <div className='col-span-3 pt-2 '>
                    <h4 className='text-xl text-red-600 p-4'>
                        Search / Filter Menu
                    </h4>
                    <hr />
                    <Menu defaultOpenKeys={['1', '2']} mode='inline'>
                        <SubMenu key={'1'}
                            title={
                                <span className='flex items-center text-xl gap-3'>
                                    <DollarOutlined /> Price
                                </span>
                            }>
                            <div>
                                <Slider className='ml-4 mr-4'
                                    tipFormatter={(v) => `$${v}`}
                                    range
                                    value={price}
                                    onChange={handleSlider}
                                    max="5000"
                                />
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className='col-span-9 pt-2'>
                    {loading ? (<h4>Loading....</h4>) : (<h4 className='text-red-500 text-3xl font-bold'>Products</h4>)}
                    {products.length < 1 && <p>No Products Found</p>}

                    <div className='flex flex-wrap gap-8'>
                        {products.map((p) => (<div key={p._id} className='grid-span-4'> <ProductCard product={p} /> </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
