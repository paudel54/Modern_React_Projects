import React, { useState, useEffect } from 'react'
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { createOrUpdateUser } from "../../components/functions/auth";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    let dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        let { redirect } = location.state || {};
        // console.log('Lets see value in Location useEffect', location)
        // console.log('logging redirect data useEffect', redirect)
        if (redirect) {
            return;
        } else {
            if ((user && user.token)) navigate('/');
        }

    }, [user]);

    const roleBasedRedirect = (res) => {
        //check if intented page on 

        let { redirect } = location.state;
        // console.log('Lets see value in Location role based redirect', location)
        // console.log('checking the redirect value form cart role based', redirect)

        if (redirect) {
            navigate(`/${redirect}`);
        } else {
            //else section consists of prev working code
            if (res.data.role === 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('/user/history')
            }
        }

    }
    // making form submit handler an async function 
    const handleSubmit = async (e) => {
        setLoading(true);
        // send email with a link  : this is an event handler we provide event to execute
        e.preventDefault();
        // console.log(email, password)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            // console.log('this is result', result)
            // console.log('Hello sansrit si fuu!!!!!!!')
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult()

            // get response from server we created
            createOrUpdateUser(idTokenResult.token)
                // .then(res => console.log("create or update response", res))
                .then((res) => {
                    // console.log('RESPONSE FROM SERVER ', res)
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
                    roleBasedRedirect(res);
                })
                .catch();

            // dispatch({
            //     type: "LOGGED_IN_USER",
            //     payload: {
            //         email: user.email,
            //         token: idTokenResult.token
            //     }
            // });
            // console.log('you are about to navigate');
            // navigate('/');
            // role based redirect
        }
        catch (error) {
            // console.log(error);
            toast.error(error.message);
            setLoading(false);
        }

    };

    // sign in with google
    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result
                const idTokenResult = await user.getIdTokenResult();

                // dispatch({    !! previous version:
                //     type: "LOGGED_IN_USER",
                //     payload: {
                //         email: user.email,
                //         token: idTokenResult.token
                //     }
                // });
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
                        roleBasedRedirect(res);
                    })
                    .catch((e) => console.log(e));
                // redirect based on roles
                // navigate('/');
            })
            .catch((e) => {
                // console.log(e);
                toast.error(e.message);
            }
            );
    };

    return (
        <section className='bg-gray-300 h-screen'>
            <div className=' bg-gray-300 w-[70%] mx-auto h-full px-6 py-24'>
                <div className='g-6 flex h-full flex-wrap items-center justify-center md:gap-20 lg:justify-between '>
                    {/* left column container */}
                    <div className='mb-12  top-0 md:top-40 md:mb-0 md:w-8/12 lg:w-6/12 '>
                        <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/71f44f103620619.5f50e7c5d864d.jpg'
                            className=' w-full rounded-2xl h-[10rem]  md:h-[28rem] '
                            alt='Products' />
                    </div>
                    {/* Right column container with form */}
                    <div className='bg-blue-200 md:w-8/12 lg:ml-6 lg:w-5/12'>
                        <form onSubmit={handleSubmit} className='border rounded-2xl bg-gray-100 shadow-lg p-5'>
                            {loading ? <h2>Processing....</h2> : <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>}
                            <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
                            {/* Email */}
                            <div className="relative" >
                                <input
                                    p-2 mt-8 rounded-xl border
                                    type="text"
                                    value={email} onChange={(e) => setEmail(e.target.value)} autoFocus
                                    className="p-2 mt-8 rounded-xl border w-full"
                                    id="#"
                                    placeholder="Email" />
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="relative mb-6">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="p-2 mt-4 rounded-xl border w-full"
                                    id="#o"
                                    placeholder="Password" />
                            </div>
                            {/* <!-- Remember me checkbox --> */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        value=""
                                        id="exampleCheck3"
                                        checked />
                                    <label
                                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                        for="exampleCheck3">
                                        Remember me
                                    </label>
                                </div>

                                {/* <!-- Forgot password link --> */}
                                {/* <a
                                    href="#!"
                                    className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                >Forgot password?</a> */}
                                <Link to='/forgot/password' className='text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600'>Forgot Password?</Link>
                            </div>
                            {/* <!-- Submit button --> */}

                            <button onClick={handleSubmit} className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 w-full">Login</button>
                            {/* <!-- Divider --> */}
                            <div
                                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p
                                    className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                    OR
                                </p>
                            </div>

                            {/* <!-- Social login buttons --> */}
                            <button
                                onClick={googleLogin}
                                className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74] mb-5'>
                                {/* Added Google SVG ICON */}
                                <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                                    <path fill="#FFC107"
                                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                    <path fill="#FF3D00"
                                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                    <path fill="#4CAF50"
                                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                    <path fill="#1976D2"
                                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                </svg>
                                Login with Google
                            </button>
                            <a
                                className="mb-3 flex w-full items-center justify-center rounded-xl bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                style={{ backgroundColor: '#3b5998' }}
                                href="#!"
                                role="button"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                {/* <!-- Facebook --> */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-3.5 w-3.5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                                Continue with Facebook
                            </a>


                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
