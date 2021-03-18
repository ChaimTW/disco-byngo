import React, { useState } from 'react';
import { useDataLayerValue } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/global-state/DataLayer.js';
import './WaitingRoom.css';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

function WaitingRoom({ room, currentPlayers, setInLobby, socket, isHost }) {
    const [{}, dispatch] = useDataLayerValue();
    const [autoPlay, setAutoPlay] = useState('full');
    const shareURL = "https://discobyngo.com/join";
    
    function changeAutoPlay(e) {
        let isChecked = e.target.value;
        setAutoPlay(isChecked);
    }

    function startGame() {
        dispatch({
            type: "SET_AUTO_PLAY",
            autoPlay: autoPlay
        });
        socket.emit('start_game', room);
    }

    return (
        <div>
            <div className="container">
                <div className="login-details">
                    <div className="room-code">
                        <h4>Room code</h4>
                        <h1>{room}</h1>
                    </div>
                    <div className="login-url">
                        <p>Join at</p>
                        <h2>discobyngo.com/join<WhatsappShareButton url={shareURL}><WhatsappIcon round className="whatsapp-icon"></WhatsappIcon></WhatsappShareButton></h2>
                        
                    </div>    
                </div>
                
                <hr></hr>
                <div className="players-amount">
                    <h2>Players</h2>
                    <h3>{currentPlayers.length}</h3>
                </div>
                <div className="active-players">
                <div className="players">
                                {currentPlayers.map((player, index) => {
                                if(player.host){
                                    return <div className="player-row" key={index}><CakeIcon></CakeIcon><p><strong>{player.userName}</strong><i> created this game...</i></p></div>
                                } else {
                                    return <div className="player-row" key={index}><PersonIcon></PersonIcon><p><strong>{player.userName}</strong> <i> joined the game...</i></p></div>
                                }
                            })}
                            </div>
                </div>
                <hr></hr>
                {isHost === true ? <div><input type="radio" id="full" name="playback" value="full" onChange={changeAutoPlay} defaultChecked={true}></input>
                <label for="full">Auto-skip (full songs)</label><br />
                <input type="radio" id="quick" name="playback" value="quick" onChange={changeAutoPlay}></input>
                <label for="quick">Auto-skip (80 seconds)</label><br />
                <input type="radio" id="manual" name="playback" value="manual" onChange={changeAutoPlay}></input>
                <label for="manual">Manual</label><AwesomeButton type="secondary" onPress={startGame} disabled={false} className="playlist-button">Start Game</AwesomeButton></div> : <h4>Waiting for the host to start the game...</h4>}
            </div>
        </div>
    )
}

export default WaitingRoom
