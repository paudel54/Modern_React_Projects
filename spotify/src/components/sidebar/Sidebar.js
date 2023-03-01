import './sidebar.scss'
import SidebarOption from '../sidebarOption/SidebarOption'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="log" />
            <SidebarOption Icon={HomeIcon} title="Home" />
            <SidebarOption Icon={SearchIcon} title="Search" />
            <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
            <br />
            <strong className='sidebar__title'>PLAYLIST</strong>
            <hr />
            <SidebarOption title="Country" />
            <SidebarOption title="Pop" />
            <SidebarOption title="Hip-Hop" />
        </div>


    )
}

export default Sidebar
