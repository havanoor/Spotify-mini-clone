import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {useState,useEffect} from 'react';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseCircleFilledRoundedIcon from "@material-ui/icons/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import {SongContext} from './SongContext';



const useStyles = makeStyles((theme)=>({
  root: {
    
    backgroundColor:"blue",
    position:"absolute",
    bottom:"0px",
    width:"100%",
    // marginLeft:"160px",
    zIndex: theme.zIndex.drawer + 1,
    
  },
  poppy:{
    width:"500px",
    marginBottom:"200px",
    height:"500px"
    
  },
  imag:{
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:"15px",
    display:"flex"

  },
  buttons: {
    display:"inline",
   
     },
}));

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { artist,dura,pos,vol,imag,play,device,track,player2  } = React.useContext(SongContext);
  const [image, setImage] = imag;
  const [playing, setPlaying] = play;
  const [artistName, setartistName] = artist;
  
  const [trackName, settrackName] =track;
  const [temp,setTemp]=player2;

  

  const handlePopper=(event)=>{
    setAnchorEl(event.currentTarget)

  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const playNextTrack = () => {
    temp.nextTrack();
  };
  const playPreviousTrack = () => {
    temp.previousTrack();
  };
const playPauseToggle = () => {
    console.log("inside toggle");
    console.log(playing);
    temp.togglePlay();

    // this.playerposition = setInterval(() => this.getState(), 1000);
  };





  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} onClick={handlePopper} />
      <Popover id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                      
                    }}
                    
                    elevation="27"
                   
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    
                   
                    >

                    <Paper elevation={0} className={classes.poppy} >

                      
                      
                      <img src={image} alt="lfhlkdshfjlkdfhlkdf" className={classes.imag} />
                      <h1 className="trackname">{trackName}</h1>
                      <h1 className="artistname">{artistName}</h1>

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
                      />
                    </Paper>
                    




                    </Popover>

    </BottomNavigation>
  );
}