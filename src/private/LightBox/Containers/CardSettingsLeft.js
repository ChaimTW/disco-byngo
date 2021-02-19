import React from 'react';
import { useDataLayerValue } from '../../../global-state/DataLayer';
import Select from "react-dropdown-select";
import './CardSettingsLeft.css';

export function CardSettingsLeft() {
    const [{ selectedPlaylist }, dispatch] = useDataLayerValue();

    const options = [
        {label: "45 minutes", value: 2, className: 'drop-down-item'},
        {label: "60 minutes", value: 3, className: 'drop-down-item'}
    ];

    function calculateSongAmount(e) {
        let minutes = parseInt(e[0].label.substring(0, 2));
        let songAmount = Math.ceil((minutes * 60) / 80);

        if(selectedPlaylist.tracks.total < songAmount) {
            return alert("Not enough songs in playlist. To play a " + e[0].label + " bingo you need at least " + songAmount + " songs!")
        }
        
        dispatch({
            type: "SET_INCLUDE_AMOUNT",
            includeAmount: songAmount
        })
    }

    return (
        <div>
            <h1>Step 2: Duration</h1>
            <br></br>
            <p>How long do you want your bingo game to be?</p>
            <br></br>
            <hr></hr>
            <Select options={options} onChange={calculateSongAmount} style={{color: "black", background: "white"}} className="drop-down"/>
            <img src="https://www.pngkit.com/png/full/333-3335263_browser-history-clock-icon-vector-white.png" alt="clock" className="clock-image"></img>
        </div>
    )
}