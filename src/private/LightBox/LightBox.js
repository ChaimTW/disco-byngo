import React from 'react';
import './LightBox.css';
import { SetupContainerLeft } from './SetupContainerLeft';
import { SetupContainerRight } from './SetupContainerRight';
import { Navigation } from './Navigation';

export function LightBox({ spotify, socket }) {

    return (
        <div className="lightbox">
            <SetupContainerRight spotify={spotify}/>
            <Navigation socket={socket}/>
        </div>
    )
}