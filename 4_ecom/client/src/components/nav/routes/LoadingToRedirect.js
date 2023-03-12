import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let navigate = useNavigate()

    useEffect(() => {

        const interval = setInterval(() => {
            setCount((decreaseCount) => --decreaseCount);
        }, 1000);
        console.log('i executed this time', count)
        //redirect after count ==0
        count === 0 && navigate("/login")
        //cleanupc
        return () => clearInterval(interval);
    }, [count])

    return (
        <div className=' font-bold bg-red-400 text-white text-center py-32 h-screen w-screen flex justify-center items-center'>
            You are being Redirected.....{count}
            {console.log('rendered count value', { count })}
        </div>
    )
}

export default LoadingToRedirect;