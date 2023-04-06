//when landing on Shop show default page:
import React, { useState, useEffect } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../components/functions/product'
import { getCategories } from '../components/functions/category';
import { getSubs } from '../components/functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import Star from '../components/forms/Star';

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
    //state sys for star
    const [star, setStar] = useState('');
    //state to hold  respose of sub category data from server
    const [subs, setSubs] = useState([]);
    //hold state of single sub
    const [sub, setSub] = useState([]);
    //to hold state of brands
    const [brands, setBrands] = useState([
        "Apple",
        "Samsung",
        "Microsoft",
        "Lenevo",
        "Asus",
        "Dell"
    ])
    //state to hold single brand  to query backend
    const [brand, setBrand] = useState('');

    const [colors, setColors] = useState(
        ["Black", "Brown", "Silver", "White", "Blue"]
    );
    //single color to send to backend to search categories based on colors
    const [color, setColor] = useState('');

    const [shipping, setShipping] = useState('');


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
        //fetch Subcategories
        getSubs().then((res) => setSubs(res.data));
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
        //reset
        setCategoryIds([]);
        setPrice(value);
        setStar("");
        setSub('');
        setBrand('');
        setColor('');
        setShipping('');
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
        //reset
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setStar("");
        setSub('');
        setBrand('');
        setColor('');
        setShipping('');
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

    const handleStarClick = num => {
        // console.log(num);
        //reset other filter Values:
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar(num);
        setSub('');
        setBrand('');
        setColor('');
        setShipping('');
        fetchProducts({ stars: num })

    }

    //5. Show Products By Star rating
    const showStars = () => (
        <div className='pr-4 pl-4 pb-2'>
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    )
    //6. Show Products By Sub Categories.

    const showSubs = () => subs.map((s) => <div className='pl-4 mt-2'>
        <div key={s._id} onClick={() => handleSub(s)} style={{ cursor: "pointer" }}>
            <div className='p-3 bg-gray-400 m-1 w-max rounded'>
                {s.name}
            </div>
        </div>
    </div>

    )

    //6.Show SUb
    const handleSub = (sub) => {
        // console.log(sub)
        setSub(sub);
        //reset other value
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor('');
        setShipping('');
        //fetch all product based on sub
        fetchProducts({ sub: sub })
    }

    //7.Show Products based on Brands Name
    const showBrands = () => brands.map((b) =>
    (
        //importing radio component form antd

        < Radio
            className='pb-1 pl-4 pr-4 mt-1'
            value={b}
            name={b}
            checked={b === brand}
            //on change provides an event
            onChange={handleBrand}
        >
            {b}
        </Radio >

    ));

    const handleBrand = (e) => {
        //reset other filters
        setSub('');
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setColor('');
        setShipping('');
        setBrand(e.target.value);
        // console.log('Here is targetd brand value', e.target.value)
        fetchProducts({ brand: e.target.value });
    }

    //8. show products based on colors
    const showColors = () => colors.map((c) => (
        <Radio
            value={c}
            name={c}
            checked={c === color}
            onChange={handleColor}
            className='pb-1 ml-4 pr-4'
        >

            {c}
        </Radio>
    ))

    const handleColor = (e) => {
        setSub('');
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor(e.target.value)
        setShipping('');
        fetchProducts({ color: e.target.value })
    }

    //shipping is managed on state initially a blank value
    // 9. show products based on shipping yes/no
    const showShipping = () => (
        <>
            <Checkbox
                className="pb-2 pl-4 pr-4"
                onChange={handleShippingchange}
                value="Yes"
                checked={shipping === "Yes"}
            >
                Yes
            </Checkbox>

            <Checkbox
                className="pb-2 pl-4 pr-4"
                onChange={handleShippingchange}
                value="No"
                checked={shipping === "No"}
            >
                No
            </Checkbox>
        </>
    );


    const handleShippingchange = (e) => {
        setSub('');
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor('');
        setShipping(e.target.value)
        // console.log(e.target.value) //yes/No
        fetchProducts({ shipping: e.target.value })
    }


    return (
        <div>
            <div className='grid grid-cols-12'>
                <div className='col-span-3 pt-2 '>
                    <h4 className='text-xl text-red-600 p-4'>
                        Search / Filter Menu
                    </h4>

                    <hr />
                    <Menu defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']} mode='inline'>
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
                        {/* Stars */}
                        <SubMenu key={'3'}
                            title={
                                <span className='flex items-center text-xl gap-3'>
                                    <StarOutlined /> Rating
                                </span>
                            }>
                            <div>
                                {showStars()}
                            </div>
                        </SubMenu>
                        {/* SubCategory */}
                        <SubMenu key={'4'}
                            title={
                                <span className='flex items-center text-xl gap-3'>
                                    <DownSquareOutlined /> Sub Categories
                                </span>
                            }>
                            <div className='flex flex-wrap w-4/5'>
                                {showSubs()}
                            </div>
                        </SubMenu>
                        {/* Brands */}
                        <SubMenu key={'5'}
                            title={
                                <span className='flex items-center text-xl gap-3'>
                                    <DownSquareOutlined /> Brands
                                </span>
                            }>
                            <div className='flex flex-wrap w-4/5'>
                                {showBrands()}
                            </div>
                        </SubMenu>

                        {/* Colors */}
                        <SubMenu key={'6'}
                            title={
                                <span className='flex items-center text-xl gap-3'>
                                    <DownSquareOutlined /> Colors
                                </span>
                            }>
                            <div className='flex flex-wrap w-4/5'>
                                {showColors()}
                            </div>
                        </SubMenu>

                        {/* Shipping  */}
                        <SubMenu key={'7'}
                            title={
                                <span className='flex items-center text-xl gap-3'>
                                    <DownSquareOutlined /> Shipping
                                </span>
                            }>
                            <div className='flex flex-wrap w-4/5'>
                                {showShipping()}
                            </div>
                        </SubMenu>

                    </Menu>
                </div>
                <div className='col-span-9 ml-2'>
                    {loading ? (<h4>Loading....</h4>) : (<h4 className='text-red-500 text-3xl font-bold'>Products</h4>)}
                    {products.length < 1 && <p>No Products Found</p>}

                    <div className='flex flex-wrap gap-7'>
                        {products.map((p) => (<div key={p._id} className='grid-span-4'> <ProductCard product={p} /> </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop



