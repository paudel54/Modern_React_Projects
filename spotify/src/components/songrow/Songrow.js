import React from 'react'
import './songrow.scss'
const Songrow = ({ track }) => {
    return (
        <div className='songRow'>
            <img className='songRow__album' src="https://pbs.twimg.com/media/FjOt_wHaUAEF751?format=jpg&name=large" alt="" />
            <div className="songRow__info">
                <h1>{track.name}</h1>
                <p>
                    {track.artists.map((artist) => artist.name).join(',')}
                    {track.album.name}
                </p>
            </div>
        </div>
    )
}

export default Songrow
