import React from 'react';
import { useDataLayerValue } from '../../global-state/DataLayer';
import './NavigationButtonNext.css';
import { Link } from 'react-router-dom';

export function NavigationButtonNext({ socket }) {
    const [{ currentItem, selectedPlaylist, user, includedTracks }, dispatch] = useDataLayerValue();

    function dispatchCurrentItem(item) {
        dispatch({
            type: "SET_CURRENT_ITEM",
            currentItem: item
        })
    }

    function nextItem() {
        if(selectedPlaylist == null) {
            return alert('Select a playlist');
        }

        if(selectedPlaylist.tracks.total < 45){
            return alert(`The selected playlist needs to contain a minimum of 45 songs. Select a different playlist or add at least ${45 - selectedPlaylist.tracks.total} songs to your ${selectedPlaylist.name} playlist.`)
        }

        switch(currentItem) {
            case "select-playlist":
                return dispatchCurrentItem("card-preview");
            case "card-settings":
                return dispatchCurrentItem("card-preview");
            default: return;
        }
    }

    function createRoom() {
        const userRoom = socket.id.substring(0, 4).toUpperCase();
        const userName = user.id;
        socket.emit('create_room', ({ userName, userRoom, includedTracks }))
    }

    return (
        <div>
            {currentItem === "card-preview" ? 
            <div className="navigation-button-next">
                <Link to="/play" socket={socket} onClick={createRoom}><strong className="button-text">INVITE</strong></Link>
            </div>
            :
            <div className="navigation-button-next" onClick={nextItem}>
                <strong className="button-text" >NEXT</strong>
            </div>}
        </div>
    )
}