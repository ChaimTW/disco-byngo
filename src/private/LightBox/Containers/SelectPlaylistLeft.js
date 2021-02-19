import React from 'react';
import { useDataLayerValue } from '../../../global-state/DataLayer';
import './SelectPlaylistLeft.css';

export function SelectPlaylistLeft() {
    const [{ selectedPlaylist }] = useDataLayerValue();

    return (
        <div>
            <h1>Select a playlist</h1>
            <br></br>
            <p>On the right you can see your Spotify playlists.
                Click on the playlist that you would like to use for your Spotify Bingo game.
                Once you have made your selection click the "Next" button on the bottom right corner of this window.
                On the next page you will decide upon the Bingo card settings.
            </p>
            <br></br>
            <hr></hr>
            {selectedPlaylist == null ? <div className="not-selected-playlist"><p>Select a playlist...</p></div> : 
            <div className="selected-playlist-info">
                <img className="selected-playlist-cover" src={selectedPlaylist?.images[0]?.url} alt="playlist-cover"></img>
                <div className="info">
                    <p><strong>Name: </strong>{selectedPlaylist.name}</p>
                    <p><strong>Tracks: </strong>{selectedPlaylist.tracks.total}</p>
                    <p><strong>Owner: </strong>{selectedPlaylist.owner.display_name}</p>
                    <p><strong>ID: </strong>{selectedPlaylist.id}</p>
                </div> 
            </div>
            }       
        </div>
    )
}