import React, { useEffect, useState } from 'react';
import './Lobby.css';
import WaitingRoom from './WaitingRoom';
import Play from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Play/Play.js';
import { useBeforeunload } from 'react-beforeunload';
import { Prompt } from 'react-router';

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
    const [tracks, setTracks] = useState([]);
    const [inLobby, setInLobby] = useState(true);
    const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState(null);
    const [playedTracks, setPlayedTracks] = useState([]);
    const [paused, setPaused] = useState(true);
    const [isHost, setIsHost] = useState(false);
    const [roomInfo, setRoomInfo] = useState({});
    const [userName, setUserName] = useState(null);

    // const isVisible = usePageVisibility();
    function handleVisibilityChange() {
        if (document[hidden]) {
            console.log('page not visible');
            socket.disconnect();
        } else {
            socket.connect();
            socket.emit('rejoin_room', ({ userName: userName, userRoom: room }))
            }
      }

    useBeforeunload(() => "Are you sure you want to quit the game? You will lose your progress!");

    // When socket receives 'update' event, update states
    useEffect(() => {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);   

        socket.on('room_info', ({ room, roomInfo, userName }) => {
            setUserName(userName);
            setRoomInfo(roomInfo);
            setCurrentPlayers(roomInfo.players);
            setRoom(room);
            // setTracks(roomInfo.tracks);
            setCurrentlyPlayingTrack(roomInfo.currentlyPlayingTrack);
            setPlayedTracks(roomInfo.playedTracks);
            setPaused(roomInfo.paused);
            setInLobby(roomInfo.inLobby);

            let copiedTracksArray = JSON.parse(JSON.stringify(roomInfo.tracks));
            shuffleArr(copiedTracksArray);
            setTracks(copiedTracksArray);

            for(let i = 0; i < roomInfo.players.length; i++) {
                console.log(roomInfo.players);
                if(roomInfo.players[i].host) {
                    if(roomInfo.players[i].userName === userName) {
                        setIsHost(true)
                    } else {
                        return
                    }
                }
            }
        });

        socket.on('rejoin_room_info', ({ room, roomInfo, userName }) => {
            setUserName(userName);
            setRoomInfo(roomInfo);
            setCurrentPlayers(roomInfo.players);
            setRoom(room);
            setCurrentlyPlayingTrack(roomInfo.currentlyPlayingTrack);
            setPlayedTracks(roomInfo.playedTracks);
            setPaused(roomInfo.paused);
            setInLobby(roomInfo.inLobby);

            for(let i = 0; i < roomInfo.players.length; i++) {
                console.log(roomInfo.players);
                if(roomInfo.players[i].host) {
                    if(roomInfo.players[i].userName === userName) {
                        setIsHost(true)
                    } else {
                        return
                    }
                }
            }
        })

        socket.on('players_update', ({ roomInfo }) => {
            setCurrentPlayers(roomInfo.players)
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

        socket.on("disconnect", function() {
            console.log("Disconnected");
            socket.connect();
          });
          
        socket.on("reconnect", function() {
        console.log("Reconnecting");
        
        });

    }, [inLobby]);

    // useEffect(() => {
    //     let copiedTracksArray = JSON.parse(JSON.stringify(tracks));
    //     shuffleArr(copiedTracksArray);
    //     setTracks(copiedTracksArray);
    // }, [inLobby])
    
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
            {!inLobby ? <Play tracks={tracks} socket={socket} currentPlayers={currentPlayers} currentlyPlayingTrack={currentlyPlayingTrack} playedTracks={playedTracks} paused={paused} setPaused={setPaused} inLobby={inLobby} setInLobby={setInLobby} isHost={isHost} room={room} roomInfo={roomInfo} userName={userName}/> : <WaitingRoom room={room} currentPlayers={currentPlayers} setInLobby={setInLobby} socket={socket} isHost={isHost}/>}
        </div>
    )
}

export default Lobby
