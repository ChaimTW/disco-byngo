import React from 'react';
import { useDataLayerValue } from '../../global-state/DataLayer';
import './NavigationButtonBack.css';

export function NavigationButtonBack() {
    const [{ currentItem }, dispatch] = useDataLayerValue();

    function dispatchCurrentItem(item) {
        dispatch({
            type: "SET_CURRENT_ITEM",
            currentItem: item
        })
    }

    function previousItem() {
        switch(currentItem) {
            case "card-settings":
                return dispatchCurrentItem("select-playlist");
            case "card-preview":
                return dispatchCurrentItem("select-playlist");
            default: return;
        }
    }

    return (
        <div className="navigation-button-back" onClick={previousItem}>
            <strong className="button-text" >BACK</strong>
        </div>
    )
}