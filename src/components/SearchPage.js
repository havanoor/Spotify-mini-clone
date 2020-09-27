import React,{useEffect, useState} from 'react';
import NavBar from './NavBar'
import SideDrawer from './SideDrawer'
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Grid from '@material-ui/core/Grid';


// import { useState } from 'react'

const useStyles = makeStyles({
    searchBar: {
      backgroundColor:"black",
      color:"#0d7377",
      marginLeft:"150px"

    },
    main:{marginLeft:"150px"},
    indi:{
      backgroundColor:"black",
      color:"white"
    },
    pap:{
      margin:"20px"
    },
    myimg:{
      padding:"10px"
    }
  });


function SearchPage(){
    const [value, setValue] =useState(0);
    const classes = useStyles();
    const [search,setSearch]=useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(()=>{

      const getSearchResults=()=>{
      fetch(`http://localhost:8000/search?name=${'Raghu dixit'}`)
      .then(response => response.json())
      .then(val => {

        console.log("Hi", ((val)));
        console.log("klsjdklsjkl")
        setSearch(val);
        
      })}
      
      getSearchResults()
      console.log("YOOOOO")

    },[])


    return(
        <div>
        <NavBar />
        <SideDrawer />
        <TabContext value={value} className={classes.main}>
        <Paper className={classes.searchBar} >
        <TabList onChange={handleChange} aria-label="simple tabs example">
      <Tab label="Albums" value="1" />
      <Tab label="Artists" value="2" />
      <Tab label="Artists" value="3" />
    </TabList>
    <TabPanel value="1">
    {//console.log(search.albums)
      search.albums &&(search.albums).map((value)=>(
        <Paper elevation={4} className={classes.pap}>
           <Grid container spacing={1}> 
            <Grid item xs={4}>
              <img src={value.images.medium.url} className={classes.myimg}/>
            </Grid>
            <Grid item xs={3}>
          <h3>{value.name}</h3>
      <h5>Release date:{value.release_date}</h5>
          </Grid>
          </Grid> 
          </Paper>
           
        
      ))
    }
    
    
    </TabPanel>
    <TabPanel value="2">
    {//console.log(search.albums)
      search.artists &&(search.artists).map((value)=>(
        <Paper elevation={4} className={classes.pap}>
           <Grid container spacing={1}> 
            <Grid item xs={4}>
              
              {value.images?(
                 <img src={value.images.medium.url} alt="none" className={classes.myimg}/> 
              ):(<h3>No images found</h3>)}
              
            </Grid>
            <Grid item xs={3}>
          <h1>{value.name}</h1>
          </Grid>
          </Grid> 
          </Paper>
           
        
      ))
    }
    
    
    </TabPanel>
    </Paper>
    </TabContext>

        </div>
    )

}






export default SearchPage;