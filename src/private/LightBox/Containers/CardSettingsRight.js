import React from 'react';
import './CardSettingsRight.css';
import Select from "react-dropdown-select";
import { useDataLayerValue } from '../../../global-state/DataLayer';

export function CardSettingsRight() {
    // eslint-disable-next-line
    const [{ players }, dispatch] = useDataLayerValue();
    const options = [
        {label: "2 players", value: 2, className: 'drop-down-item'},
        {label: "3 players", value: 3, className: 'drop-down-item'},
        {label: "4 players", value: 4, className: 'drop-down-item'},
        {label: "5 players", value: 5, className: 'drop-down-item'},
        {label: "6 players", value: 6, className: 'drop-down-item'},
        {label: "7 players", value: 7, className: 'drop-down-item'},
        {label: "8 players", value: 8, className: 'drop-down-item'},
        {label: "9 players", value: 9, className: 'drop-down-item'},
    ];

    function updatePlayerAmount(e) {
        let playersAmount = parseInt(e[0].label.substring(0, 1));

        dispatch({
            type: "SET_PLAYERS",
            players: playersAmount
        })
    }

    return (
        <div>
            <h1>Step 3: Players</h1>
            <br></br>
            <p>With how many people would you like to play?</p>
            <br></br>
            <hr></hr>
            <Select options={options} onChange={updatePlayerAmount} style={{color: "black", background: "white"}} className="drop-down"/>
            <img src="https://peoplique.com/wp-content/uploads/33308-1.png" alt="clock" className="clock-image"></img>
        </div>
    )
}