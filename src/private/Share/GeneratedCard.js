import React, { useState } from 'react';
import { useDataLayerValue } from '../../global-state/DataLayer';
import ClipLoader from "react-spinners/ClipLoader";
import './GenerateCard.css';

export function GeneratedCard({ socket }) {
    const [{ shuffledTracksAll, includedTracks }] = useDataLayerValue();
    const [loading, setLoading] = useState(false);
    const [shuffledTracks, setShuffledTracks] = useState(includedTracks);

    function shuffleArr (array){
        for (var i = array.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            [array[i], array[rand]] = [array[rand], array[i]]
        }
    }

    function changeColor(e) {
        if(e.target.style.backgroundColor === '') {
            e.target.style.backgroundColor = 'white'
        }

        socket.emit('cell clicked', (e.target.innerText))

        return e.target.style.backgroundColor === 'white' ? e.target.style.backgroundColor = '#A6FF96' : e.target.style.backgroundColor = 'white'
    }

    shuffleArr(shuffledTracks)

    return (
        <div>
            <div>
            {loading ? <div className="spinner"><ClipLoader color={"white"} /></div> : 
            <table>
                <thead>
                    <tr><th colSpan="5">longer Heading with a width of 100%</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="corner-lt" onClick={changeColor} style={{backgroundColor: "white"}}><div className="content">{shuffledTracks[0]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[1]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[2]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[3]?.track?.name}</div></td>
                        <td className="corner-rt" onClick={changeColor}><div className="content">{shuffledTracks[4]?.track?.name}</div></td>
                    </tr>
                    <tr>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[5]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[6]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[7]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[8]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[9]?.track?.name}</div></td>
                    </tr>
                    <tr>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[10]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[11]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[12]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[13]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[14]?.track?.name}</div></td>
                    </tr>
                    <tr>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[15]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[16]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[17]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[18]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[19]?.track?.name}</div></td>
                    </tr>
                    <tr>
                        <td className="corner-lb" onClick={changeColor}><div className="content">{shuffledTracks[20]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[21]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[22]?.track?.name}</div></td>
                        <td onClick={changeColor}><div className="content">{shuffledTracks[23]?.track?.name}</div></td>
                        <td className="corner-rb" onClick={changeColor}><div className="content">{shuffledTracks[24]?.track?.name}</div></td>
                    </tr>
                </tbody>
            </table>}
        </div>
        </div>
    )
}