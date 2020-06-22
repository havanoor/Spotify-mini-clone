import React from "react";
import logo from "./logo.svg";
import ScriptTag from "react-script-tag";
import "./App.css";
import Player from "./components/Player";
import MainControl from "./components/MainControl";
import HomePage from "./components/HomePage";
function App() {
  return (
    <div>
      {/* <ScriptTag
        type="text/javascript"
        src="https://sdk.scdn.co/spotify-player.js"
      ></ScriptTag> */}
      {/* <Player /> */}
      {/* <MainControl /> */}
      <HomePage />
    </div>
  );
}

export default App;
