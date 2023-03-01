import './login.scss'
import { accessUrl } from '../../spotify';

const Login = () => {
    return (
        <div className="login" >
            {/* spotify logo */}
            <img className="image__back" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="logo" />
            {/* login with spotify btn */}
            <a href={accessUrl}>LOGIN WITH SPOTIFY</a>

        </div>
    )
}

export default Login
