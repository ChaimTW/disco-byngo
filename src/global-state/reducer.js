export const initialState = {
    spotify: undefined,
    user: undefined,
    playlists: [],
    token: null,
    refreshToken: null,
    currentItem: "select-playlist",
    selectedPlaylist: null,
    devices: [],
    selectedDevice: null,
    playtime: 80,
    includeAmount: 50,
    players: 2,
    shuffledTracksAll: [],
    includedTracks: [],
    socket: null,
    autoPlay: true,
}


const reducer = (state, action) => {

    switch(action.type) {
        case "SET_SPOTIFY":
            return {
                ...state,
                spotify: action.spotify
            }
        case "SET_USER":
            return {
                ...state,
                user: action.user
            };
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token
            };
        case "SET_REFRESH_TOKEN":
            return {
                ...state,
                refreshToken: action.refreshToken
            }
        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists
            };
        case "SET_CURRENT_ITEM":
            return {
                ...state,
                currentItem: action.currentItem
            };
        case "SET_SELECTED_PLAYLIST":
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist
            };
        case "SET_PLAYTIME":
            return {
                ...state,
                playtime: action.playtime
            };
        case "SET_INCLUDE_AMOUNT":
            return {
                ...state,
                includeAmount: action.includeAmount
            };
        case "SET_PLAYERS":
            return {
                ...state,
                players: action.players
            };
        case "SET_SHUFFLED_TRACKS_ALL":
            return {
                ...state,
                shuffledTracksAll: action.shuffledTracksAll
            }
        case "SET_INCLUDED_TRACKS":
            return {
                ...state,
                includedTracks: action.includedTracks
            }
        case "SET_DEVICES":
            return {
                ...state,
                devices: action.devices
            }
        case "SELECTED_DEVICE":
            return {
                ...state,
                selectedDevice: action.selectedDevice
            }
        case "SET_AUTO_PLAY":
            return {
                ...state,
                autoPlay: action.autoPlay
            }
        default: return state;
    }
}

export default reducer;