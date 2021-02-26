import React, { useEffect, useState, useRef } from 'react';
import './Lobby.css';
import WaitingRoom from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Game/WaitingRoom/WaitingRoom.js';
import Play from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Game/Play/Play.js';
import Ceremony from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Ceremony/Ceremony.js';
import { useBeforeunload } from 'react-beforeunload';
import { Prompt } from 'react-router';
import { indigo } from '@material-ui/core/colors';

let memUserName;
let memRoom;
let memPaused = null;

let memTracks = null;
let hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

function Lobby({ socket }) {
    const [currentPlayers, setCurrentPlayers] = useState([]);
    const [room, setRoom] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [inLobby, setInLobby] = useState(true);
    const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState(null);
    const [playedTracks, setPlayedTracks] = useState([]);
    const [paused, setPaused] = useState(null);
    const [isHost, setIsHost] = useState(false);
    const [roomInfo, setRoomInfo] = useState({});
    const [userName, setUserName] = useState(null);
    const [inCeremony, setInCeremony] = useState(false);
    const [horizontalWinner, setHorizontalWinner] = useState('No one had a horizontal bingo');
    const [verticalWinner, setVerticalWinner] = useState('No one had a vertical bingo');
    const [diagonalWinner, setDiagonalWinner] = useState('No one had a diagonal bingo');
    const [blackoutWinner, setBlackoutWinner] = useState('No one had a blackout bingo');

    let horizontalWinnerRef = useRef();
    let verticalWinnerRef = useRef();
    let diagonalWinnerRef = useRef();
    let blackoutWinnerRef = useRef();

    // const isVisible = usePageVisibility();
    function handleVisibilityChange() {
        if (document[hidden]) {
            socket.disconnect();
        } else {
            socket.connect();
            socket.emit('join_room', ({ userName: memUserName, userRoom: memRoom }));
            }
      }

    useBeforeunload(() => "Are you sure you want to quit the game? You will lose your progress!");

    // When socket receives 'update' event, update states
    useEffect(() => {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);  

        socket.on('room_info', ({ room, roomInfo, userName }) => {
            memUserName = userName;
            memRoom = room;
            setUserName(userName);
            setRoomInfo(roomInfo);
            setCurrentPlayers(roomInfo.players);
            setRoom(room);
            setCurrentlyPlayingTrack(roomInfo.currentlyPlayingTrack);
            setPlayedTracks(roomInfo.playedTracks);
            if(paused === null && memPaused === null) {
                memPaused = roomInfo.paused;
                setPaused(roomInfo.paused);
            }
            setInLobby(roomInfo.inLobby);
            setInCeremony(roomInfo.inCeremony);

            if(memTracks === null) {
                let copiedTracksArray = JSON.parse(JSON.stringify(roomInfo.tracks));
                shuffleArr(copiedTracksArray);
                setTracks(copiedTracksArray);
                memTracks = roomInfo.tracks;
            }            

            for(let i = 0; i < roomInfo.players.length; i++) {
                if(roomInfo.players[i].host) {
                    if(roomInfo.players[i].userName === userName) {
                        setIsHost(true)
                    } else {
                        return
                    }
                }
            }
        });

        socket.on('players_update', ({ roomInfo }) => {
            setCurrentPlayers(roomInfo.players);
        });

        socket.on('start_game', () => {
            setInLobby(false)
        });

        socket.on('player_left', ({ socketId, roomPlayers }) => {
            let updatedPlayers = []
            for(let i = 0; i < roomPlayers.length; i++){
                if(roomPlayers[i].id !== socketId){
                    updatedPlayers.push(roomPlayers[i]);
                }
            }
            setCurrentPlayers(updatedPlayers);
        });

        socket.on('end_game', (bingos) => {
            horizontalWinnerRef.current = bingos.horizontal.winner;
            verticalWinnerRef.current = bingos.vertical.winner;
            diagonalWinnerRef.current = bingos.diagonal.winner;
            blackoutWinnerRef.current = bingos.blackout.winner;

            if(bingos.horizontal.winner !== null) {
                
                setHorizontalWinner(horizontalWinnerRef.current);
            }
            
            if(bingos.vertical.winner !== null) {
                
                setVerticalWinner(verticalWinnerRef.current);
            }
            
            if(bingos.diagonal.winner !== null) {
                
                setDiagonalWinner(diagonalWinnerRef.current);
            }
            
            if(bingos.blackout.winner !== null) {
                
                setBlackoutWinner(blackoutWinnerRef.current);
            }
            
            setInCeremony(true);
            setInLobby(false);
        })

        socket.on("disconnect", function() {
            console.log("Disconnected");
            // socket.connect();
          });
          
        socket.on("reconnect", function() {
        console.log("Reconnecting");
        
        });

    }, []);
    
    function shuffleArr (array){
        for (var i = array.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            [array[i], array[rand]] = [array[rand], array[i]]
        }
    }

    return (
        <div>
            <Prompt
            when={true}
            message='Are you sure you want to quit the bingo game?'
            />
            {!inLobby && !inCeremony && <Play tracks={tracks} socket={socket} currentPlayers={currentPlayers} currentlyPlayingTrack={currentlyPlayingTrack} playedTracks={playedTracks} paused={paused} setPaused={setPaused} inLobby={inLobby} setInLobby={setInLobby} setInCeremony={setInCeremony} isHost={isHost} room={room} roomInfo={roomInfo} userName={userName}/>}
            {inLobby && <WaitingRoom room={room} currentPlayers={currentPlayers} setInLobby={setInLobby} socket={socket} isHost={isHost} />}
            {inCeremony && !inLobby && <Ceremony room={room} horizontalWinner={horizontalWinner} verticalWinner={verticalWinner} diagonalWinner={diagonalWinner} blackoutWinner={blackoutWinner} />}
        </div>
    )
}

export default Lobby
