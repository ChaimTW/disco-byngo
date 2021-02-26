require('dotenv').config();
const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "752d45e7985547d2bff2862e53ed001c";
const scopes = 'user-read-email user-read-playback-state app-remote-control user-read-currently-playing user-follow-read user-read-playback-position playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative streaming';

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=')
            initial[parts[0]] = decodeURIComponent(parts[1])
            return initial;
        }, {})
}

export const loginUrl = `${authEndpoint}?response_type=token&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;