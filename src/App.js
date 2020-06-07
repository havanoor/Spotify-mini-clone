import React from "react";
import logo from "./logo.svg";
import ScriptTag from "react-script-tag";
import "./App.css";
import Player from "./components/Player";
function App() {
  return (
    <div className="App">
      {/* <ScriptTag
        type="text/javascript"
        src="https://sdk.scdn.co/spotify-player.js"
      ></ScriptTag> */}
      <Player />
    </div>
  );
}

export default App;
