const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://byngo.netlify.app/";
const clientId = "28f71a33ef684133b6e6a1f9634d39cb";
const scopes = 'user-read-private user-read-email ugc-image-upload user-read-recently-played user-read-playback-state user-top-read app-remote-control playlist-modify-public user-modify-playback-state playlist-modify-private user-follow-modify user-read-currently-playing user-follow-read user-library-modify user-read-playback-position playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative streaming';

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