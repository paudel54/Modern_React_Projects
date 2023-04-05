//when landing on Shop show default page:

import React, { useState, useEffect } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../components/functions/product'
import { getCategories } from '../components/functions/category';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox } from 'antd';
import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons';
// import SubMenu from 'antd/es/menu/SubMenu';
const { SubMenu, ItemGroup } = Menu;


const Shop = () => {
    //state variable to store products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    //to show categories option onto sidebar for user to select
    const [categories, setCategories] = useState([]);
    //to send to backend to perform search query 
    const [categoryIds, setCategoryIds] = useState([]);

    //for slider request control
    const [ok, setOk] = useState(false);
    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    //1.load products on  page load by default
    useEffect(() => {
        loadAllProducts();
        //fetch Categories
        getCategories().then((res) => setCategories(res.data));
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
        //when slideris changed wipe the state value of check box
        setCategoryIds([]);
        setPrice(value);
        setTimeout(() => {
            setOk(!ok);
        }, 400);
    }
    //4.Load Products Based on Category
    //Show Categories in a list of checkbox
    const showCategories = () => categories.map((c) => <div key={c._id}>
        {/* Value is sent into backend to fetch all the elements based on  category */}
        <Checkbox onChange={handleCheck}
            className='pb-2 pl-4 pr-4'
            value={c._id}
            name='category'
            checked={categoryIds.includes(c._id)}
        >
            {c.name}
        </Checkbox>
        <br />
    </div>
    );
    //handle check for categories
    const handleCheck = (e) => {
        //clearing out other filter state with dispatch on check

        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        });
        setPrice([0, 0]);
        // console.log('target value console', e.target.value);
        //check dublicate. if clicked on checkbox store to state, if unclicked remove from state and again if checked put onto state:
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked);

        //indexOf Method if not found returns -1 else returns index
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            //if found pull out one item from index
            //splice ( remove from index , and 2nd parameter how many item from particular index)
            inTheState.splice(foundInTheState, 1);
        }
        setCategoryIds(inTheState);
        //logs array with updates
        // console.log(inTheState);
        fetchProducts({ category: inTheState })
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
                        {/* Price */}
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
                        {/* Category */}
                        <SubMenu key={'2'}
                            title={
                                <span className='flex items-center text-xl gap-3'>
                                    <DownSquareOutlined /> Categories
                                </span>
                            }>
                            <div>
                                {showCategories()}
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
