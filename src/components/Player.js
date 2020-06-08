import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
//import Button from "react-bootstrap/Button";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Image from "react-bootstrap/Image";
import Button from "@material-ui/core/Button";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";

class Player extends Component {
  constructor(props) {
    super(props);
    this.playerCheckInterval = null;
    this.state = {
      token: "",
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      playing: false,
      position: 0,
      duration: 0,
      volume: 0,
      image: "Image",
    };
  }

  playbackControls(params) {
    console.log(params.track_window.current_track);
    this.setState({
      trackName: params.track_window.current_track.name,
      artistName: params.track_window.current_track.artists[0].name,
      paused: params.paused,
      playing: params.paused,
      duration: params.duration,
      image: params.track_window.current_track.album.images[0].url,
    });
    this.playerposition = setInterval(() => this.getState(), 1000);
  }

  createEventHandlers() {
    this.player.on("initialization_error", (e) => {
      console.error(e);
    });
    this.player.on("authentication_error", (e) => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on("account_error", (e) => {
      console.error(e);
    });
    this.player.on("playback_error", (e) => {
      console.error(e);
    });

    // Playback status updates
    this.player.on("player_state_changed", (changed) =>
      this.playbackControls(changed)
    );

    // Ready
    this.player.on("ready", (data) => {
      let { device_id } = data;
      console.log("Let the music play on!");
      this.setState({ deviceId: device_id });
    });
  }
  checkForPlayer(value) {
    if (window.Spotify != null) {
      console.log("hekki");
      this.player = new window.Spotify.Player({
        name: "Hrishi's React Player",
        getOAuthToken: (cb) => {
          cb(value);
        },
      });
      this.createEventHandlers();
      this.player.connect();
      console.log("ju=---------------");
      console.log(this.player);
      clearInterval(this.playerCheckInterval);
    }
  }

  handleLogin() {
    if (this.state.token !== "") {
      this.setState({ loggedIn: true });

      this.playerCheckInterval = setInterval(
        () => this.checkForPlayer(this.state.token),
        1000
      );
    }
  }

  playPreviousTrack() {
    this.player.previousTrack();
  }
  playPauseToggle() {
    this.player.togglePlay();

    // this.playerposition = setInterval(() => this.getState(), 1000);
  }
  playNextTrack() {
    this.player.nextTrack();
  }

  changeVolume() {
    this.player.setVolume(this.state.volume);
  }

  currentVolume() {
    this.player.getVolume().then((volume) => {
      let volume_percentage = volume * 100;
      console.log(`The volume of the player is ${volume_percentage}%`);
    });
  }
  getState() {
    this.player.getCurrentState().then((state) => {
      console.log(state.position);
      this.setState({ position: state.position });
    });
    // console.log("HIIII");
    // console.log(val);
  }
  handleChange = (event, newValue) => {
    console.log("Event");
    console.log(event);
    console.log("New");
    console.log(newValue);
    this.player.setVolume(newValue / 100);
  };
  render() {
    const { token, loggedIn, volume } = this.state;

    return (
      <>
        <h1>Spotify Clone</h1>
        {loggedIn ? (
          <div>
            <Image src={this.state.image} roundedCircle />
            <h1>{this.state.trackName}</h1>
            <h1>{this.state.artistName}</h1>
            <h1>{this.state.playing}</h1>
            <h1>{this.state.deviceId}</h1>
            <button onClick={() => this.playPauseToggle()}>
              {this.state.playing ? "Pause" : "Play"}
            </button>

            <button onClick={() => this.playNextTrack()}>Next track</button>
            <button onClick={() => this.playPreviousTrack()}>
              Previous track
            </button>
            <p>
              <input
                type="number"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => this.setState({ volume: e.target.value })}
              />
              <div className="test">
                {/* <Slider
                  value={classes.root}
                  min={0}
                  max={100}
                  onChange={this.handleChange}
                  aria-labelledby="continuous-slider"
                /> */}
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.getState()}
              >
                Volume
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => this.changeVolume()}
              >
                Change Volume
              </Button>
            </p>
            <div className="test">
              <ProgressBar
                animated
                now={this.state.position}
                max={this.state.duration}
              />
            </div>
            <Button variant="outline-primary">Primary</Button>
          </div>
        ) : (
          <div>
            <p>
              <h1>hello</h1>
              Enter your Spotify access token. Get it from
              <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">
                here
              </a>
              <PlayArrowRoundedIcon color="primary" fontSize="large" />
            </p>
            <p>
              <input
                type="text"
                value={token}
                onChange={(e) => this.setState({ token: e.target.value })}
              />
            </p>
            <p>
              <button onClick={() => this.handleLogin()}>Go</button>
            </p>
          </div>
        )}
      </>
    );
  }
}

export default Player;
