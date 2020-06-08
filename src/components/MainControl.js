import React, { useState, useEffect, useCallback } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
//import Button from "react-bootstrap/Button";
import { Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "react-bootstrap/Image";
import Button from "@material-ui/core/Button";
import { render } from "@testing-library/react";

let player, playerCheckInterval, playerposition;

const useStyles = makeStyles({
  root: {
    width: 200,
    position: "relative",
    left: 710,
  },
});

function MainControl() {
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const [deviceId, setdeviceId] = useState("");
  const [trackName, settrackName] = useState("Track Name");
  const [artistName, setartistName] = useState("Artist Name");
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(0);
  const [image, setImage] = useState("Image");
  const [playing, setPlaying] = useState(false);

  const handleLogin = () => {
    if (token) {
      console.log("inside");
      console.log(token);
      //newControl({ ...control, loggedIn: true });
      setloggedIn(true);
      playerCheckInterval = setInterval(() => checkForPlayer(token), 5000);
      checkForPlayer(token);
      console.log("Tokennnnnnnnnnnnnnnnnnn");
      console.log(token);
    }
  };
  const checkForPlayer = useCallback(
    (value) => {
      if (window.Spotify != null) {
        console.log("hekki");
        player = new window.Spotify.Player({
          name: "Hrishi's React Player",
          getOAuthToken: (cb) => {
            cb(value);
          },
        });

        createEventHandlers();
        player.connect();
        console.log("ju=---------------");
        console.log(player);

        clearInterval(playerCheckInterval);
      }
    },
    [loggedIn]
  );

  const playbackControls = (params) => {
    console.log(params.track_window.current_track);
    settrackName(params.track_window.current_track.name);
    setartistName(params.track_window.current_track.artists[0].name);
    setDuration(params.duration);
    setImage(params.track_window.current_track.album.images[0].url);
    setPlaying(params.paused);

    console.log("In playback");
    playerposition = setInterval(() => getState(), 1000);
  };
  const createEventHandlers = () => {
    player.on("initialization_error", (e) => {
      console.error(e);
    });
    player.on("authentication_error", (e) => {
      console.error(e);
      console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      //newControl({ ...control, loggedIn: false });
      setloggedIn(false);
    });
    player.on("account_error", (e) => {
      console.error(e);
    });
    player.on("playback_error", (e) => {
      console.error(e);
    });

    // Playback status updates
    player.on("player_state_changed", (changed) => playbackControls(changed));

    // Ready
    player.on("ready", (data) => {
      let { device_id } = data;
      console.log("Let the music play on!");
      //console.log(control);
      // newControl({ ...control, deviceId: device_id });
      setdeviceId(device_id);
      console.log("Fianl");
      //console.log(control);
    });
  };

  const playPreviousTrack = () => {
    player.previousTrack();
  };
  const playPauseToggle = () => {
    player.togglePlay();

    // this.playerposition = setInterval(() => this.getState(), 1000);
  };

  const playNextTrack = () => {
    player.nextTrack();
  };

  const changeVolume = () => {
    player.setVolume(volume);
  };

  const currentVolume = () => {
    player.getVolume().then((volume) => {
      let volume_percentage = volume * 100;
      console.log(`The volume of the player is ${volume_percentage}%`);
    });
  };
  const getState = () => {
    player.getCurrentState().then((state) => {
      console.log("inside get state");
      console.log(state.position);
      //newControl({ ...control, position: state.position });\
      setPosition(state.position);
    });
  };
  const handleChange = (event, newValue) => {
    setVolume(newValue);
    player.setVolume(newValue / 100);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <Image src={image} roundedCircle />
          <h1>{trackName}</h1>
          <h1>{artistName}</h1>
          <h1>{playing}</h1>
          <h1>{deviceId}</h1>
          <button onClick={() => playPauseToggle()}>
            {playing ? "Pause" : "Play"}
          </button>
          <button onClick={() => playNextTrack()}>Next track</button>
          <button onClick={() => playPreviousTrack()}>Previous track</button>
          <p>
            <input
              type="number"
              min={0}
              max={100}
              value={volume}
              onChange={(e) =>
                //newControl({ ...control, volume: e.target.value })
                setVolume(e.target.value)
              }
            />
            <div className={classes.root}>
              <Slider
                value={volume}
                min={0}
                max={100}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
              />
            </div>
            {/* <Button
              variant="contained"
              color="secondary"
              onClick={() => getState()}
            >
              Volume
            </Button> */}

            <Button
              variant="contained"
              color="primary"
              onClick={() => changeVolume()}
            >
              Change Volume
            </Button>
          </p>
          <div className="test"></div>
          <Button variant="outline-primary">Primary</Button>
        </div>
      ) : (
        <div>
          <p className="App-intro">
            Enter your Spotify access token. Get it from{" "}
            <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">
              here
            </a>
          </p>
          <p>
            <input
              type="text"
              value={token}
              onChange={(e) =>
                //newControl({ ...control, token: e.target.value })
                setToken(e.target.value)
              }
            />
          </p>
          <p>
            <button onClick={() => handleLogin(token)}>Go</button>
          </p>
        </div>
      )}
    </div>
  );
}

export default MainControl;
