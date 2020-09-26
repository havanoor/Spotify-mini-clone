import React,{useState} from 'react';
import NavBar from './NavBar'
import SideDrawer from './SideDrawer'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

// import { useState } from 'react'

const useStyles = makeStyles({
    searchBar: {
      backgroundColor:"black",
      color:"#0d7377",
      marginLeft:"150px"

    },
    main:{marginLeft:"150px"}
  });


function SearchPage(){
    const [value, setValue] =useState(0);
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return(
        <div>
        <NavBar />
        <SideDrawer />
        <TabContext value={value} className={classes.main}>
        <Paper className={classes.searchBar} >
        <TabList onChange={handleChange} aria-label="simple tabs example">
      <Tab label="Albums" value="1" />
      <Tab label="Songs" value="2" />
      <Tab label="Artists" value="3" />
    </TabList>
    <TabPanel value="1">Item One</TabPanel>
    </Paper>
    </TabContext>

        </div>
    )

}






export default SearchPage;