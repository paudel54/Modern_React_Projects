import './App.css';
import Login from './components/login/Login';
import Player from "./components/player/Player";
import { useEffect, useState } from 'react';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
// importing reducer data layer data
import { useDataLayerValue } from './DataLayer';

// creating instance form web api
// use key with api to allow spotify to connect with react
const spotify = new SpotifyWebApi();

function App() {
  // useSate how we handle var in react
  // const [_token, setToken] = useState(null);

  // grabbing out from data layer: 
  // pulling data from data layer
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    console.log(
      'Use Effect activated'
    )
    const hash = getTokenFromUrl();
    // console.log(hash)
    // hiding the acces token from browser url
    window.location.hash = "";
    // console.log("I have token 🍺", hash);
    const _token = hash.access_token;
    // console.log(_token);
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      })
      // setToken(_token);
      // communicate to api with spotify web api: 
      spotify.setAccessToken(_token);
      spotify.getMe().then(
        (user) => {
          // console.log("user", user)
          // dispatch into reducer to update user in reducer fn
          dispatch({
            type: 'SET_USER',
            user: user,
          })
        }
      );
      spotify.getUserPlaylists().then((playlists) => (
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists
        })
      ))
    }

  }, []);
  // console.log("man", user)
  // console.log("📃", token)
  return (
    <div className="app">
      {
        token ? (<Player />) : (<Login />)
      }
      <Login />

    </div>

  );
}

export default App;
