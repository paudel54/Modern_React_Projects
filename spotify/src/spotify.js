// logic
// https:developer.spotify.com 
// webplayback-sdk-quick-start
// endpoints for authorize
export const authEndpoint = "https://accounts.spotify.com/authorize";

// redirects to localhost after login
const redirectUri = "http://localhost:3000/";

const clientId = "041254b1d5054f9d85eeee4e51f2fd72"

// scopes that screen sowing will allow this

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
    return window.location.hash
        // lets say::  #accessToken=keys1231234&name=paudelldfj&...
        // substring(1)=> deletes # and output: accessToken=key122132131&...
        // .split&=> accessToken=keys1231234
        // .reduce
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=')
            // produces: [accessToken, keys1231234] so we need parts[1] to store in accumulator 
            initial[parts[0]] = decodeURIComponent(parts[1])
            return initial;
        }, {});
}

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20")}&response_type=token&show_dialog=true`;
