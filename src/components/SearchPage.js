import React,{useEffect, useState} from 'react';
import NavBar from './NavBar'
import SideDrawer from './SideDrawer'
import './css/searchpage.css';
import Footer from './Footer'
// import { useState } from 'react'



function SearchPage({match}){
    const [value, setValue] =useState(0);
    
    const [search,setSearch]=useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    console.log("HIII");
    useEffect(()=>{

      const getSearchResults=()=>{
      fetch(`http://localhost:8000/search?name=${match.params.name}`)
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
        <div className="bada" >
          <SideDrawer />

          <div className="right" >
         <NavBar />
        {/* <SideDrawer /> */}
        {/*<TabContext value={value} className={classes.main}>
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
    </TabContext> */}

    <h2>Top Result</h2>
    <br />
    <div className="search-topres">
      <img src={search.albums &&search.albums[0].images.medium.url}  width={90}/>
      <h2>{search.albums &&search.albums[0].name}</h2>
      <h6>{search.albums &&search.albums[0].release_date}</h6>

      {/* {search.albums &&search.albums[0].name} */}
      {/* {//console.log(search.albums)
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
    } */}

    </div>
    {/* <h2>Songs</h2> */}
    <br />
    <br />
    <h2>Artists</h2>
<br />
    <div className="jump-right-back-in-part">
          {search.albums &&search.albums.map((value) => (
            <div className="one-card">
              <img src={value.images.medium.url} width={153} />
              <br/>
              <h5>{value.name}</h5>
              

            </div>
          ))}
        </div>
    {/* <h2>Albums</h2> */}

        </div>
        <Footer />
        </div>
    )

}






export default SearchPage;