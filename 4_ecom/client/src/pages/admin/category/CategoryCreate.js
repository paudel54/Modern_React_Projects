import AdminNav from '../../../components/nav/AdminNav';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//creating element requires token to verify admin can only create so use create
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { createCategory, getCategories, removeCategory } from "../../../components/functions/category"
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';

import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';




const CategoryCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    //categores contains list of object that we get from backend server getCategories();
    const [categories, setCategories] = useState([]);

    //searching and filtering
    //step1 add search keyword or query
    //step2 need input feild to search
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        //this input form name should be submitted to our backend
        //console.log(name);
        //when form input is clicked submit it's loading and make async fn until then loading and afterward , its toggled to true
        setLoading(true);
        //sending name as an object
        createCategory({ name }, user.token)
            .then((res) => {
                //data from backend //console.log(res)
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is created`)
                //making sure ui is update
                loadCategories();
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
            removeCategory(slug, user.token)
                .then(res => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`)
                    //refreshing page internally to show data after deletion
                    loadCategories();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        toast.error(err.response.data)
                    };
                }
                )
        }
    }

    //creating category Form UI
    // const categoryForm = () => (
    //     <form onSubmit={handleSubmit}>
    //         <div className='flex flex-col items-center'>
    //             <label className='block mb-2 mt-5 text-sm font-medium text-gray-900'> Name</label>
    //             <input type="text" className='mb-5 shadow appearance-none border rounded w-3/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
    //             <button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ">
    //                 Submit
    //             </button>
    //         </div>
    //     </form>
    // )

    //step3: handler to execute Search.
    // const handleSearchChange = (e) => {
    //     e.preventDefault()
    //     setKeyword(e.target.value.toLowerCase())
    // }

    //step4: 
    //checkes if the categories list contins incoming input keyword. 
    //arg keyword contins user input and contains the list of category when input and categores list matches
    //filter keyword returns the selected. 
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)


    return (
        //UserNav and AdminNav has consistent layout
        <div className='grid grid-cols-10 gap-8'>

            <div className='col-span-3'>
                <AdminNav />
            </div>
            <div className="col-span-7 text-center flex flex-col items-center">
                {loading ? <h4 className='text-red-500 text-sm'>Loading.....</h4> : <h4 className='font-bold -mb-3'>Create Category</h4>}
                {/* {categoryForm()} */}
                <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

                {/* step2 search input feild */}
                {/* the input feild is migrated into components localSearch  */}
                {/* <input className=" bg-green-300 w-1/5 mt-10 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 " type="search" placeholder='Search Items' value={keyword} onChange={handleSearchChange} /> */}
                {/* 8888888888888888localsearch component to work with reuseable code */}
                <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                <hr className='mt-1' />
                {/* information from backend categories */}
                {/* {JSON.stringify(categories)} */}
                {/* Step5: use of search fn */}
                {categories.filter(searched(keyword)).map((c) => (
                    <div className='bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-sm rounded-xl mb-2 p-4 flex w-1/2 justify-between' key={c._id}>
                        {c.name}
                        <div className='flex space-x-5 text-2xl items-center'>
                            <span onClick={() => (handleRemove(c.slug))} className='text-red-800 cursor-pointer'><MdDeleteSweep /></span>
                            <Link to={`/admin/category/${c.slug}`}>
                                <FaRegEdit style={{ color: 'green' }} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default CategoryCreate;
