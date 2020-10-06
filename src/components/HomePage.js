import React,{useState,useEffect,useContext} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Footer from './Footer'
import NavBar from './NavBar'
import SideDrawer from './SideDrawer'
import {SongContext} from './SongContext';



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
       
        width:"20px"

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
    const {Recent,Liked}=useContext(SongContext)
   
    const [data,setData]=Liked
    const [play,setrecentPlay]=Recent
    const [start,setStart]=useState(0)
    const [end,setEnd]=useState(4)
    
    let likedSongs,recentlyPlayed;

    useEffect(()=>{

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

    
  

    

    return(
        <div >
           
            <NavBar />
            <Grid container >

            
            <Grid item xs={1}>
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