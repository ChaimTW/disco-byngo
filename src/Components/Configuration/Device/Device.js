import React, { useState, useEffect, useRef } from 'react';
import './Device.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useDataLayerValue } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/global-state/DataLayer.js';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Select from "react-dropdown-select";

function Device({ socket }) {
    const [{ playlists, spotify, includeAmount, selectedPlaylist, includedTracks, user, devices, selectedDevice }, dispatch] = useDataLayerValue()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    let optionsRef = useRef();

    function setSelectedDevice(selected) {
        let name = selected[0].value;
        for(let i = 0; i < devices.devices.length; i++) {
            if(name === devices.devices[i].name) {
                dispatch({
                    type: "SELECTED_DEVICE",
                    selectedDevice: devices.devices[i]
                })
                spotify.transferMyPlayback([devices.devices[i].id])
                onCloseModal();
                return
            }
        }
    }

    async function getDevices() {
        setLoading(true)
        await spotify.getMyDevices().then(response => {
            dispatch({
                type: "SET_DEVICES",
                devices: response
            })
            let devicesToAdd = [];
            response.devices.forEach(device => {
                devicesToAdd.push({ value: device.name, label: device.name })
            })
            optionsRef.current = devicesToAdd;
        })
        setLoading(false);
        
    }

    useEffect(()  => {
        getDevices();

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        function findPlaylistId(playlist){
            for(let i = 0; i < playlists?.items?.length; i++){
                if(playlists?.items[i]?.name === playlist.name) {
                    return playlists?.items[i]?.id
                }
            }
        }

        const getAllPlaylistTracks = async (playlistId) => {
            if(typeof playlistId == "undefined"){
                return 
            }

            let allTracks = [];
            let allTrackTitles = [];
            let offset = 0;
            
            setLoading(true)
            while(offset < 1000){
                await spotify.getPlaylistTracks(playlistId, {"offset": offset}).then(response => {
                    response.items.forEach(item => {
                        if(item.track != null) {
                            allTracks.push(item)
                            allTrackTitles.push(item.track.name)
                        }  
                    })
                })
                offset += 100;
            }

            shuffleArray(allTracks);

            let activeDevices; 

            await spotify.getMyDevices().then(response => {
                activeDevices = response;
            })

            dispatch({
                type: "SET_SHUFFLED_TRACKS_ALL",
                shuffledTracksAll: allTracks
            })

            dispatch({
                type: "SET_INCLUDED_TRACKS",
                includedTracks: allTracks.slice(0, includeAmount)
            })

            dispatch({
                type: "SET_DEVICES",
                devices: activeDevices
            })

            setLoading(false)
        }

        let playlistId = findPlaylistId(selectedPlaylist);

        getAllPlaylistTracks(playlistId)

    }, [selectedPlaylist])

    function createRoom() {
        const userRoom = socket.id.substring(0, 4).toUpperCase();
        const userName = user.id;
        socket.emit('create_room', ({ userName, userRoom, includedTracks }))
    }

    return (
        <div className="wrapper">
        <div className="navigation">
            {loading ? <div className="spinner"><ClipLoader color="white" /></div> : <div className="device">
                <h2>Select playback device</h2>
                <p><i>Make sure your device is awake and Spotify is open.</i></p>
                <br></br>
                <AwesomeButton type="primary" onPress={getDevices} className="device-button" >REFRESH</AwesomeButton>
                <br></br>
                <Select searchable={false} options={optionsRef.current} onChange={setSelectedDevice} placeholder="Select a playback device..." className="device-dropdown" />
                <br />
                {/* <AwesomeButton type="primary" onPress={onOpenModal} className="device-button" >CHOOSE DEVICE</AwesomeButton> */}
                {/* {selectedDevice !== null && <div className="device-option-selected no-hover"><h3>{selectedDevice.name}</h3><p>{selectedDevice.type}</p></div>} */}
                <Modal open={open} onClose={onCloseModal} center classNames={{modal: 'customModal'}}>
                    {devices.length === 0 && <h2>No devices found. Make sure your device is active and has Spotify opened. </h2>}
                    {devices.length !== 0 && devices.devices.map((device, index) => {
                        return <div onClick={setSelectedDevice} className="device-option" key={index}><h3>{device.name}</h3><p>{device.type}</p></div>
                    })}
                    <hr></hr>
                    <p>Can't find your device? Reopen Spotify on your device and click on the button below.</p>
                    <div className="refresh">
                    <AwesomeButton type="primary" onPress={getDevices} className="device-button" >REFRESH</AwesomeButton>
                    </div>
                </Modal>
                
            </div> } 
        </div>
        <div className="button-next">
            {!loading && selectedDevice === null && <AwesomeButton type="secondary" onPress={onOpenModal} disabled={true} className="playlist-button">INVITE PLAYERS</AwesomeButton>}
            {!loading && selectedDevice !== null && <Link to="/play" socket={socket} onClick={createRoom}><AwesomeButton type="secondary" disabled={false} className="playlist-button">INVITE PLAYERS</AwesomeButton></Link>}      
        </div>
        </div>
    )
}

export default Device
