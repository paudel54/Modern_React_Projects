import React from 'react';
import './body.scss';
import Header from '../header/Header';
import { useDataLayerValue } from '../../DataLayer';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Songrow from '../songrow/Songrow'

const Body = ({ spotify }) => {
    // pulling out data from data layer:
    const [{ discover_weekly }, dispatch] = useDataLayerValue();
    return (
        <div className='body'>
            <Header spotify={spotify} />
            <div className="body__info">
                <img src="https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/F7gdmTr2jk94I_jlyQ1R5IGfnWQHbfSp4V7nMWgl40369bn8n9Bn-xQvGRa7VfZEfPwtPCOzQmcGoxR8Mk3BVzoBXHNw192IVm4Sr5iLQYc=/MTU6MDE6MDFUMjEtMjEtMg==" alt="" />
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>
            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledWhiteIcon className='body_shuffle' />
                    <FavoriteIcon fontSize='large' />
                    <MoreHorizIcon />
                </div>
                {/* lists of songs */}
                {discover_weekly?.tracks.items.map(item => (
                    <Songrow track={item.track} />
                ))}
            </div>
        </div>
    )
}

export default Body
