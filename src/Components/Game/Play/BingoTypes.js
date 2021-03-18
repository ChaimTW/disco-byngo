import React, { useState } from 'react';
import './BingoTypes.css';
import horizontalImg from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/content/horizontal.png';
import verticalImg from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/content/vertical.png';
import diagonalImg from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/content/diagonal.png';
import blackoutImg from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/content/blackout.png';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import Confetti from 'react-confetti'

function BingoTypes({ playedTracks, tracks, socket, horizontal, vertical, diagonal, blackout, room, userName, diagonalWinner, horizontalWinner, verticalWinner, blackoutWinner }) {

    const [confetti, setConfetti] = useState(false);

    function songWasPlayed(song){
        for(let i = 0; i < playedTracks?.length; i++) {
            if(song?.track?.name === playedTracks[i]?.track?.name) {
                return true;
            }
        }
        return false;
    }

    function horizontalBingo() {
        let firstCell = 0;
        while(firstCell <= 20) {
            console.log(firstCell);
            let secondCell = firstCell + 1;
            let thirdCell = firstCell + 2;
            let fourthCell = firstCell + 3;
            let fifthCell = firstCell + 4;

            if(firstCell === 10) {
                thirdCell += 1;
                fourthCell += 1;
            }
            
            if(firstCell === 10) {
                if(songWasPlayed(tracks[firstCell])) {
                    if(songWasPlayed(tracks[secondCell])){
                        if(songWasPlayed(tracks[thirdCell])) {
                            if(songWasPlayed(tracks[fourthCell])) {
                                setConfetti(true)
                                setTimeout(function() {setConfetti(false)}, 4500);
                                return socket.emit('horizontal_bingo', ({ room, userName }));
                            }
                        }
                    }
                }
                firstCell += 4; 
            } else {
                if(songWasPlayed(tracks[firstCell])) {
                    if(songWasPlayed(tracks[secondCell])){
                        if(songWasPlayed(tracks[thirdCell])) {
                            if(songWasPlayed(tracks[fourthCell])) {
                                if(songWasPlayed(tracks[fifthCell])) {
                                    setConfetti(true)
                                    setTimeout(function() {setConfetti(false)}, 4500);
                                    return socket.emit('horizontal_bingo', ({ room, userName }));
                                }
                            }
                        }
                    }
                }
                firstCell += 5;
            } 
        }
        return alert(`You don't have a horizontal bingo yet...Keep playing!`)
    }

    function verticalBingo() {
        let firstCell = 0;
        while(firstCell <= 4) {
            console.log(firstCell);
            let secondCell = firstCell + 5;
            let thirdCell = firstCell + 10;
            let fourthCell = firstCell + 14;
            let fifthCell = firstCell + 19;

            if(firstCell === 2) {
                thirdCell += 4;
                fourthCell += 4;
            }
            
            if(firstCell === 10) {
                if(songWasPlayed(tracks[firstCell])) {
                    if(songWasPlayed(tracks[secondCell])){
                        if(songWasPlayed(tracks[thirdCell])) {
                            if(songWasPlayed(tracks[fourthCell])) {
                                setConfetti(true)
                                setTimeout(function() {setConfetti(false)}, 4500);
                                return socket.emit('vertical_bingo', ({ room, userName }));
                            }
                        }
                    }
                }
                firstCell += 1; 
            } else {
                if(songWasPlayed(tracks[firstCell])) {
                    if(songWasPlayed(tracks[secondCell])){
                        if(songWasPlayed(tracks[thirdCell])) {
                            if(songWasPlayed(tracks[fourthCell])) {
                                if(songWasPlayed(tracks[fifthCell])) {
                                    setConfetti(true)
                                    setTimeout(function() {setConfetti(false)}, 4500);
                                    return socket.emit('vertical_bingo', ({ room, userName }));
                                }
                            }
                        }
                    }
                }
                firstCell += 1;
            } 
        }
        return alert(`You don't have a vertical bingo yet...Keep playing!`)
    }

    function diagonalBingo() {
        let firstCell = 19;
        let secondCell = 15;
        let thirdCell = 8;
        let fourthCell = 4

        if(songWasPlayed(tracks[firstCell])) {
            if(songWasPlayed(tracks[secondCell])){
                if(songWasPlayed(tracks[thirdCell])) {
                    if(songWasPlayed(tracks[fourthCell])) {
                        setConfetti(true)
                        setTimeout(function() {setConfetti(false)}, 4500);
                        return socket.emit('diagonal_bingo', ({ room, userName }));
                    }
                }
            }
        } else {
            firstCell = 0;
            secondCell = 6;
            thirdCell = 17;
            fourthCell = 23
            if(songWasPlayed(tracks[firstCell])) {
                if(songWasPlayed(tracks[secondCell])){
                    if(songWasPlayed(tracks[thirdCell])) {
                        if(songWasPlayed(tracks[fourthCell])) {
                            setConfetti(true)
                            setTimeout(function() {setConfetti(false)}, 4500);
                            return socket.emit('diagonal_bingo', ({ room, userName }));
                        }
                    }
                }
            }    
        }

        return alert(`You don't have a diagonal bingo yet...Keep playing!`)
    }

    function blackoutBingo() {
        let totalCorrect = 0;
        for(let i = 0; i <= 23; i++) {
            let bingoCellToCheck = tracks[i]
            for(let j = 0; j < playedTracks?.length; j++) {
                if(playedTracks[j]?.track?.name === bingoCellToCheck?.track?.name) {
                    console.log(playedTracks[j]?.track?.name, bingoCellToCheck?.track?.name);
                    totalCorrect++;
                }
            }
        }
        if(totalCorrect >= 24) {
            setConfetti(true)
            setTimeout(function() {setConfetti(false)}, 10000);
            return socket.emit('blackout_bingo', ({ room, userName }));
        } else {
            return alert(`You don't have a blackout bingo yet...Keep playing!`)
        }
    }


    return (
        <div className="types-container">

            {confetti ? <Confetti /> : null}

            <div className="bingo">
                <strong>Horizontal Bingo</strong>
                <img src={horizontalImg} alt="horizontal" className="bingo-image" onClick={horizontalBingo}></img>
                {!horizontal ? <AwesomeButton type="secondary" onPress={horizontalBingo} className="device-button" >CALL</AwesomeButton> : <AwesomeButton type="secondary" onPress={horizontalBingo} className="device-button" disabled={true}>Called by {horizontalWinner}!</AwesomeButton>}
            </div>

            <div className="bingo">
                <strong>Vertical Bingo</strong>
                <img src={verticalImg} alt="vertical" className="bingo-image"></img>
                {!vertical ? <AwesomeButton type="secondary" onPress={verticalBingo} className="device-button" >CALL</AwesomeButton> : <AwesomeButton type="secondary" onPress={horizontalBingo} className="device-button" disabled={true}>Called by {verticalWinner}!</AwesomeButton>}
            </div>
            <div className="bingo">
                <strong>Diagonal Bingo</strong>
                <img src={diagonalImg} alt="diagonal" className="bingo-image"></img>
                {!diagonal ? <AwesomeButton type="secondary" onPress={diagonalBingo} className="device-button" >CALL</AwesomeButton> : <AwesomeButton type="secondary" onPress={horizontalBingo} className="device-button" disabled={true}>Called by {diagonalWinner}!</AwesomeButton>}
            </div>
            <div className="bingo">
                <strong>Blackout Bingo</strong>
                <img src={blackoutImg} alt="blackout" className="bingo-image"></img>
                {!blackout ? <AwesomeButton type="secondary" onPress={blackoutBingo} className="device-button" >CALL</AwesomeButton> : <AwesomeButton type="secondary" onPress={horizontalBingo} className="device-button" disabled={true}>Called by {blackoutWinner}!</AwesomeButton>}
            </div>
        </div>
    )
}

export default BingoTypes
