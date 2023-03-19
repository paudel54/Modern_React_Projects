//Similar to Category Create!
// <div>
//     <div className='grid grid-cols-10'>
//         <div className='col-span-2'><AdminNav /></div>
//         <div className='col-span-8'> I am sub Create Page</div>
//     </div>

// </div>

//client side sends input feild name on create: token and categoryname:
//server side response with:  name, parent-ID-linked: slug. createdat, updatedat

import AdminNav from '../../../components/nav/AdminNav';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//creating element requires token to verify admin can only create so use create
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { createSub, getSub, removeSub, getSubs } from "../../../components/functions/sub"
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';
import { getCategories } from "../../../components/functions/category"

import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';




const SubCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    //to tack user input form name: setName
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    //categores contains list of object that we get from backend server getCategories();
    const [categories, setCategories] = useState([]);

    //this category holds the id of dropdown list from categories name:
    //would be send to backed to create Category
    const [category, setCategory] = useState("");

    const [subs, setSubs] = useState([]);

    //searching and filtering
    //step1 add search keyword or query
    //step2 need input feild to search
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, [])

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubs = () => getSubs().then((s) => setSubs(s.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        //this input form name should be submitted to our backend
        //console.log(name);
        //when form input is clicked submit it's loading and make async fn until then loading and afterward , its toggled to true
        setLoading(true);
        //sending name as an object
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                //data from backend //console.log(res)
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is created`)
                //making sure ui is update
                // loadCategories();
                loadSubs();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }

    const handleRemove = async (slug) => {
        // let answer = window.confirm("You are about to delete this category!");
        //if pop up pressed ok value of ans will be true if clicked cancel value will be false
        // console.log(answer, slug);
        if (window.confirm("You are about to delete this category!")) {
            setLoading(true);
            removeSub(slug, user.token)
                .then(res => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`)
                    //refreshing page internally to show data after deletion
                    loadSubs();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        toast.error(err.response.data)
                    };
                }
                )
        }
    }

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);


    return (
        //UserNav and AdminNav has consistent layout-
        <div className='bg-purple-200 font-bold border p-4 grid  grid-cols-4 '>
            <AdminNav />
            <div className="col-span-3 text-center flex flex-col items-center">
                {loading ? <h4 className='text-red-500 text-sm'>Loading.....</h4> : <h4>Create Sub Category</h4>}

                <div className="">
                    <label className='text-gray-600'> Root Category  </label>
                    <select name="category"
                        className='bg-blue-500 border border-gray-300 text-white text-sm 
                        rounded-lg  block w-full p-2.5 '
                        //here setCategory will set category with the option element passed values. i.e when selected from dropdown
                        //it will helps to grab it
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {/* <option value="">Cat 1</option> */}
                        <option>Please Select</option>
                        {categories.length > 0 && categories.map((c) => (
                            <option key={c._id} value={c._id} >{c.name}</option>
                        ))}
                    </select>

                </div>
                {/* shows up parent category ID: */}
                {/* {JSON.stringify(category)} */}

                {/* {categoryForm()} */}
                <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

                {/* step2 search input feild */}
                {/* the input feild is migrated into components localSearch  */}
                {/* <input className=" bg-green-300 w-1/5 mt-10 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 " type="search" placeholder='Search Items' value={keyword} onChange={handleSearchChange} /> */}
                {/* 8888888888888888localsearch component to work with reuseable code */}
                <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                <hr className='mt-5' />
                {/* information from backend categories */}
                {/* {JSON.stringify(categories)} */}
                {/* Step5: use of search fn */}
                {subs.filter(searched(keyword)).map((s) => (
                    <div className='bg-gray-400 mb-2 p-4 flex w-1/2 justify-between' key={s._id}>
                        {s.name}
                        <div className='flex space-x-5 text-2xl items-center'>
                            <span onClick={() => (handleRemove(s.slug))} className='text-red-800 cursor-pointer'><MdDeleteSweep /></span>
                            <Link to={`/admin/sub/${s.slug}`}>
                                <FaRegEdit style={{ color: 'green' }} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SubCreate;

