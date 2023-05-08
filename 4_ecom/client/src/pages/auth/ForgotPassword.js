import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
// checking user status to net let user to go to forget password with browser URL
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) navigate('/')
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: 'http://localhost:3000/login',
            handleCodeInApp: true,
        }

        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                // wipe out the data fields
                setEmail('')
                setLoading(false)
                toast.success('Check Your Email For Password Reset Link');
            })
            .catch((e) => {
                setLoading(false);
                setLoading(false);
                toast.error(e.message);
                console.log("error from Forgot Password", e);
            })
    }

    return <div className='bg-gradient-to-r from-blue-200 to-cyan-200 h-screen w-screen absolute'>
        <div className='bg-gradient-to-r from-cyan-500 to-blue-500 w-1/2 h-1/2 mx-auto mt-[16rem] border rounded-lg min-w-[10rem]'>
            <div className='flex flex-col lg:flex-row  items-center justify-center py-36 lg:mt-[4rem]'>
                {loading ? <h2 className='text-white text-xl font-bold'>loading....</h2> : <h2 className='text-white mr-20 font-bold text-xl mb-6 lg:mb-0'>Forgot Password</h2>}

                <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                    <input className='p-2 w-80 outline-none border rounded-xl' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
                    <button className='shadow bg-green-400 rounded text-white p-2'>Submit</button>
                </form>
            </div>
        </div>
    </div>

}

export default ForgotPassword;  