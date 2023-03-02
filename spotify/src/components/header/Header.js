import React from 'react'
import './header.scss'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDataLayerValue } from '../../DataLayer';
const Header = () => {
    const [{ user }, dispatch] = useDataLayerValue();
    return (
        <div className='header'>
            <div className="header__left">
                <SearchIcon />
                <input placeholder='Search for Artists, Songs ' type="text" />
            </div>
            <div className="header__right">
                <AccountCircleIcon />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}

export default Header
