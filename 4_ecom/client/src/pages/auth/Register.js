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
        <div className='bg-gradient-to-r from-blue-200 to-cyan-200 h-full w-full absolute'>

            <div className='flex justify-center h-[80%] items-center'>
                <div className='drop-shadow-xl rounded-lg py-48 px-28 bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col md:flex-row items-center justify-center gap-10'>
                    <h1 className='text-2xl mb-4 font-bold text-white'>Register Your Email</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col  ">
                        <input placeholder='Enter your valid email ' className=" outline-none px-4 py-2 form-control border rounded-xl" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
                        <button className='mt-2 shadow bg-green-400 rounded-xl text-white p-2' type='submit'> Register </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register


