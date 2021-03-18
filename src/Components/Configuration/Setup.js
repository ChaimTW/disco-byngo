import React from 'react';
import './Setup.css';
import 'react-dropdown/style.css';
import { Navigation } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Navigation/Navigation.js';
import { SelectPlaylist } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Configuration/Playlist/SelectPlaylist.js';

export function Setup({ spotify, socket }) {

    return(
        <div className="body">
            <SelectPlaylist spotify={spotify}/>
            <Navigation socket={socket}/>
        </div>
    )
}