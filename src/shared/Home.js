import React, { useEffect } from 'react';
import { Login } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/login/Login.js';
import { getTokenFromUrl } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/spotify-api-logic/spotify-api-logic.js';
import { Setup } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/private/Setup.js';
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
          <Login />
        )
      }
    </div>
  );
}

export default Home;
