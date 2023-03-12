import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// {/* <Navigate to="/dashboard" replace={true} /> */ }
// if i take Naivgate import directly in app.js some how then. it can be made availale to anycomponents. 
import { createOrUpdateUser } from "../../components/nav/routes/functions/auth";

const RegisterComplete = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const { user } = useSelector((state) => ({ ...state }));



    useEffect(() => {
        // console.log(window.localStorage.getItem('emailForRegistration'))
        // console.log('i ran * times');
        // console.log(window.location.href);
        setEmail(window.localStorage.getItem("emailForRegistration"))
    }, []);
    // making form submit handler an async function 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation for form:
        if (!email || !password) {
            toast.error('Email and Password is Required!');
            return;
        }
        if (password.length < 6) {
            toast.error('Password length should be greater than 6 character. ');
            return;
        }


        //  sign in with email link: auth api browser url
        // 2nd arg is total url of email which can be grabbed with window.location.href: console to check it out
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            console.log(result);
            // checking if useris verified : enhanced security
            if (result.user.emailVerified) {
                // remove user email info from local storage
                window.localStorage.removeItem('emailForRegistration')
                // get user id token: later use with backend
                // advantage of firebase we can take up user directly from firebase if required!
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                console.log('user', user);
                console.log(idTokenResult);
                // we got user and json web token we can use to access secure route
                // populate user in redux store
                createOrUpdateUser(idTokenResult.token)
                    // .then(res => console.log("create or update response", res))
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                // token taking from client side:
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id
                            }

                        });
                    })
                    .catch((err) => console.log(err));
                // redirect
                navigate('/');

            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    // const Test = () => {
    //     <div className='bg-red-600 h-full w-full '> Hello i am design</div>
    // }
    return (
        <div className='bg-blue-300 h-full w-full absolute'>

            <div className='flex justify-center h-[80%] items-center'>
                <div className='drop-shadow-xl rounded-lg py-48 px-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                    <h1 className='text-2xl mb-4 font-bold text-white'>Email Verified ✅ </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col items-start ">
                        <input className="px-4 py-2  rounded-sm" type="email" value={email} disabled />
                        <input className="px-4 py-2 mt-2 rounded-sm outline-none" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Set Your Password" />
                        <button className=' mt-4 py-2 px-4 bg-rose-300 rounded-md shadow hover:shadow-lg hover:text-white hover:bg-blue-500 transition-all' type='submit'> Proceed </button>
                    </form>
                </div>
            </div>

        </div>

    )
}

export default RegisterComplete
