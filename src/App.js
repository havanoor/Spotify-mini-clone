import React from "react";
import logo from "./logo.svg";
import ScriptTag from "react-script-tag";
import "./App.css";
import Player from "./components/Player";
import MainControl from "./components/MainControl";
import HomePage from "./components/HomePage";
import NavBar from './components/NavBar';
import SideDrawer from './components/SideDrawer'
import {SongProvider} from './components/SongContext'

function App() {
  return (
    <SongProvider >
    <div>
      {/* <ScriptTag
        type="text/javascript"
        src="https://sdk.scdn.co/spotify-player.js"
      ></ScriptTag> */}
      {/* <Player /> */}
      {/* <MainControl /> */}

      <HomePage />
      {/* <NavBar /> */}
      {/* <SideDrawer /> */}
    </div>
    </SongProvider>
  );
}

export default App;
