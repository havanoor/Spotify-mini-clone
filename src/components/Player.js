import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

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
    };
  }

  //  spotifyCheck=()=>{
  //     window.onSpotifyWebPlaybackSDKReady = () => {
  //         const token =
  //           "BQDp1GdjvFWgBJkLrfCu66x8SWA_8B3tPVpHUfRI6o2b0544nsjHxh5ILU_uD0TyrMMGWs57IJ_iF6QWbK5mRYDldXB2XXHHgtPN3GA4AQjtFfk3-qLIE-NyhgEwkrDje6rL-6jgIY0-XqciKbX5McHKQXN3QsQgt-lmqfuIzbvyDYxaS8Y";
  //         const player = new Spotify.Player({
  //           name: "Web Playback SDK Quick Start Player",
  //           getOAuthToken: (cb) => {
  //             cb(token);
  //           },
  //         });
  //  }

  playbackControls(params) {
    console.log(params);
    this.setState({
      trackName: params.track_window.current_track.name,
      //   artistName: params.track_window.artists.name,
      paused: params.paused,
      playing: params.paused,
      duration: params.duration,
    });
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

    this.playerposition = setInterval(() => this.getState(), 1000);
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
  render() {
    const { token, loggedIn, volume } = this.state;

    return (
      <>
        <h1>Spotify Clone</h1>
        {loggedIn ? (
          <div>
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
                value={volume}
                onChange={(e) => this.setState({ volume: e.target.value })}
              />
              <button onClick={() => this.getState()}>Volume</button>

              <button onClick={() => this.changeVolume()}>Change Volume</button>
            </p>
            <ProgressBar
              animated
              now={this.state.position}
              max={this.state.duration}
            />
            <Button variant="outline-primary">Primary</Button>{" "}
          </div>
        ) : (
          <div>
            <p className="App-intro">
              Enter your Spotify access token. Get it from{" "}
              <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">
                here
              </a>
              .
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
