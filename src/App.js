import React from 'react';
import Home from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Home/Home.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Header/Header.js'
import Join from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/JoinRoom/Join.js';
import Lobby from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Game/Lobby.js';
import socketio from 'socket.io-client';
import Device from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/Components/Configuration/Device/Device.js';
// const socket = io('https://react-byngo.herokuapp.com/', {transports: ['websocket'], upgrade: false});
let socket;

function initSocket(bool) {
  if(bool) {
    socket = socketio.connect('https://react-byngo-io.herokuapp.com/', {transports: ['websocket'], upgrade: false, secure: false, 'reconnection': false,'reconnectionDelay': 1000, 'reconnectionAttempts':Infinity, 'reconnectionDelayMax': 5000})
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
          <Route path="/join" exact render={props => <Join {...props} socket={socket}></Join>}></Route>
          <Route path="/play" exact render={props => <Lobby {...props} socket={socket}></Lobby>}></Route>
          <Route path="/device" exact render={props => <Device {...props} socket={socket}></Device>}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
