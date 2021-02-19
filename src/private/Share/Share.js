import React, { useEffect, useState } from 'react';
import { GeneratedCard } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/private/Share/GeneratedCard.js';
import './Share.css'
import { useDataLayerValue } from '../../global-state/DataLayer';

export function Share() {
    const [{ players, includedTracks }] = useDataLayerValue();
    const res = [...Array(players)].map((_, i) => i + 1);

    return (
        <div className="cards">
            {res.map((player, id) => {
                return (<div className="card-container" key={id}>
                    <GeneratedCard />
                </div>)
            })}
        </div>
    )
}