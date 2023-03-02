import React from 'react'
import './body.scss'
import Header from '../header/Header'
const Body = ({ spotify }) => {
    return (
        <div className='body'>
            <Header spotify={spotify} />
        </div>
    )
}

export default Body
