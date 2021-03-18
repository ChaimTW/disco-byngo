import React from 'react';
import { useDataLayerValue } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/global-state/DataLayer.js';
import './ModalPlaylistRow.css';

export function ModalPlaylistRow({ playlist, onCloseModal }) {
    // eslint-disable-next-line
    const [{ selectedPlaylist }, dispatch] = useDataLayerValue();

    function setSelectedPlaylist() {
        if(playlist.tracks.total < 30) {
            return alert(`It is recommended to select a playlist with 45 or more songs with a minimum of 30 songs. Try adding at least ${30 - playlist.tracks.total} songs to your ${playlist.name} playlist.`)
        } else {
            dispatch({
                type: "SET_SELECTED_PLAYLIST",
                selectedPlaylist: playlist
            })
            onCloseModal();
        }
        
    }

    return (
        <div className="playlist-row">
            <div className="playlist-info" onClick={setSelectedPlaylist}>
                <img src={playlist?.images[0]?.url} alt="playlist-cover" className="playlist-cover"></img>
                <h3 className="playlist-title">{playlist?.name}</h3>
            </div>
        </div>
    )
}