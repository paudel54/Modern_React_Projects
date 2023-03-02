import React from 'react'
import './songrow.scss'
const Songrow = ({ track }) => {
    return (
        <div className='songRow'>
            <img src="" alt="" />
            <div className="songRow__info">
                <h1>{track.name}</h1>
            </div>
        </div>
    )
}

export default Songrow
