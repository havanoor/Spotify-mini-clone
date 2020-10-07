import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
const darwerWidth=120
const useStyles = makeStyles((theme) => ({
    drawerContainer:{
        width:darwerWidth,
        // backgroundColor:"yellow",
        
        

    },
    sideBar:{
      backgroundColor:"#3C50FA",
      // color:"yellow",
      margin:"10px 10px 10px 10 px",
      borderRadius:"10px",
      textDecoration:"none"

    },
    side:{
      background:"#191A1F"
      
    },
    ICON:{
      color:"white",
      textDecoration:"None",
     
    },
    

    
  }));


function SideDrawer(){

    const classes = useStyles();






    return(
        <div  >

        <Drawer variant="permanent" elevation={0} classes={{paper:classes.side}}>


        <Toolbar />
        <div className={classes.drawerContainer} >
          <List className={classes.main} >
           
            <ListItem button key={"Home"} className={classes.sideBar}>
              <Link to='/'>
              <ListItemIcon><HomeIcon className={classes.ICON} /></ListItemIcon></Link>
              <Link to='/'><ListItemText primary={"Home"} className={classes.ICON} /></Link>
              

            </ListItem>
            <ListItem button key={"Browse"} className={classes.sideBar}>
              <Link to='/'>
              <ListItemIcon><LibraryMusicIcon className={classes.ICON} /></ListItemIcon></Link>
              <Link to='/'><ListItemText primary={"Browse"} className={classes.ICON} /></Link>
              

            </ListItem>
          </List>

          </div>


        </Drawer>


        </div>
    )
}




export default SideDrawer;