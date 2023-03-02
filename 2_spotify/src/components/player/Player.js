import './player.scss';
import Sidebar from '../sidebar/Sidebar';
import Body from '../body/Body'
import Footer from '../footer/Footer';

const Player = ({ spotify }) => {
    return (
        <div className="Player">
            <div className="player__body">
                <Sidebar />
                <Body spotify={spotify} />
                {/* Sidebar */}
                {/* Body */}


            </div>
            {/* Footer */}
            <Footer />
        </div>
    )
}
export default Player
