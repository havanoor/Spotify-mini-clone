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
import PauseCircleFilledRoundedIcon from "@material-ui/icons/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import {SongContext} from './SongContext';


const useStyles = makeStyles({
  root: {
    
    backgroundColor:"blue",
    position:"absolute",
    bottom:"0px",
    // width:"100%",
    marginLeft:"160px"
    
  },
  poppy:{
    width:"500px",
    marginBottom:"200px",
    height:"400px"
    
  }
});

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { artist,dura,pos,vol,imag,play,device,track  } = React.useContext(SongContext);
  const [image, setImage] = imag;

  

  const handlePopper=(event)=>{
    setAnchorEl(event.currentTarget)

  }

  const handleClose = () => {
    setAnchorEl(null);
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

                      
                      <SkipNextRoundedIcon />
                      <img src={image} alt="lfhlkdshfjlkdfhlkdf" />

                    </Paper>
                    




                    </Popover>

    </BottomNavigation>
  );
}