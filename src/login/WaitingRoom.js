import React, { useState } from 'react';
import { useDataLayerValue } from '../global-state/DataLayer';
import './WaitingRoom.css';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

function WaitingRoom({ room, currentPlayers, setInLobby, socket, isHost }) {
    const [{ spotify }, dispatch] = useDataLayerValue();
    const [autoPlay, setAutoPlay] = useState(true);
    const shareURL = "https://byngo.netlify.app/join";
    
    function changeAutoPlay(e) {
        let isChecked = e.target.checked;
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
                        <h2>https://byngo.netlify.app/join<WhatsappShareButton url={shareURL}><WhatsappIcon round className="whatsapp-icon"></WhatsappIcon></WhatsappShareButton></h2>
                        
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
                {isHost === true ? <div><input id="c1" type="checkbox" defaultChecked={true} onChange={changeAutoPlay}></input>
    <label for="c1" i> Auto-play</label><AwesomeButton type="secondary" onPress={startGame} disabled={false} className="playlist-button">Start Game</AwesomeButton></div> : <h4>Waiting for the host to start the game...</h4>}
            </div>
        </div>
    )
}

export default WaitingRoom
