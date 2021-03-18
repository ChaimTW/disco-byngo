import React from 'react';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { useDataLayerValue } from '../../global-state/DataLayer';
import './Ceremony.css';

function Ceremony({ room, horizontalWinner, verticalWinner, diagonalWinner, blackoutWinner }) {
    const [{}, dispatch] = useDataLayerValue()

    function removeToken() {
        dispatch({
            type: "SET_TOKEN",
            token: null
        })
        window.location.href = "https://discobyngo.com/";
    }

    return (
        <div>
            <div className="container">
                <div className="login-details">
                    <div className="login-url">
                        <p>Thanks for playing!</p>
                        <br />
                        <h1>Winners 🎉</h1>
                    </div>    
                </div>
                
                <hr></hr>
                <div className="players-amount">
                    <h2>Horizontal ↔️</h2>
                </div>
                <div className="active-players">
                <div className="players">
                    <p>{horizontalWinner}...</p>     
                </div>
                </div>
                <hr></hr>
                <div className="players-amount">
                    <h2>Vertical ↕️</h2>
                </div>
                <div className="active-players">
                <div className="players">
                    <p>{verticalWinner}...</p>                  
                </div>
                </div>
                <hr></hr>
                <div className="players-amount">
                    <h2>Diagonal ↗️ </h2>
                </div>
                <div className="active-players">
                <div className="players">
                    <p>{diagonalWinner}...</p>                     
                </div>
                </div>
                <hr></hr>
                <div className="players-amount">
                    <h2>Blackout ⬛</h2>
                </div>
                <div className="active-players">
                <div className="players">
                    <p>{blackoutWinner}...</p>                    
                </div>
                </div>
                <hr></hr>
                <h4>Until next time!</h4>
                <br />
                <div className="button-next">
                   <AwesomeButton type="secondary" disabled={false} className="playlist-button" onPress={removeToken}>HOME</AwesomeButton>     
                </div>
                <br />
            </div>
        </div>
    )
}

export default Ceremony
