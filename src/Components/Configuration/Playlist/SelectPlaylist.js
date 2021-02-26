import React, { useState } from 'react';
import { useDataLayerValue } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/global-state/DataLayer.js';
import { ModalPlaylistRow } from './ModalPlaylistRow';
import './SelectPlaylist.css';
import ClipLoader from "react-spinners/ClipLoader";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export function SelectPlaylist() {
    const [{ playlists, selectedPlaylist }] = useDataLayerValue();

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div className="playlists">
            <h2>Select a playlist</h2>
            <p className="explanation"><i>This playlist will be used to create the bingo game.</i></p>
            <br />
            <div className="button-container"><AwesomeButton type="primary" onPress={onOpenModal} className="playlist-button">SELECT</AwesomeButton></div>
            
            {selectedPlaylist !== null && <div className="preview"><img src={selectedPlaylist.images[0].url} alt="cover" className="cover-image"></img><div><strong>{selectedPlaylist.name}</strong><p>{selectedPlaylist.tracks.total} tracks</p><p>Owner: <i>{selectedPlaylist.owner.display_name}</i></p></div></div>}
            <Modal open={open} onClose={onCloseModal} center classNames={{modal: 'customModal'}}>
                {playlists === null ? <ClipLoader /> : playlists?.items?.map((playlist, index) => {
                    return <ModalPlaylistRow playlist={playlist} key={index} onCloseModal={onCloseModal}/>
                })}
            </Modal>
            <br></br>
        </div>
    )
}