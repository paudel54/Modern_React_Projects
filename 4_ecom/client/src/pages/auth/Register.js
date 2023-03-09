// send a email link to register::::
import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    // making form submit handler an async function 
    const handleSubmit = async (e) => {
        // send email with a link  : this is an event handler we provide event to execute
        e.preventDefault();
        console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const config = {
            // url: 'http://localhost:3000/register/complete', 
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };


        await auth.sendSignInLinkToEmail(email, config)
        // once this process is completed 
        toast.success(`Email is sent to ${email}. CLick the link to complete your registeration.`);
        // also save user email to local storage
        window.localStorage.setItem('emailForRegistration', email)
        // after saving to local storage and submiting email for verification clear the email input or update state
        setEmail('');

    }
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if ((user && user.token)) navigate('/')
    }, [user]);


    return (
        <div className='bg-blue-300 h-full w-full absolute'>

            <div className='flex justify-center h-[80%] items-center'>
                <div className='drop-shadow-xl rounded-lg py-48 px-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                    <h1 className='text-2xl mb-4 font-bold text-white'>Register Here</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col items-start ">
                        <input placeholder='Enter your valid email ' className=" outline-none px-4 py-2 form-control rounded-sm" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
                        <button className='drop-shadow-xl mt-4 py-2 px-4 bg-rose-300 rounded-md' type='submit'> Register </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register
