import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SongContext } from './SongContext';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';

import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';

let token, playerCheckInterval, player, playerposition;





export default function ButtonAppBar() {

  const [sval, setSval] = useState('')
  const { artist, dura, pos, vol, imag, playStatus, device, track, player2, Liked, Recent } = useContext(SongContext);
  const [token2, setToken] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const [artistName, setartistName] = artist;
  const [duration, setDuration] = dura;
  const [position, setPosition] = pos;
  const [volume, setVolume] = vol;
  const [image, setImage] = imag;
  const [playing, setPlaying] = playStatus
  const [deviceId, setdeviceId] = device
  const [trackName, settrackName] = track;
  const [temp, setTemp] = player2;
  const [data, setData] = Liked
  const [play, setrecentPlay] = Recent
  let likedSongs, recentlyPlayed;


  const getLikedSongs = () => {
    fetch('http://localhost:8000/likedsongs')
      .then(response => response.json())
      .then(val => {
        setData(val)
        // console.log(val)
        likedSongs = val;
      }

      )
  }
  const getRecentlyPlayed = () => {
    fetch('http://localhost:8000/recentlyplayed')
      .then(response => response.json())
      .then(val => {
        setrecentPlay(val)
        // console.log(val)
        recentlyPlayed = val;
      }

      )
  }



  const LoginNow = () => {
    fetch("http://localhost:8000/data")
      .then((response) => response.json())

      .then(async (jsonD) => {
        ///setData(jsonD.data);
        let x = jsonD.access_token;
        token = jsonD.access_token;
        // console.log(jsonD);
        // console.log("X=", x);
        //await setToken(jsonD.access_token);
        // check();
        setToken(x);
        handleLogin();
        //console.log(
        //("77777777777777777777777777777777777777777777777777777777777777777");
        // );
        // console.log("Token=", token2);
        // console.log("X=", x);
        //console.log(data, "inside");
      });

    // setTimeout(() => {
    //   console.log("Bjassjk");
    //   console.log(token, "Kya hai ye");
    //   console.log();
    // }, 5000);
  };

  const handleLogin = () => {
    if (token) {
      // console.log("inside");
      // console.log(token);
      //newControl({ ...control, loggedIn: true });
      setloggedIn(true);

      playerCheckInterval = setInterval(() => checkForPlayer(token), 5000);
      checkForPlayer(token);
      getLikedSongs()
      getRecentlyPlayed()
      // console.log("Tokennnnnnnnnnnnnnnnnnn");
      // console.log(token);
    } else {
      console.log("Nop");
    }
  };


  const checkForPlayer = (value) => {
    let name;
    if (window.Spotify != null) {
      console.log("hekki");


      // console.log('----------------------->',name)
      player = new window.Spotify.Player({
        name: "My React Player",
        getOAuthToken: (cb) => {
          cb(value);
        },
      });
      setTemp(player);

      createEventHandlers();
      player.connect();
      console.log("ju=---------------");
      // console.log(player);

      clearInterval(playerCheckInterval);
    }
  }
  const playbackControls = (params) => {
    console.log(params);
    settrackName(params.track_window.current_track.name);
    setartistName(params.track_window.current_track.artists[0].name);
    setDuration(params.duration);
    setImage(params.track_window.current_track.album.images);
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


  const getState = () => {
    player.getCurrentState().then((state) => {
      //   console.log("inside get state");
      //   console.log(state.position);
      //newControl({ ...control, position: state.position });\
      setPosition(state.position);
    });
  };

  return (
    // <div className={classes.root}>
    //   <AppBar position="fixed" className={classes.temp}>
    //     <Toolbar>
    //       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    //         <RadioIcon fontSize="large" />
    //       </IconButton>
    //       <Typography variant="h6" className={classes.title}>
    //         MiniSpotify
    //       </Typography>
    //       <Paper className={classes.searchB}>
    //         <InputBase placeholder="   Search here" className={classes.searchB} onChange={(e) =>

    //             setSval(e.target.value) }>

    //         </InputBase>
    //       </Paper>
    //       <Link to={`/search/${sval}`}>
    //       <SearchIcon className={classes.MysearchIcon} />
    //       </Link>
    //       <Button color="inherit" onClick={() => LoginNow()}>Login</Button>
    //     </Toolbar>
    //   </AppBar>
    //   <Toolbar />
    // </div>


    <div className="top-side">

      {/* Left arrows */}
      <div className="lefty">
        <KeyboardArrowLeftRoundedIcon />
        <KeyboardArrowRightRoundedIcon />
        <input type="text"  className="search-box" onChange={(e) =>setSval(e.target.value) }/>
        <Link to={`/search/${sval}`}>
          <SearchIcon />
        </Link>
      </div>

      {/* right part */}
      <div className="login-part">
        <button className="upgrade-button" onClick={() => LoginNow()} ><b>Login</b></button>
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg" data-testid="user-icon"><path d="M15.216 13.717L12 11.869C11.823 11.768 11.772 11.607 11.757 11.521C11.742 11.435 11.737 11.267 11.869 11.111L13.18 9.57401C14.031 8.58001 14.5 7.31101 14.5 6.00001V5.50001C14.5 3.98501 13.866 2.52301 12.761 1.48601C11.64 0.435011 10.173 -0.0879888 8.636 0.0110112C5.756 0.198011 3.501 2.68401 3.501 5.67101V6.00001C3.501 7.31101 3.97 8.58001 4.82 9.57401L6.131 11.111C6.264 11.266 6.258 11.434 6.243 11.521C6.228 11.607 6.177 11.768 5.999 11.869L2.786 13.716C1.067 14.692 0 16.526 0 18.501V20H1V18.501C1 16.885 1.874 15.385 3.283 14.584L6.498 12.736C6.886 12.513 7.152 12.132 7.228 11.691C7.304 11.251 7.182 10.802 6.891 10.462L5.579 8.92501C4.883 8.11101 4.499 7.07201 4.499 6.00001V5.67101C4.499 3.21001 6.344 1.16201 8.699 1.00901C9.961 0.928011 11.159 1.35601 12.076 2.21501C12.994 3.07601 13.5 4.24301 13.5 5.50001V6.00001C13.5 7.07201 13.117 8.11101 12.42 8.92501L11.109 10.462C10.819 10.803 10.696 11.251 10.772 11.691C10.849 12.132 11.115 12.513 11.503 12.736L14.721 14.585C16.127 15.384 17.001 16.884 17.001 18.501V20H18.001V18.501C18 16.526 16.932 14.692 15.216 13.717Z"></path></svg>
        <span>Hrishi</span>

      </div>
    </div>
  );
}
