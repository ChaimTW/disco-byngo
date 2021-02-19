import React from 'react';
import { useDataLayerValue } from '../../../../global-state/DataLayer';
import './PlaylistRow.css';

export function PlaylistRow({ playlist, onCloseModal }) {
    // eslint-disable-next-line
    const [{ selectedPlaylist }, dispatch] = useDataLayerValue();

    function setSelectedPlaylist() {
        dispatch({
            type: "SET_SELECTED_PLAYLIST",
            selectedPlaylist: playlist
        })
        onCloseModal();
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