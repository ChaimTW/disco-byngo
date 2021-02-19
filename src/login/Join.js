import React, { useState } from 'react';
import './Join.css';
import { Link } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

function Join({ socket }) {
    //Declare name and room as null
    const [userName, setUserName] = useState(null);
    const [userRoom, setUserRoom] = useState(null);

    //Update name when typing in inputfield
    function changeName(e) {
        setUserName(e.target.value);
    }

    //Update room when typing in inputfield
    function changeRoom(e) {
        setUserRoom(e.target.value);
    }

    // Send message to server to request access to room
    function joinRoom() {
        socket.emit('join_room', ({ userName, userRoom }))
    }

    return (
        <div className="join">
            <div className="input-container">
            <input className="input" placeholder="ENTER YOUR NAME" onChange={changeName} maxLength="12"></input>
            <input className="input" placeholder="ENTER ROOM CODE" onChange={changeRoom}></input>
            <Link to="/play"><div className="join-button" onClick={joinRoom}><AwesomeButton type="secondary" onPress={null} className="device-button track-button" >JOIN GAME</AwesomeButton></div></Link>
            </div>
        </div>
    )
}

export default Join
