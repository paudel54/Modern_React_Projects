import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

import React, { useState } from 'react'

const Password = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(password);
        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false);
                toast.success('Password Updated')
            })
            .catch(err => {
                setLoading(false);
                toast.error(err.message);
            })
    }

    const passwordUpdateForm = () => <form onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-4 items-center justify-center'>
            <label className='text-xl p-2'>Your Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}
                className="outline-none border border-rounded ml-5 p-2"
                placeholder='Enter new Password'
                disabled={loading}
            />
            <button className='bg-red-300 px-2 py-1 rounded text-gray-600 ml-2' disabled={!password || loading}>Submit</button>
        </div>
    </form>;
    return (
        <div className='bg-green-200 font-bold border p-4 grid  grid-cols-4 '>
            <UserNav />
            <div className="col-span-3">
                {loading ? <h4 className='text-red-700'>Loading....</h4> : <h4 className='text-2xl mb-5 text-red-800'>Password Update</h4>}
                {passwordUpdateForm()}

            </div>


        </div>
    )
}

export default Password
