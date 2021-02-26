import React, { useEffect } from 'react';
import { useDataLayerValue } from '../../global-state/DataLayer';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export function Navigation({ socket }) {
    
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
            return alert(`It is recommended to select a playlist with 45 or more songs. Try adding at least ${45 - selectedPlaylist.tracks.total} songs to your ${selectedPlaylist.name} playlist.`)
        }

        switch(currentItem) {
            case "select-playlist":
                return dispatchCurrentItem("card-preview");
            default: return;
        }
    }

    useEffect(() => {

    }, [currentItem])
    
    return (
        <div className="navigation">
            {selectedPlaylist === null ? <AwesomeButton type="primary" className="playlist-button" disabled={true} onPress={nextItem} >CONTINUE</AwesomeButton> : <Link to="/device" className="playlist-button"><AwesomeButton type="secondary" className="playlist-button" disabled={false} onPress={nextItem}>CONTINUE</AwesomeButton></Link>}

        </div>
    )
}