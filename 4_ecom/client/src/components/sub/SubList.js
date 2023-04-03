import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getSubs } from '../functions/sub';

const SubList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs()
            .then(res => {
                setSubs(res.data)
                setLoading(false)
            })
    }, []);

    const showSubs = () => subs.map((s) => <div key={s._id} className='bg-blue-300 p-4 shadow-lg m-3 w-40 text-center'>
        <Link to={`/sub/${s.slug}`}>
            {/* {console.log('Value of S is', s)} */}
            {s.name}
        </Link>

    </div>)

    return (
        <div>
            <div className='flex justify-evenly'>
                {loading ? <h1>Loading....</h1> : showSubs()}
            </div>
        </div>
    )
}

export default SubList;
