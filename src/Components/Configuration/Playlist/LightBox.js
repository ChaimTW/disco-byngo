import React from 'react';
import './LightBox.css';
import { Navigation } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Navigation/Navigation.js';
import { SelectPlaylist } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Configuration/Playlist/SelectPlaylist.js';

export function LightBox({ spotify, socket }) {

    return (
        <div className="lightbox">
            <SelectPlaylist spotify={spotify}/>
            <Navigation socket={socket}/>
        </div>
    )
}