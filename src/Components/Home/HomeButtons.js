import React from 'react';
import './HomeButtons.css';
import { loginUrl } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/spotify-api-logic/spotify-api-logic.js';
import { Link } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export function HomeButtons() {
    
    return(
        <div className="login">
            <a className="login-button" href={loginUrl}><AwesomeButton type="secondary" onPress={null} className="device-button" >CREATE NEW GAME</AwesomeButton></a>
            <h2>OR</h2>
            <Link to="/join"><div className="join-button"><AwesomeButton type="primary" onPress={null} className="device-button" >JOIN GAME</AwesomeButton></div></Link>
        </div>
    );
}

export default HomeButtons;