import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/global-state/DataLayer.js';
import ClipLoader from "react-spinners/ClipLoader";
import './CardPreview.css';

export function CardPreview({ spotify }) {
    const [{ selectedPlaylist, playlists, shuffledTracksAll, includeAmount }, dispatch] = useDataLayerValue();
    const [loading, setLoading] = useState(false)

    useEffect(()  => {
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        function findPlaylistId(playlist){
            for(let i = 0; i < playlists?.items?.length; i++){
                if(playlists?.items[i]?.name === playlist.name) {
                    return playlists?.items[i]?.id
                }
            }
        }

        const getAllPlaylistTracks = async (playlistId) => {
            if(typeof playlistId == "undefined"){
                return 
            }

            let allTracks = [];
            let allTrackTitles = [];
            let offset = 0;
            
            setLoading(true)
            while(offset < 1000){
                await spotify.getPlaylistTracks(playlistId, {"offset": offset}).then(response => {
                    response.items.forEach(item => {
                        if(item.track != null) {
                            allTracks.push(item)
                            allTrackTitles.push(item.track.name)
                        }  
                    })
                })
                offset += 100;
            }

            shuffleArray(allTracks);

            dispatch({
                type: "SET_SHUFFLED_TRACKS_ALL",
                shuffledTracksAll: allTracks
            })

            dispatch({
                type: "SET_INCLUDED_TRACKS",
                includedTracks: allTracks.slice(0, includeAmount)
            })

            setLoading(false)
        }

        let playlistId = findPlaylistId(selectedPlaylist);

        getAllPlaylistTracks(playlistId)

    }, [selectedPlaylist])

    return (
        <div>
            {loading ? <div className="spinner"><ClipLoader color={"white"} /></div> : 
            <table>
                <tbody>
                    <tr>
                        <td className="corner-lt"><div className="content">{shuffledTracksAll[0]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[1]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[2]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[3]?.track?.name}</div></td>
                        <td className="corner-rt"><div className="content">{shuffledTracksAll[4]?.track?.name}</div></td>
                    </tr>
                    <tr>
                        <td><div className="content">{shuffledTracksAll[5]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[6]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[7]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[8]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[9]?.track?.name}</div></td>
                    </tr>
                    <tr>
                        <td><div className="content">{shuffledTracksAll[10]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[11]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[12]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[13]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[14]?.track?.name}</div></td>
                    </tr>
                    <tr>
                        <td><div className="content">{shuffledTracksAll[15]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[16]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[17]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[18]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[19]?.track?.name}</div></td>
                    </tr>
                    <tr>
                        <td className="corner-lb"><div className="content">{shuffledTracksAll[20]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[21]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[22]?.track?.name}</div></td>
                        <td><div className="content">{shuffledTracksAll[23]?.track?.name}</div></td>
                        <td className="corner-rb"><div className="content">{shuffledTracksAll[24]?.track?.name}</div></td>
                    </tr>
                </tbody>
            </table>}
        </div>
    )
}