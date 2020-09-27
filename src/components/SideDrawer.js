import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
const darwerWidth=150
const useStyles = makeStyles((theme) => ({
    drawerContainer:{
        width:darwerWidth
    }
    
  }));


function SideDrawer(){

    const classes = useStyles();






    return(
        <div>

        <Drawer variant="permanent" elevation={0}>


        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
            <ListItem button key={"Home"}>
              <Link to='/'>
              <ListItemIcon><HomeIcon /></ListItemIcon></Link>
              <Link to='/'><ListItemText primary={"Home"}/></Link>
              

            </ListItem>
          </List>

          </div>


        </Drawer>


        </div>
    )
}




export default SideDrawer;