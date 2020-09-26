import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import {SongProvider} from './components/SongContext'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import SearchPage from './components/SearchPage'
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
      {/* <Route> */}
      < SearchPage/>
      {/* </Route> */}
      {/* <NavBar /> */}
      {/* <SideDrawer /> */}
    </div>
    </SongProvider>
  );
}

export default App;
