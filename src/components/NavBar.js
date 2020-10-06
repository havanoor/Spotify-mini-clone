import React,{useState,useEffect,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {SongContext} from './SongContext';
import RadioIcon from '@material-ui/icons/Radio';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { InputBase } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom'


let token, playerCheckInterval,player,playerposition;


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor:"yellow",
    height:"100px"
    
    
    
  },
  searchB:{
    backgroundColor:"#232931",
    color:"white",
    borderRadius:"10px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
   
  },
  title: {
    flexGrow: 1,
   
  },
  MysearchIcon:{
    color:"white"
  },
  
  temp:{
      
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor:"#191A1F"
  }
}));



export default function ButtonAppBar() {
  const classes = useStyles();
  const [sval,setSval]=useState('')
  const { artist,dura,pos,vol,imag,playStatus,device,track,player2,Liked,Recent  } = useContext(SongContext);
  const [token2, setToken] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const [artistName, setartistName] = artist;
  const [duration, setDuration] = dura;
  const [position, setPosition] = pos;
  const [volume, setVolume] = vol;
  const [image, setImage] = imag;
  const [playing, setPlaying] = playStatus
  const [deviceId, setdeviceId] = device
  const [trackName, settrackName] =track;
  const [temp,setTemp]=player2;
  const [data,setData]=Liked
  const [play,setrecentPlay]=Recent
  let likedSongs,recentlyPlayed;


    const getLikedSongs=()=>{
      fetch('http://localhost:8000/likedsongs')
      .then(response=>response.json())
      .then(val=>{
          setData(val)
          // console.log(val)
          likedSongs=val;
      }

      )
  }
  const getRecentlyPlayed=()=>{
    fetch('http://localhost:8000/recentlyplayed')
    .then(response=>response.json())
    .then(val=>{
        setrecentPlay(val)
        // console.log(val)
        recentlyPlayed=val;
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
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.temp}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <RadioIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MiniSpotify
          </Typography>
          <Paper className={classes.searchB}>
            <InputBase placeholder="   Search here" className={classes.searchB} onChange={(e) =>
                
                setSval(e.target.value) }>

            </InputBase>
          </Paper>
          <Link to={`/search/${sval}`}>
          <SearchIcon className={classes.MysearchIcon} />
          </Link>
          <Button color="inherit" onClick={() => LoginNow()}>Login</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
