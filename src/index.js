import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataLayer } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/global-state/DataLayer.js';
import reducer, { initialState } from '/Users/ChaimTerWee/Documents/projects/spotify-bingo/spotify-bingo-v2/src/global-state/reducer.js';
import 'react-responsive-modal/styles.css';

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
