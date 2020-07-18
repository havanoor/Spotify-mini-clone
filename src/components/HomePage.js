import React,{useState,useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import Popover from '@material-ui/core/Popover';
import './MainControl'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MainControl from './MainControl';
import PauseCircleFilledRoundedIcon from "@material-ui/icons/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import Footer from './Footer'
import NavBar from './NavBar'
import SideDrawer from './SideDrawer'


const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      'i': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    }, menuButton: {
        marginRight: theme.spacing(2),
      },
      drawer:{
       
        width:"200px"

      },
      drawerContainer:{
        backgroundColor:"#212121",
        color:"white"

      },
      paperdata:{
        backgroundColor:"#212121",
        
        color:"white",
        width:"310px",
        display:"inlineBlock"
      }

      
  }));
  


  function HomePage(){
    const classes = useStyles();
   
    const [data,setData]=useState([])
    const [play,setrecentPlay]=useState([])
    const [start,setStart]=useState(0)
    const [end,setEnd]=useState(4)
    
    let likedSongs,recentlyPlayed;

    useEffect(()=>{

        const getLikedSongs=()=>{
            fetch('http://localhost:8000/likedsongs')
            .then(response=>response.json())
            .then(val=>{
                setData(val)
                console.log(val)
                likedSongs=val;
            }

            ).then(done=>console.log("val",likedSongs))
        }
        const getRecentlyPlayed=()=>{
          fetch('http://localhost:8000/recentlyplayed')
          .then(response=>response.json())
          .then(val=>{
              setrecentPlay(val)
              console.log(val)
              recentlyPlayed=val;
          }

          ).then(done=>console.log("val",recentlyPlayed))
      }

        getRecentlyPlayed()
        getLikedSongs()
        console.log(recentlyPlayed,"hiiiiii")

    },[])

    const nextFour=()=>{
      if((end+4)<data.length)
      {setStart(start+4)
        setEnd(end+4)}
    
      else
      { if(start!=data.length-4)
      
        {setStart(start+4)}
        setEnd(data.length)}

      
      console.log("YESSS",start,end)
      
    }
    const previousFour=()=>{
      if((start-4)>0)
      {setEnd(end-4)
        setStart(start-4)}
    
      else
      { if(end>4){
        setEnd(end-4)}
        setStart(0)}

      
      console.log("YESSS",start,end)
      
    }

    
  
      // setTimeout(() => {
      //   console.log("Bjassjk");
      //   console.log(token, "Kya hai ye");
      //   console.log();
      // }, 5000);
    
  

    

    return(
        <div >
           
            <NavBar />
            <Grid container spacing={1}>

            
            <Grid item xs={2}>
      <SideDrawer />
      </Grid>
     

      <Grid item xs={10}>
                

                <b color="red">Recently PLayed</b>
                <KeyboardArrowLeftIcon  onClick={()=>previousFour()} />
                <KeyboardArrowRightIcon onClick={()=>nextFour()} />
                <Divider />  
              
                <Grid container spacing={1}>
                
              {play.slice(start,end).map((value) => (
                
                <Grid item xs={3}>
                
                    
                    <Paper elevation={0} className={classes.paperdata} >
                    <img src={value.images.medium} className="myimg" />
                    <Typography align="center">{value.trackname}</Typography>

                        </Paper>

                        </Grid>
                                         
                
                 
                

            ))}

            </Grid>
            <Toolbar />

            <b color="red">Liked Songs</b>
                <KeyboardArrowLeftIcon  onClick={()=>previousFour()} />
                <KeyboardArrowRightIcon onClick={()=>nextFour()} />
                <Divider />  
              
                <Grid container spacing={1}>
                
              {data.slice(start,end).map((value) => (
                
                <Grid item xs={3}>
                
                    
                    <Paper elevation={0} className={classes.paperdata} >
                    <img src={value.images.medium} className="myimg" />
                    <Typography align="center">{value.trackname}</Typography>

                        </Paper>

                        </Grid>
                                         
                
                 
                

            ))}

            </Grid>

            
        </Grid>
        




        </Grid>
        <Footer />
        </div>

    )
  }






  export default HomePage;