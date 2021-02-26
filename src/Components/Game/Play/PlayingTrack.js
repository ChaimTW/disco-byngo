import React from 'react';
import './PlayingTrack.css';

function PlayingTrack({ currentTrack }) {
    return (
        <div className="playing-container">
            <img src={currentTrack.track.album.images[2].url} alt="cover"></img>
            <div className="title-artist">
                <strong>{currentTrack.track.name}</strong>
                <p>{currentTrack.track.artists[0].name}</p>
            </div>
        </div>
    )
}

export default PlayingTrack
