import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

import React, { useState } from 'react'
import { MdOutlineOnDeviceTraining, MdOutlineVibration } from 'react-icons/md';
import { WifiOutlined } from '@ant-design/icons';

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
                setPassword('');
                toast.success('Password Updated')
            })
            .catch(err => {
                setLoading(false);
                toast.error(err.message);
            })
    }

    const passwordUpdateForm = () => <form onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-4 items-center justify-center'>
            <label className='text-xl p-2 font-bold'>Enter Your New Password. </label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}
                className="outline-none border rounded-xl p-2"
                placeholder='Enter new Password'
                disabled={loading}
                value={password}
            />
            <button className='bg-green-600 px-2 py-1 rounded text-white text-sm' disabled={!password || loading}>Submit</button>
        </div>
    </form>;

    return (
        <div className='border grid  grid-cols-4 '>
            <UserNav />
            <div className="col-span-3">
                {loading ? <h4 className='text-red-700'>Loading....</h4> : <h4 className='text-2xl mb-5 text-red-800 text-center mt-10 font-bold'>Password Update</h4>}
                {passwordUpdateForm()}
            </div>


        </div>
    )
}

export default Password
