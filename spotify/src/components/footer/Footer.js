import React from 'react'
import './footer.scss';
const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer__left">
                <p>Album and Song details</p>
            </div>
            <div className="footer__center">
                <p>Player Controls</p>
            </div>
            <div className="footer__right">
                <p>Volume Controls</p>
            </div>
        </div>
    )
}

export default Footer
