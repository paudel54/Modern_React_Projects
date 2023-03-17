import AdminNav from '../../../components/nav/AdminNav';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//creating element requires token to verify admin can only create so use create
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
//import single category getcategory
import { createCategory, getCategory, updateCategory } from "../../../components/functions/category"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//importing refactored form reuseable component
import CategoryForm from '../../../components/forms/CategoryForm';



const CategoryUpdate = ({ match }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    let { slug } = useParams();
    useEffect(() => {
        loadCategory();
        // console.log('Its a match', slug)
    }, [])

    const loadCategory = () =>
        //updates the name variable stored by setter function.
        getCategory(slug).then((c) => setName(c.data.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        //this input form name should be submitted to our backend
        //console.log(name);
        //when form input is clicked submit it's loading and make async fn until then loading and afterward , its toggled to true
        setLoading(true);
        //sending name as an object
        updateCategory(slug, { name }, user.token)
            .then((res) => {
                //data from backend //console.log(res)
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is updated`)
                //navigate to admin categroy section after editing
                navigate('/admin/category');
                // loadCategories();
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
                {loading ? <h4 className='text-red-500 text-sm'>Loading.....</h4> : <h4>Update Category</h4>}
                <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
                <hr className='mt-5' />
            </div>
        </div>
    )
}
export default CategoryUpdate;
