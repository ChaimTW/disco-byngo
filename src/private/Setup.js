import React from 'react';
import './Setup.css';
import 'react-dropdown/style.css';
import { Header } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/private/Header/Header.js';
import { LightBox } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/private/LightBox/LightBox.js';

export function Setup({ spotify, socket }) {

    return(
        <div className="body">
            <LightBox spotify={spotify} socket={socket} className="lightbox"/>
        </div>
    )
}