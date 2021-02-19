import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../global-state/DataLayer';
import './SetupContainerLeft.css';
import { SelectPlaylistLeft } from './Containers/SelectPlaylistLeft.js';
import { CardSettingsLeft } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/private/LightBox/Containers/CardSettingsLeft.js';
import { ShufflePreview } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/private/LightBox/Containers/ShufflePreview.js'

export function SetupContainerLeft() {
    const [{ currentItem }] = useDataLayerValue();
    const [leftContent,  setLeftContent] = useState(null)

    useEffect(() => {
        function findCurrentItem() {
            switch(currentItem) {
                case "select-playlist":
                    return setLeftContent(<SelectPlaylistLeft />);
                case "card-settings":
                    return setLeftContent(<CardSettingsLeft />);
                case "card-preview":
                    return setLeftContent(<ShufflePreview />);
                default: return
            }
        } 
        
        findCurrentItem()
    }, [currentItem])

    return (
        <div className="setup-container-left">
            {leftContent}
        </div>
    )
}