import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import {useState} from 'react';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseCircleFilledRoundedIcon from "@material-ui/icons/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import {SongContext} from './SongContext';
import { Slider, LinearProgress } from "@material-ui/core";



const useStyles = makeStyles((theme)=>({
  root: {
    
    backgroundColor:"#323232",
    
    bottom:"0px",
    width:"100%",
    // marginLeft:"160px",
    zIndex: theme.zIndex.drawer + 1,
    bottom: 0,
    position:"fixed",
    
    
    
  },
  prgbar: {
    width: 300,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    color:"white"
  },
  poppy:{
    width:"500px",
    // marginBottom:"200px",
    height:"730px",
    backgroundColor:"#323232",

    
  },
  imag:{
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:"15px",
    display:"flex"

  },
  Navimg:{
    marginLeft:"10px",
    position:"absolute",
    marginLeft:0,
    marginRight:"auto",
    float:"left"
  },
  buttons: {
    display:"inline",
    fill:"white",
    color:"white"
   
     },
     temp:{
      height:"100px",
     
      
     },
     slid:{
      width: 200,
      //position: "relative",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      //left: 700,
    },
    new:{
      marginRight:"auto",
    },
    new2:{
      marginLeft:"auto",
      color:"white"
    }

}));

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { artist,dura,pos,vol,imag,playStatus,device,track,player2  } = React.useContext(SongContext);
  const [image, setImage] = imag;
  const [playing, setPlaying] = playStatus;
  const [artistName, setartistName] = artist;
  const [volume, setVolume] = vol;
  const [duration, setDuration] = dura;
  const [position, setPosition] = pos;

  
  const [trackName, settrackName] =track;
  const [temp,setTemp]=player2;

  
  const transform = (val) => (val * 100) / duration;
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

  const handleChange = (event, newValue) => {
    setVolume(newValue);
    temp.setVolume(newValue / 100);
  };
  const changePosition = (event, newValue) => {
    setPosition(newValue);
    temp.seek(newValue);
  };




  return (
    <div className={classes.temp}>
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      
      <BottomNavigationAction className={classes.new} icon={<img src={image[1].url} alt="Not Playing"  />} />
      <BottomNavigationAction style={{color:"white"}} label="Previous"  icon={<SkipPreviousRoundedIcon
                      className={classes.buttons}
                      onClick={() => playPreviousTrack()}
                      fontSize="large"
                       />} />
      <BottomNavigationAction style={{color:"white"}}  label={playing?("Play"):("Pause")} icon={playing ? (
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
            
            />
      
      <BottomNavigationAction style={{color:"white"}} label="Next" icon={<SkipNextRoundedIcon 
                      onClick={() => playNextTrack()}
                      className={classes.buttons}
                      fontSize="large"
                      
                      />

} />  

      <BottomNavigationAction   icon={<Slider
            className={classes.prgbar}
            min={0}
            max={duration}
            value={position}
            onChange={changePosition}
            aria-labelledby="continuous-slider"
          />} />
      <BottomNavigationAction className={classes.new2} label="Nearby" icon={<LibraryMusicIcon className={classes.buttons} />} onClick={handlePopper} />
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

                      
                      
                      <img src={image[0].url} alt="Not Playing" className={classes.imag} />
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

            <div className={classes.slid}>
              
                        <Slider
                          value={volume}
                          min={0}
                          max={100}
                          onChange={handleChange}
                          aria-labelledby="continuous-slider"
                        />
                      </div>
   





                    </Paper>
                    




                    </Popover>

    </BottomNavigation>
    </div>
  );
}