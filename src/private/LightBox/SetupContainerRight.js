import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../global-state/DataLayer';
import { ShowPlaylistsRight } from './Containers/ShowPlaylistsRight/ShowPlaylistsRight';
import { CardSettingsRight } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/private/LightBox/Containers/CardSettingsRight.js';
import { CardPreview } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/private/LightBox/Containers/CardPreview.js'
import './SetupContainerRight.css';

export function SetupContainerRight({ spotify }) {
    const [{ currentItem }] = useDataLayerValue();
    const [rightContent,  setRightContent] = useState(null)

    useEffect(() => {
        function findCurrentItem() {
            switch(currentItem) {
                case "select-playlist":
                    return setRightContent(<ShowPlaylistsRight />);
                case "card-settings":
                    return setRightContent(<CardSettingsRight />);
                case "card-preview":
                    return setRightContent(<CardPreview spotify={spotify} />);
                default: return
            }
        } 
        
        findCurrentItem()
    }, [currentItem, spotify])

    return (
        <div className="setup-container-left">
            <ShowPlaylistsRight />
        </div>
    )
}