//Similar to Category Create!
// <div>
//     <div className='grid grid-cols-10'>
//         <div className='col-span-2'><AdminNav /></div>
//         <div className='col-span-8'> I am sub Create Page</div>
//     </div>

// </div>

import AdminNav from '../../../components/nav/AdminNav';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//creating element requires token to verify admin can only create so use create
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { createSub, getSub, updateSub } from "../../../components/functions/sub"
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';
import { getCategories } from "../../../components/functions/category"

import { useParams } from 'react-router-dom';

import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import { useNavigate } from 'react-router-dom';




const SubUpdate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    //categores contains list of object that we get from backend server getCategories();
    const [categories, setCategories] = useState([]);

    //this category holds the id of dropdown list from categories name:
    //would be send to backed to create Category
    const [category, setCategory] = useState("");

    const [parent, setParent] = useState('');

    let { slug } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        loadCategories();
        loadSub();
    }, [])

    const loadCategories = () =>
        getCategories().then((c) => setParent(c.data));

    const loadSub = () => getSub(slug).then((s) => {
        setName(s.data.name);
        setParent(s.data.parent);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        //this input form name should be submitted to our backend
        //console.log(name);
        //when form input is clicked submit it's loading and make async fn until then loading and afterward , its toggled to true
        setLoading(true);
        //sending name as an object
        updateSub({ name, parent: parent }, user.token)
            .then((res) => {
                //data from backend //console.log(res)
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is created`)
                //making sure ui is update
                // loadCategories();
                navigate('/admin/sub')
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }

    return (
        //UserNav and AdminNav has consistent layout
        <div className='bg-purple-200 font-bold border p-4 grid  grid-cols-4 '>
            <AdminNav />
            <div className="col-span-3 text-center flex flex-col items-center">
                {loading ? <h4 className='text-red-500 text-sm'>Loading.....</h4> : <h4>Update Sub Category</h4>}

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

                <hr className='mt-5' />
                {/* information from backend categories */}
                {/* {JSON.stringify(categories)} */}
                {/* Step5: use of search fn */}
            </div>
        </div>
    )
}
export default SubUpdate;


//march 18 strict discipline 