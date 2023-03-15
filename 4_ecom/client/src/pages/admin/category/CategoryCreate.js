import AdminNav from '../../../components/nav/AdminNav';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//creating element requires token to verify admin can only create so use create
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { createCategory, getCategories, removeCategory } from "../../../components/functions/category"
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';




const CategoryCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);

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
    const categoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-center'>
                <label className='block mb-2 mt-5 text-sm font-medium text-gray-900'> Name</label>
                <input type="text" className='mb-5 shadow appearance-none border rounded w-3/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
                <button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ">
                    Submit
                </button>
            </div>
        </form>
    )


    return (
        //UserNav and AdminNav has consistent layout
        <div className='bg-purple-200 font-bold border p-4 grid  grid-cols-4 '>
            <AdminNav />
            <div className="col-span-3 text-center flex flex-col items-center">
                {loading ? <h4 className='text-red-500 text-sm'>Loading.....</h4> : <h4>Create Category</h4>}
                {categoryForm()}
                <hr className='mt-5' />
                {/* information from backend categories */}
                {/* {JSON.stringify(categories)} */}
                {categories.map((c) => (
                    <div className='bg-gray-400 mb-2 p-4 flex w-1/2 justify-between' key={c._id}>
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
