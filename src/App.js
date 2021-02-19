import React from 'react';
import Home from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/shared/Home.js';
import { Share } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/private/Share/Share.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/private/Header/Header.js'
import Join from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/login/Join.js';
import Lobby from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/login/Lobby.js';
import io from 'socket.io-client';
import Device from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Device.js';
// const socket = io('https://react-byngo.herokuapp.com/', {transports: ['websocket'], upgrade: false});
let socket;

function initSocket(bool) {
  if(bool) {
    if (!socket) {
      socket = io.connect('https://react-byngo.herokuapp.com/', {transports: ['websocket'], upgrade: false, secure: false, 'reconnection': true,'reconnectionDelay': 500, 'reconnectionAttempts':Infinity, 'reconnectionDelayMax': 1000});
    } else {
      socket.socket.connect();
    }
  } else {
    socket.disconnect();
  }
}

initSocket(true);

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact render={props => <Home {...props} socket={socket}></Home>}></Route>
          <Route path="/share" exact component={Share}></Route>
          <Route path="/join" exact render={props => <Join {...props} socket={socket}></Join>}></Route>
          <Route path="/play" exact render={props => <Lobby {...props} socket={socket}></Lobby>}></Route>
          <Route path="/device" exact render={props => <Device {...props} socket={socket}></Device>}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
