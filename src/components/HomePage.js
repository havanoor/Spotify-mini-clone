import React,{useState,useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
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
      appbar:{zIndex: theme.zIndex.drawer + 1},
      
      paperdata:{
           width:300,
           height:400
           
      },drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerContainer: {
        overflow: 'auto',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      
  }));
  


  function HomePage(){
    const classes = useStyles();
   
    const [data,setData]=useState([])
    const [start,setStart]=useState(0)
    const [end,setEnd]=useState(4)
    let valioo;

    useEffect(()=>{

        const getRecentlyPlayed=()=>{
            fetch('http://localhost:8000/recentlyplayed')
            .then(response=>response.json())
            .then(val=>{
                setData(val)
                console.log(val)
                valioo=val;
            }

            ).then(done=>console.log("val",valioo))
        }

        getRecentlyPlayed()
        console.log(valioo,"hiiiiii")

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
            <Grid container spacing={2}>
                <Grid item xs={12}>
            <AppBar position="fixed" color='primary' className={classes.appbar}>
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      News
    </Typography>
    <Button>Login</Button>
  </Toolbar>
</AppBar>
</Grid>
<Grid item xs={2}>
<Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
            paper: classes.drawerPaper,
          }}
        
      >
        <Toolbar />
          <div className={classes.drawerContainer}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      </Grid>
      <Grid item xs={10}>
      <Grid item xs={10}>
        <Toolbar />
              <b color="red">Recently PLayed</b>
              <KeyboardArrowLeftIcon  onClick={()=>previousFour()} />
              <KeyboardArrowRightIcon onClick={()=>nextFour()} />
              <Divider />  
            </Grid>
                <Grid container>
                
          {data.slice(start,end).map((value) => (
              <Grid item xs={3}>
                <div>  
                    
                    <Paper elevation={3} className={classes.paperdata} >
                    <img src={value.images.medium} className="myimg" />
                    <Typography align="center">{value.trackname}</Typography>

                        </Paper>
                                         
                </div>
                 </Grid>
                

          ))}
                </Grid>
               
         
          </Grid>
          </Grid>
        </div>

    )
  }






  export default HomePage;