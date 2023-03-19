//similar temp to subCreate!
import AdminNav from '../../../components/nav/AdminNav';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//creating element requires token to verify admin can only create so use create
import { useSelector } from 'react-redux';
import { getSub, updateSub } from "../../../components/functions/sub"
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';
import { getCategories } from "../../../components/functions/category"

import { useParams } from 'react-router-dom';

import CategoryForm from '../../../components/forms/CategoryForm';
import { useNavigate } from 'react-router-dom';




const SubUpdate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    //categores contains list of object that we get from backend server getCategories();
    const [categories, setCategories] = useState([]);

    //this parent holds the id of dropdown list from categories name:
    //would be send to backed to create Category
    const [parent, setParent] = useState('');

    let { slug } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        loadCategories();
        loadSub();
    }, [])

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

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
        updateSub(slug, { name, parent: parent }, user.token)
            .then((res) => {
                //data from backend //console.log(res)
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is Updated`)
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
                        onChange={(e) => setParent(e.target.value)}
                    >
                        {/* <option value="">Cat 1</option> */}
                        <option>Please Select</option>
                        {categories.length > 0 && categories.map((c) => (
                            // adding checked for category defalut load for parent!
                            <option key={c._id} value={c._id} selected={c._id === parent} >{c.name}</option>
                        ))}

                    </select>
                </div>
                {/* shows up parent category ID: */}
                {/* {JSON.stringify(category)} */}

                {/* {categoryForm()} */}
                <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
            </div>
        </div>
    )
}
export default SubUpdate;
