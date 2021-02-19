import React, { useEffect, useState, useRef } from 'react';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import './PlaybackOptions.css';
import { useDataLayerValue } from '../../../global-state/DataLayer';

function PlaybackOptions({ tracks, socket, currentPlayers, paused, setPaused, inLobby, room }) {
    const [{ spotify, selectedDevice, autoPlay }] = useDataLayerValue();
    const [order, setOrder] = useState([]);
    const [current, setCurrent] = useState(0);
    const [seconds, setSeconds] = useState(0);

    let currentSecRef = useRef(80);
    let isPausedRef = useRef(true);
    let intervalRef = useRef();
    let orderRef = useRef();
    let currentSongRef = useRef(0);

    let minutes = Math.floor(currentSecRef.current / 60);
    let remainingSeconds = currentSecRef.current - minutes * 60;
  
    const decreaseSec = () => setSeconds((prev) => prev - 1);
    
    useEffect(() => {
        let copy = JSON.parse(JSON.stringify(tracks))
        shuffleArr(copy);
        orderRef.current = copy

        

        if(autoPlay) {
            intervalRef.current = setInterval(decreaseSec, 1000);

            playSong();

            setInterval(function() {
                if(currentSecRef.current <= 0) {
                    nextSong();
                    currentSecRef.current = 80;
                }
                if(!isPausedRef.current) {
                    currentSecRef.current -= 1;
                }
            }, 1000)
        }
    }, [])

    function shuffleArr (array){
        for (var i = array.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            [array[i], array[rand]] = [array[rand], array[i]]
        }
    }

    function playSong() {
        if(currentSongRef.current === 0) {
            setSeconds(0);
            spotify.play({"uris": [orderRef.current[currentSongRef.current].track.uri], device_id: selectedDevice.id});
        } else {
            spotify.play({device_id: selectedDevice.id});
        }
        isPausedRef.current = false;
        setPaused(false)
        socket.emit('playing_track', ({room: room, current: orderRef.current[currentSongRef.current]}));  
    }

    function pauseSong() {
        spotify.pause();
        isPausedRef.current = true
        setPaused(true)
        socket.emit('playing_track', ({room: room}))
    }

    function nextSong() {  
        spotify.play({"uris": [orderRef.current[currentSongRef.current+1]?.track?.uri]});  
        currentSongRef.current += 1;
        isPausedRef.current = false;
        currentSecRef.current = 80;
        setPaused(false)
        socket.emit('playing_track', ({room: room, current: orderRef.current[currentSongRef.current]}));
        setSeconds(0); 
    }

    function previousSong() {
        spotify.play({"uris": [orderRef.current[currentSongRef.current-1].track.uri]});
        currentSongRef.current -= 1;
        isPausedRef.current = false;
        currentSecRef.current = 80;
        setPaused(false)
        socket.emit('playing_track', ({room: room, current: orderRef.current[currentSongRef.current]}));
        setSeconds(0); 
    }   
 
    return (
        <div className="playback-options">
            
            {currentSongRef.current !== 0 ? <SkipPreviousIcon fontSize="large" className="option" onClick={previousSong}/> : <SkipPreviousIcon fontSize="large" className="option first" />}
            {!paused ? <PauseCircleOutlineIcon fontSize="large" className="option" onClick={pauseSong}/> : <PlayCircleOutlineIcon fontSize="large" className="option" onClick={playSong}/>}
            {currentSongRef.current !== tracks.length-1 ?<SkipNextIcon fontSize="large" className="option" onClick={nextSong}/> : <SkipNextIcon fontSize="large" className="option first" />}
            {autoPlay && <div className="counter">0{minutes}:{remainingSeconds < 10 && <div>0</div>}{remainingSeconds}</div>}
        </div>
    )
}

export default PlaybackOptions
