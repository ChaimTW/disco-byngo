import React, { useEffect } from 'react';
import HomeButtons from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Home/HomeButtons.js';
import { getTokenFromUrl } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/spotify-api-logic/spotify-api-logic.js';
import { Setup } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Configuration/Setup.js';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/global-state/DataLayer.js'

const spotify = new SpotifyWebApi();

export function Home({ socket }) {
  // eslint-disable-next-line
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;

    if(_token) {

      async function getInitialData() {
        await spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token
      })

      await spotify.getMe().then(user => {
        dispatch({
          type: "SET_USER",
          user: user
        })
      })

      await spotify.getUserPlaylists({ "limit": "50"}).then(playlists => {   
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists
        })
      })
      
      }

      getInitialData()

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify
      })
    }
  }, [token, dispatch])

  return (
    <div className="app">
      {
        token ? (
          <Setup spotify={spotify} socket={socket}/>
        ) : (
          <HomeButtons />
        )
      }
    </div>
  );
}

export default Home;
