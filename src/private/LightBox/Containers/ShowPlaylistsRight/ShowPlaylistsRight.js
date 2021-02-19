import React, { useState } from 'react';
import { useDataLayerValue } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/global-state/DataLayer.js';
import { PlaylistRow } from './PlaylistRow';
import './ShowPlaylistsRight.css';
import ClipLoader from "react-spinners/ClipLoader";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export function ShowPlaylistsRight() {
    const [{ playlists, selectedPlaylist }] = useDataLayerValue();

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const closeIcon = (
        <svg fill="white" viewBox="0 0 20 20" width={28} height={28}>
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          ></path>
        </svg>
      );

    return (
        <div className="playlists">
            <h2>Which playlist would you like to use?</h2>
            <div className="button-container"><AwesomeButton type="primary" onPress={onOpenModal} className="playlist-button">Select playlist</AwesomeButton></div>
            
            {selectedPlaylist !== null && <div className="preview"><img src={selectedPlaylist.images[0].url} alt="cover" className="cover-image"></img><div><strong>{selectedPlaylist.name}</strong><p>{selectedPlaylist.tracks.total} tracks</p><p>Owner: <i>{selectedPlaylist.owner.display_name}</i></p></div></div>}
            <Modal open={open} onClose={onCloseModal} center closeIcon={closeIcon} classNames={{modal: 'customModal'}}>
                {playlists === null ? <ClipLoader /> : playlists?.items?.map((playlist, index) => {
                    return <PlaylistRow playlist={playlist} key={index} onCloseModal={onCloseModal}/>
                })}
            </Modal>
            <br></br>
        </div>
    )
}