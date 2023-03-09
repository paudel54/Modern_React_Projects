import React, { useState } from 'react'
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    // making form submit handler an async function 
    const handleSubmit = async (e) => {
        setLoading(true);
        // send email with a link  : this is an event handler we provide event to execute
        e.preventDefault();
        // console.log(email, password)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            console.log('this is result', result)
            // console.log('Hello sansrit si fuu!!!!!!!')
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult()

            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            });
            console.log('you are about to navigate');
            navigate('/');
        }
        catch (error) {
            console.log(error);
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

                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: user.email,
                        token: idTokenResult.token
                    }
                });
                navigate('/');
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.message);
            }
            );
    };

    return (
        <div className='bg-blue-300 h-full w-full absolute'>

            <div className='flex justify-center h-[80%] items-center'>
                <div className='drop-shadow-xl rounded-lg py-48 px-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                    {/* implement conditional rendering for login if login not success put loading */}

                    {loading ? <h2>Processing.....</h2> : <h1 className='text-2xl mb-4 font-bold text-white'>Login Details</h1>}
                    {/* <h1 className='text-2xl mb-4 font-bold text-white'>Login Details</h1> */}
                    <form onSubmit={handleSubmit} className="flex flex-col items-start ">
                        <input placeholder='Enter your valid email ' className=" outline-none px-4 py-2 form-control rounded-sm" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
                        <input placeholder='Password ' className="mt-2 outline-none px-4 py-2 form-control rounded-sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={handleSubmit} className='hover:shadow-lg hover:bg-blue-500 hover:text-white transition-all mt-4 py-2 px-4 w-[12rem] bg-rose-300 rounded-lg' type='submit' > Login with Email </button>
                        <button onClick={googleLogin} className='hover:shadow-lg hover:bg-blue-500 hover:text-white transition-all mt-2 py-2 px-4 w-[12rem] bg-green-400 rounded-lg' type='submit' > Login with Google</button>
                    </form>
                    <Link to='/forgot/password' className='text-white p-2 float-right mr-7'>Forgot Password?</Link>

                    {/* if bug occurs check button onClick={handleSubmite} */}
                </div >
            </div >

        </div >
    )
}

export default Login
