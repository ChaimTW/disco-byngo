import React, { useEffect, useState, useRef } from 'react';
import './Play.css';
import PlaybackOptions from '../Play/PlaybackOptions/PlaybackOptions';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { AwesomeButton } from "react-awesome-button";
import PlayingTrack from './PlayingTrack';
import "react-awesome-button/dist/styles.css";
import BingoTypes from './BingoTypes';
import { Prompt } from 'react-router';
import PersonIcon from '@material-ui/icons/Person';
import ReactTooltip from 'react-tooltip';
import Sidebar from "react-sidebar";
import ClipLoader from "react-spinners/ClipLoader";


function Play({ tracks, socket, currentPlayers, currentlyPlayingTrack, paused, setPaused, inLobby, isHost, room, roomInfo, userName, setInCeremony, setInLobby }) {
    const [openTrackModal, setOpenTrackModal] = useState(false);
    const [openBingoModal, setOpenBingoModal] = useState(false);
    const [openHorizontalWinnerModal, setOpenHorizontalWinnerModal] = useState(true)
    const [openVerticalWinnerModal, setOpenVerticalWinnerModal] = useState(true)
    const [openDiagonalWinnerModal, setOpenDiagonalWinnerModal] = useState(true)
    const [openBlackoutWinnerModal, setOpenBlackoutWinnerModal] = useState(true)
    const [openEndGameModal, setOpenEndGameModal] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [playedTracks, setPlayedTracks] = useState([]);
    const [bingo, setBingo] = useState(true);
    const [horizontalTaken, setHorizontalTaken] = useState(false);
    const [horizontalWinner, setHorizontalWinner] = useState(null);
    const [verticalWinner, setVerticalWinner] = useState(null);
    const [diagonalWinner, setDiagonalWinner] = useState(null);
    const [blackoutWinner, setBlackoutWinner] = useState(null);
    const [verticalTaken, setVerticalTaken] = useState(false);
    const [diagonalTaken, setDiagonalTaken] = useState(false);
    const [blackoutTaken, setBlackoutTaken] = useState(false);
    const [horizontal, setHorizontal] = useState(false);
    const [vertical, setVertical] = useState(false);
    const [diagonal, setDiagonal] = useState(false);
    const [blackout, setBlackout] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onOpenTrackModal = () => setOpenTrackModal(true);
    const onCloseTrackModal = () => setOpenTrackModal(false);
    const onOpenBingoModal = () => setOpenBingoModal(true);
    const onCloseBingoModal = () => setOpenBingoModal(false);
    const onSetSidebarOpen = () => setSidebarOpen(true);
    const onSetSidebarClose = () => setSidebarOpen(false);
    const onCloseHorizontalWinnerModal = () => setOpenHorizontalWinnerModal(false);
    const onCloseVerticalWinnerModal = () => setOpenVerticalWinnerModal(false)
    const onCloseDiagonalWinnerModal = () => setOpenDiagonalWinnerModal(false)
    const onCloseBlackoutWinnerModal = () => setOpenBlackoutWinnerModal(false)
    const onOpenEndGameModal = () => setOpenEndGameModal(true)
    const onCloseEndGameModal = () => setOpenEndGameModal(false)
    
    let playedTracksRef = useRef();
    let horizontalWinnerRef = useRef();
    let verticalWinnerRef = useRef();
    let diagonalWinnerRef = useRef();
    let blackoutWinnerRef = useRef();

    function changeColor(e) {

        let clickedTag = e.target.tagName;
        let clicked = e.target

        if(clickedTag === 'DIV') {
            if(clicked.style.backgroundColor === '') {
                clicked.style.backgroundColor = 'white'
            }
    
            return clicked.style.backgroundColor === 'white' ? clicked.style.backgroundColor = '#A6FF96' : clicked.style.backgroundColor = 'white'
        }

        if(clickedTag === 'P' || clickedTag === 'STRONG'){
            if(clicked.parentNode.style.backgroundColor === '') {
                clicked.parentNode.style.backgroundColor = 'white'
            }

            return clicked.parentNode.style.backgroundColor === 'white' ? clicked.parentNode.style.backgroundColor = '#A6FF96' : clicked.parentNode.style.backgroundColor = 'white'
        }
    }

    function endGame() {
        socket.emit('end_game', room);
    }

    useEffect(() => {
        setHorizontal(roomInfo.bingos.horizontal.taken);
        setVertical(roomInfo.bingos.vertical.taken);
        setDiagonal(roomInfo.bingos.diagonal.taken);
        setBlackout(roomInfo.bingos.blackout.taken);

        socket.on('room_info', data => {
            horizontalWinnerRef.current = data.roomInfo.bingos.horizontal.winner
            verticalWinnerRef.current = data.roomInfo.bingos.vertical.winner
            diagonalWinnerRef.current = data.roomInfo.bingos.diagonal.winner
            blackoutWinnerRef.current = data.roomInfo.bingos.blackout.winner
            setCurrentTrack(data.roomInfo.playedTracks[data.roomInfo.playedTracks.length-1]);
            playedTracksRef.current = data.roomInfo.playedTracks;
            setPlayedTracks(playedTracksRef.current);
            setHorizontal(data.roomInfo.bingos.horizontal.taken);
            setVertical(data.roomInfo.bingos.vertical.taken);
            setDiagonal(data.roomInfo.bingos.diagonal.taken);
            setBlackout(data.roomInfo.bingos.blackout.taken);
            setHorizontalWinner(horizontalWinnerRef.current);
            setVerticalWinner(verticalWinnerRef.current);
            setDiagonalWinner(diagonalWinnerRef.current);
            setBlackoutWinner(blackoutWinnerRef.current);           
        })

        socket.on('playing_track', playingTrack => {
            setCurrentTrack(playingTrack)
            setPlayedTracks(playedTracks => [...playedTracks, playingTrack])
        })

        socket.on('horizontal_bingo', (userName) => {
            setHorizontalWinner(userName)
            setHorizontalTaken(true);
            window.navigator.vibrate(200)
            setTimeout(() => {setHorizontalTaken(false)}, 4000);
            setHorizontal(true);
        })

        socket.on('vertical_bingo', (userName) => {
            setVerticalWinner(userName)
            setVerticalTaken(true);
            window.navigator.vibrate(200)
            setTimeout(() => {setVerticalTaken(false)}, 4000);
            setVertical(true);
        })

        socket.on('diagonal_bingo', (userName) => {
            setDiagonalWinner(userName)
            setDiagonalTaken(true);
            window.navigator.vibrate(200)
            setTimeout(() => {setDiagonalTaken(false)}, 4000);
            setDiagonal(true);
        })

        socket.on('blackout_bingo', (userName) => {
            setBlackoutWinner(userName)
            setBlackoutTaken(true);
            window.navigator.vibrate(200)
            setTimeout(() => {setBlackoutTaken(false)}, 4000);
            setBlackout(true);
        })

        socket.on('bingos_update', roomInfo => {
            setHorizontalTaken(roomInfo.bingos.horizontal.taken)
            setVerticalTaken(roomInfo.bingos.vertical.taken)
            setDiagonalTaken(roomInfo.bingos.diagonal.taken)
            setBlackoutTaken(roomInfo.bingos.blackout.taken)
            setHorizontal(roomInfo.bingos.horizontal.taken);
            setVertical(roomInfo.bingos.vertical.taken);
            setDiagonal(roomInfo.bingos.diagonal.taken);
            setBlackout(roomInfo.bingos.blackout.taken);
        })
    }, [])
    
    return (
        
        <div>
            {tracks === null ? <div className="spinner"><ClipLoader color="white" /></div> : <Sidebar
            sidebar={(<div className="sidebar-content"><h2 className="sidebar-title">Players</h2><hr /><div className="players-sidebar-container">{currentPlayers.map(player => {return <div className="player-sidebar"><PersonIcon></PersonIcon><strong className="player-name-sidebar">{player.userName}</strong></div>})}</div></div>)}
            open={sidebarOpen}
            onSetOpen={onSetSidebarClose}
            pullRight={true}
            styles={{ sidebar: { background: "#182335", color: "white", zIndex: "3" }, overlay: { zIndex: "2" } }}
        >
        
            
            {horizontalTaken ? <Modal open={openHorizontalWinnerModal} onClose={onCloseHorizontalWinnerModal} showCloseIcon={false} center classNames={{modal: 'customModal'}}><p>🎉 {horizontalWinner} had a horizontal bingo!🎉</p></Modal> : null}
            {verticalTaken ? <Modal open={openVerticalWinnerModal} onClose={onCloseVerticalWinnerModal} showCloseIcon={false} center classNames={{modal: 'customModal'}}><p>🎉 {verticalWinner} had a vertical bingo! 🎉</p></Modal> : null}
            {diagonalTaken ? <Modal open={openDiagonalWinnerModal} onClose={onCloseDiagonalWinnerModal} showCloseIcon={false} center classNames={{modal: 'customModal'}}><p>🎉 {diagonalWinner} had a diagonal bingo! 🎉</p></Modal> : null}
            {blackoutTaken ? <Modal open={openBlackoutWinnerModal} onClose={onCloseBlackoutWinnerModal} showCloseIcon={false} center classNames={{modal: 'customModal'}}><p>🎉 {blackoutWinner} had a blackout bingo! 🎉</p></Modal> : null}

            {currentTrack !== null ? <Modal open={openTrackModal} showCloseIcon={true} onClose={onCloseTrackModal} center classNames={{modal: 'customModal'}}><PlayingTrack currentTrack={currentTrack} /></Modal> : <Modal open={openTrackModal} showCloseIcon={false} onClose={onCloseTrackModal} center classNames={{modal: 'customModal'}}><p>No track playing</p></Modal>}

            <div className="bingo-container"> 
                <table className="table">
                
                    <thead>
                        <tr><th colSpan="5"><div className="head-container"><ReactTooltip /><span className="room-code-head" data-tip="Room code">{room}</span><p>DISCO BYNGO</p><div className="active-players-head" onClick={onSetSidebarOpen} ><PersonIcon></PersonIcon><p>{currentPlayers.length}</p></div></div></th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="corner-lt" onClick={changeColor} style={{backgroundColor: "white"}}><div className="content" ><p>{tracks[0]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[0]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[1]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[1]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[2]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[2]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[3]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[3]?.track?.artists[0]?.name}</strong></div></td>
                            <td className="corner-rt" onClick={changeColor}><div className="content"><p>{tracks[4]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[4]?.track?.artists[0]?.name}</strong></div></td>
                        </tr>
                        <tr>
                            <td onClick={changeColor}><div className="content"><p>{tracks[5]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[5]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[6]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[6]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[7]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[7]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[8]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[8]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[9]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[9]?.track?.artists[0]?.name}</strong></div></td>
                        </tr>
                        <tr>
                            <td onClick={changeColor}><div className="content"><p>{tracks[10]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[10]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[11]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[11]?.track?.artists[0]?.name}</strong></div></td>
                            <td><div className="content free-space"><h3>FREE SPACE</h3></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[12]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[12]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[13]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[13]?.track?.artists[0]?.name}</strong></div></td>
                        </tr>
                        <tr>
                            <td onClick={changeColor}><div className="content"><p>{tracks[14]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[14]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[15]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[15]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[16]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[16]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[17]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[17]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[18]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[18]?.track?.artists[0]?.name}</strong></div></td>
                        </tr>
                        <tr>
                            <td className="corner-lb" onClick={changeColor}><div className="content"><p>{tracks[19]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[19]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[20]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[20]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[21]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[21]?.track?.artists[0]?.name}</strong></div></td>
                            <td onClick={changeColor}><div className="content"><p>{tracks[22]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[22]?.track?.artists[0]?.name}</strong></div></td>
                            <td className="corner-rb" onClick={changeColor}><div className="content"><p>{tracks[23]?.track?.name.split(/\ -.*|\([^)]*\)/gm)[0]}</p><strong>{tracks[23]?.track?.artists[0]?.name}</strong></div></td>
                        </tr>
                    </tbody>
                </table>
                <div className="action-buttons">
                    <AwesomeButton type="secondary" onPress={onOpenTrackModal} className="device-button track-button" >SONG</AwesomeButton>

                    {!bingo ? <AwesomeButton type="secondary" onPress={onOpenTrackModal} className="device-button bingo-button" disabled={true}>CALL BINGO</AwesomeButton> : <AwesomeButton type="secondary" onPress={onOpenBingoModal} className="device-button bingo-button">BINGO</AwesomeButton>} 

                    {isHost === true && <AwesomeButton type="primary" onPress={onOpenEndGameModal} className="device-button end-button">END GAME</AwesomeButton>}

                    <Modal open={openEndGameModal} showCloseIcon={false} onClose={onCloseEndGameModal} center classNames={{modal: 'customModal'}}><div className="end-game-modal"><h2>Are you sure?</h2><p className="end-game-p">You will end the game for all players and go to the award ceremony.</p><AwesomeButton type="secondary" onPress={endGame} className="device-button bingo-button">YES, END GAME</AwesomeButton><br /><AwesomeButton type="primary" onPress={onCloseEndGameModal} className="device-button bingo-button">NO, RETURN TO GAME</AwesomeButton></div></Modal>
                
                    <Modal open={openBingoModal} showCloseIcon={true} onClose={onCloseBingoModal} center classNames={{modal: 'customModal bingoModal'}}><BingoTypes playedTracks={playedTracks} tracks={tracks} socket={socket} horizontal={horizontal} vertical={vertical} diagonal={diagonal} blackout={blackout} room={room} userName={userName} horizontalWinner={horizontalWinner} verticalWinner={verticalWinner} diagonalWinner={diagonalWinner} blackoutWinner={blackoutWinner}/></Modal>
                </div>
            </div>
        {<h1>{currentlyPlayingTrack}</h1>}

        {isHost === true ? <div><PlaybackOptions tracks={tracks} socket={socket} currentPlayers={currentPlayers} paused={paused} setPaused={setPaused} inLobby={inLobby} room={room} /></div>: null}
        </Sidebar>}
            
        </div>
        
    )
}

export default Play
