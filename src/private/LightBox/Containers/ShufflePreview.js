import React, { useState, useEffect } from 'react';
import { useDataLayerValue } from '../../../global-state/DataLayer';
import './ShufflePreview.css';
import ClipLoader from "react-spinners/ClipLoader";

export function ShufflePreview() {
    const [{ includedTracks }] = useDataLayerValue();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(includedTracks !== null) {
            setLoading(false)
            console.log(loading);
        }
    }, [includedTracks])

    return (
        <div>
            <h1>Card Preview</h1>
            <br></br>
            <p>What will a bingo card look like?</p>
            <br></br>
            <hr></hr>
            <img src="https://www.iconhot.com/icon/png/default-icon/256/media-shuffle-inv.png" alt="clock" className="shuffle-image" ></img>
            {loading === true ? <div className="spinner"><ClipLoader color={"white"} /></div> :
            <div className="included-tracks">
                {includedTracks.map((track, index) => {
                    return <p className="track" index={index}><strong>{index+1}. {track.track.name}</strong> - {track.track.artists[0].name}</p>
                })}
            </div>
            }
        </div>
    )
}