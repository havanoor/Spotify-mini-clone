import React, { useContext } from 'react';

import { useState } from 'react';
import { SongContext } from './SongContext';
import { Slider, LinearProgress } from "@material-ui/core";
import MusicNoteIcon from '@material-ui/icons/MusicNote';

// #NEWWWWW
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import './css/footer.css'



export default function Footer() {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { artist, dura, pos, vol, imag, playStatus, device, track, player2 } = React.useContext(SongContext);
  const [image, setImage] = imag;
  const [playing, setPlaying] = playStatus;
  const [artistName, setartistName] = artist;
  const [volume, setVolume] = vol;
  const [duration, setDuration] = dura;
  const [position, setPosition] = pos;


  const [trackName, settrackName] = track;
  const [temp, setTemp] = player2;


  const transform = (val) => (val * 100) / duration;
  const handlePopper = (event) => {
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

  const handleChange = () => {
    let x = document.getElementById("volume").value;
    // console.log("-->",x);
    setVolume(x);
    temp.setVolume(x / 100);
  };
  const changePosition = (event, newValue) => {
    let x = document.getElementById("pgbar").value;
    setPosition(x);
    temp.seek(x);
  };

  const displayWindow=()=>{
    console.log("Clicked")
    let chk=document.getElementById("poppy").style.display;
    console.log(chk)
    if(chk=="none")
      {document.getElementById("poppy").style.display = "flex";}
    else
      {document.getElementById("poppy").style.display = "none";}

  }


  return (
    //     
    //       <Popover id={id}
    //                     open={open}
    //                     anchorEl={anchorEl}
    //                     onClose={handleClose}
    //                     anchorOrigin={{
    //                       vertical: 'top',
    //                       horizontal: 'center',

    //                     }}

    //                     elevation="27"

    //                     transformOrigin={{
    //                       vertical: 'top',
    //                       horizontal: 'center',
    //                     }}


    //                     >

    //                     <Paper elevation={0} className={classes.poppy} >



    //                       <img src={image[0].url} alt="Not Playing" className={classes.imag} />
    //                       <h1 className="trackname">{trackName}</h1>
    //                       <h1 className="artistname">{artistName}</h1>
    //                       <LinearProgress
    //             variant="determinate"
    //             className={classes.prgbar}
    //             value={transform(position)}
    //           />
    //           <Slider
    //             className={classes.prgbar}
    //             min={0}
    //             max={duration}
    //             value={position}
    //             onChange={changePosition}
    //             aria-labelledby="continuous-slider"
    //           />

    //                       <SkipPreviousRoundedIcon
    //                       className={classes.buttons}
    //                       onClick={() => playPreviousTrack()}
    //                       fontSize="large"
    //                        />
    //                       {playing ? (
    //               <PlayArrowRoundedIcon
    //                 color="inherit"
    //                 fontSize="large"
    //                 onClick={() => playPauseToggle()}
    //                 className={classes.buttons}
    //               />
    //             ) : (
    //               <PauseCircleFilledRoundedIcon
    //                 color="inherit"
    //                 fontSize="large"
    //                 onClick={() => playPauseToggle()}
    //                 className={classes.buttons}
    //               />
    //             )}
    //                       <SkipNextRoundedIcon 
    //                       onClick={() => playNextTrack()}
    //                       className={classes.buttons}
    //                       fontSize="large"
    //                       />

    //             <div className={classes.slid}>

    //                         <Slider
    //                           value={volume}
    //                           min={0}
    //                           max={100}
    //                           onChange={handleChange}
    //                           aria-labelledby="continuous-slider"
    //                         />
    //                       </div>






    //                     </Paper>





    //                     </Popover>

    //     </BottomNavigation>
    //     </div>

    <footer className="foot">
      {/* Left part */}
      <div className="album-part">
      <img src={image[1].url} alt="Not Playing"  />
        <div >
          <h6>{trackName}</h6>
          <p>{artistName}</p>

        </div>


      </div>
      {/* Middle Player controls */}
      <div className="player-controls">
        <div>
          <SkipPreviousIcon style={{ fontSize: 30 }} onClick={() => playPreviousTrack()} />
          {/* <PlayCircleFilledIcon style={{ fontSize: 30 }} /> */}

          {playing ? (
                  <PlayCircleFilledIcon
                    color="inherit"
                    fontSize="large"
                    onClick={() => playPauseToggle()}
                    
                  />
                ) : (
                  <PauseCircleFilledIcon
                    color="inherit"
                    fontSize="large"
                    onClick={() => playPauseToggle()}
                    
                  />
                )}


          <SkipNextIcon style={{ fontSize: 30 }} />
        </div>
        {/* <progress id="pgbar" value="32" max="100" /> */}
        <input type="range" min="0" max={duration} value={position} id="pgbar" onChange={changePosition}></input>
       
      </div>

      {/* Right options */}
      <div className="right-controls">

        <PlaylistPlayIcon  onClick={displayWindow}/>
          <div id="poppy" >
          
         
          {/* <PlayCircleFilledIcon style={{ fontSize: 30 }} /> */}
          <img src={image[0].url} alt="Not Playing"  />
          <br/>
                          <h1 className="trackname">{trackName}</h1>
                          <h1 className="artistname">{artistName}</h1>

          <div className="playback">
          <SkipPreviousIcon style={{ fontSize: 30 }} onClick={() => playPreviousTrack()} />                  
          {playing ? (
                  <PlayCircleFilledIcon
                    color="inherit"
                    fontSize="large"
                    onClick={() => playPauseToggle()}
                    
                  />
                ) : (
                  <PauseCircleFilledIcon
                    color="inherit"
                    fontSize="large"
                    onClick={() => playPauseToggle()}
                    
                  />
                )}

          
          <SkipNextIcon style={{ fontSize: 30 }} />
          </div>
          <input type="range" min="0" max={duration} value={position} id="pgbar" onChange={changePosition}></input>

          {/* <VolumeDownIcon />
        <input type="range" min="0" max="100" value={volume} id="volume" onChange={handleChange}></input>
        <VolumeUpIcon /> */}
          

        </div>
        <DevicesOtherIcon />
        
        <VolumeDownIcon />
        <input type="range" min="0" max="100" value={volume} id="volume" onChange={handleChange}></input>
        <VolumeUpIcon />
       
      </div>



    </footer>


  );
}