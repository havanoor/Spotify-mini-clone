import React, { useState, useEffect, useCallback } from "react";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import { Slider, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PauseCircleFilledRoundedIcon from "@material-ui/icons/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
let player, playerCheckInterval, playerposition, token;

const useStyles = makeStyles({
  root: {
    width: 200,
    //position: "relative",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    //left: 700,
  },
  prgbar: {
    width: 300,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttons: {
    alignItems: "center",
    //display: "block",
    //marginLeft: "auto",
    //marginRight: "auto",
  },
});

function MainControl() {
  const classes = useStyles();
  const [token2, setToken] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const [deviceId, setdeviceId] = useState("");
  const [trackName, settrackName] = useState("Track Name");
  const [artistName, setartistName] = useState("Artist Name");
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(0);
  const [image, setImage] = useState("Image");
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState("");

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
    } else {
      console.log("Nop");
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
    console.log(params);
    settrackName(params.track_window.current_track.name);
    setartistName(params.track_window.current_track.artists[0].name);
    setDuration(params.duration);
    setImage(params.track_window.current_track.album.images[0].url);
    setPlaying(params.paused);
    console.log("Poda");
    console.log(playing);

    player.getVolume().then((volume) => {
      let volume_percentage = volume * 100;
      console.log(`The volume of the player is ${volume_percentage}%`);
      setVolume(volume * 100);
    });

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
      console.log(data);
      // newControl({ ...control, deviceId: device_id });
      setdeviceId(device_id);
      console.log("Fianl");
      //console.log(control);
    });
  };

  const transform = (val) => (val * 100) / duration;

  const playPreviousTrack = () => {
    player.previousTrack();
  };
  const playPauseToggle = () => {
    console.log("inside toggle");
    console.log(playing);
    player.togglePlay();

    // this.playerposition = setInterval(() => this.getState(), 1000);
  };

  const getCurrentTrack=()=>{
    return {image}
  }
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
      //   console.log("inside get state");
      //   console.log(state.position);
      //newControl({ ...control, position: state.position });\
      setPosition(state.position);
    });
  };
  const handleChange = (event, newValue) => {
    setVolume(newValue);
    player.setVolume(newValue / 100);
  };
  const changePosition = (event, newValue) => {
    setPosition(newValue);
    player.seek(newValue);
  };

  const check = () => {
    console.log("Random function");
  };

   const LoginNow = () => {
    fetch("http://localhost:8000/data")
      .then((response) => response.json())

      .then(async (jsonD) => {
        ///setData(jsonD.data);
        let x = jsonD.access_token;
        token = jsonD.access_token; 
        console.log(jsonD);
        console.log("X=", x);
        //await setToken(jsonD.access_token);
        // check();
        setToken(x);
        handleLogin();
        //console.log(
        //("77777777777777777777777777777777777777777777777777777777777777777");
        // );
        console.log("Token=", token2);
        // console.log("X=", x);
        //console.log(data, "inside");
      });

    // setTimeout(() => {
    //   console.log("Bjassjk");
    //   console.log(token, "Kya hai ye");
    //   console.log();
    // }, 5000);
  };

  return (
    <div className="main"> 
      {loggedIn ? (
        <div className="main">
          <img src={image} className="myimg" />

          {/* <CardMedia
            className={classes.cover}
            image={image}
            title="Live from space album cover"
          /> */}
          <h1 className="trackname">{trackName}</h1>
          <h1 className="artistname">{artistName}</h1>
          <LinearProgress
            variant="determinate"
            className={classes.prgbar}
            value={transform(position)}
          />
          <Slider
            className={classes.prgbar}
            min={0}
            max={duration}
            value={position}
            onChange={changePosition}
            aria-labelledby="continuous-slider"
          />
          <div className="container">
            <SkipPreviousRoundedIcon
              className={classes.buttons}
              onClick={() => playPreviousTrack()}
              fontSize="large"
            />
            {playing ? (
              <PlayArrowRoundedIcon
                color="inherit"
                fontSize="large"
                onClick={() => playPauseToggle()}
                className={classes.buttons}
              />
            ) : (
              <PauseCircleFilledRoundedIcon
                color="inherit"
                fontSize="large"
                onClick={() => playPauseToggle()}
                className={classes.buttons}
              />
            )}
            <SkipNextRoundedIcon
              onClick={() => playNextTrack()}
              className={classes.buttons}
              fontSize="large"
            />{" "}
          </div>
          <div className={classes.root}>
            <Slider
              value={volume}
              min={0}
              max={100}
              onChange={handleChange}
              aria-labelledby="continuous-slider"
            />
          </div>
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
          <div className="test">
            <button onClick={() => LoginNow()}> Click</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainControl;
