import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import { SongProvider } from './components/SongContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SearchPage from './components/SearchPage'
function App() {
  return (
    <SongProvider >
      <Router>
        <div>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/search/:name' component={SearchPage} />


          </Switch>

        </div>
      </Router>
    </SongProvider>
  );
}

export default App;





