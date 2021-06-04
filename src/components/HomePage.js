import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';

import Footer from './Footer'
import NavBar from './NavBar'
import SideDrawer from './SideDrawer'
import { SongContext } from './SongContext';

// NEwww
import './css/mainpage.css';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import cover from './master-cover.jpg'
import cover2 from './believe-cover.jpg'





function HomePage() {

  const { Recent, Liked } = useContext(SongContext)

  const [data, setData] = Liked
  const [play, setrecentPlay] = Recent
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)

  let likedSongs, recentlyPlayed;

  useEffect(() => {

    const getLikedSongs = () => {
      fetch('http://localhost:8000/likedsongs')
        .then(response => response.json())
        .then(val => {
          setData(val)
          // console.log(val)
          likedSongs = val;
        }

        )
    }
    const getRecentlyPlayed = () => {
      fetch('http://localhost:8000/recentlyplayed')
        .then(response => response.json())
        .then(val => {
          setrecentPlay(val)
          // console.log(val)
          recentlyPlayed = val;
        }

        )
    }

    getRecentlyPlayed()
    getLikedSongs()
    console.log(recentlyPlayed, "hiiiiii")

  }, [])

  const nextFour = () => {
    if ((end + 5) < data.length) {
      setStart(start + 5)
      setEnd(end + 5)
    }

    else {
      if (start != data.length - 5) { setStart(start + 5) }
      setEnd(data.length)
    }


    console.log("YESSS", start, end)

  }
  const previousFour = () => {
    if ((start - 5) > 0) {
      setEnd(end - 5)
      setStart(start - 5)
    }

    else {
      if (end > 5) {
        setEnd(end - 5)
      }
      setStart(0)
    }


    console.log("YESSS", start, end)

  }






  return (
    <div className="bada">
      <SideDrawer />
      <div className="right">
        <div className="top-side">

          {/* Left arrows */}
          <div>
            <KeyboardArrowLeftRoundedIcon />
            <KeyboardArrowRightRoundedIcon />
          </div>

          {/* right part */}
          <div className="login-part">
            <button className="upgrade-button"><b>Login</b></button>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg" data-testid="user-icon"><path d="M15.216 13.717L12 11.869C11.823 11.768 11.772 11.607 11.757 11.521C11.742 11.435 11.737 11.267 11.869 11.111L13.18 9.57401C14.031 8.58001 14.5 7.31101 14.5 6.00001V5.50001C14.5 3.98501 13.866 2.52301 12.761 1.48601C11.64 0.435011 10.173 -0.0879888 8.636 0.0110112C5.756 0.198011 3.501 2.68401 3.501 5.67101V6.00001C3.501 7.31101 3.97 8.58001 4.82 9.57401L6.131 11.111C6.264 11.266 6.258 11.434 6.243 11.521C6.228 11.607 6.177 11.768 5.999 11.869L2.786 13.716C1.067 14.692 0 16.526 0 18.501V20H1V18.501C1 16.885 1.874 15.385 3.283 14.584L6.498 12.736C6.886 12.513 7.152 12.132 7.228 11.691C7.304 11.251 7.182 10.802 6.891 10.462L5.579 8.92501C4.883 8.11101 4.499 7.07201 4.499 6.00001V5.67101C4.499 3.21001 6.344 1.16201 8.699 1.00901C9.961 0.928011 11.159 1.35601 12.076 2.21501C12.994 3.07601 13.5 4.24301 13.5 5.50001V6.00001C13.5 7.07201 13.117 8.11101 12.42 8.92501L11.109 10.462C10.819 10.803 10.696 11.251 10.772 11.691C10.849 12.132 11.115 12.513 11.503 12.736L14.721 14.585C16.127 15.384 17.001 16.884 17.001 18.501V20H18.001V18.501C18 16.526 16.932 14.692 15.216 13.717Z"></path></svg>
            <span>Hrishi</span>

          </div>
        </div>
        <h2>Good Afternoon</h2>
        {/* Recently played part */}
        <div className="top-recently-played-grid">
          <div className="one-block">
            <img src={cover} width={80} />
            <h3>Master(Original Motion Picture....</h3>
          </div>
          <div className="one-block">
            <img src={cover} width={80} />
            <h3>Master(Original Motion Picture....</h3>
          </div>
          <div className="one-block">
            <img src={cover} width={80} />
            <h3>Master(Original Motion Picture....</h3>
          </div>
          <div className="one-block">
            <img src={cover} width={80} />
            <h3>Master(Original Motion Picture....</h3>
          </div>
          <div className="one-block">
            <img src={cover} width={80} />
            <h3>Master(Original Motion Picture....</h3>
          </div>
          <div className="one-block">
            <img src={cover} width={80} />
            <h3>Master(Original Motion Picture....</h3>
          </div>
          <div className="one-block">
            <img src={cover} width={80} />
            <h3>Master(Original Motion Picture....</h3>
          </div>
          <div className="one-block">
            <img src={cover} width={80} />
            <h3>Master(Original Motion Picture....</h3>
          </div>

        </div>
        <br />
        <br />
        <br />
        <br />
        <h2>Recently Played</h2>
        {/* Jump right back in  */}


        <div class="jump-right-back-in-part">
          {play.slice(start, end).map((value) => (
            <div className="one-card">
              <img src={value.images.medium} width={153} />
              <h4>{value.trackname}</h4>
              <h5>When Chai met Toast</h5>

            </div>
          ))}
        </div>

        <h2>Liked Songs</h2>
        <div class="jump-right-back-in-part">
          {data.slice(start, end).map((value) => (
            <div className="one-card">
              <img src={value.images.medium} width={153} />
              <h4>{value.trackname}</h4>
              <h5>When Chai met Toast</h5>

            </div>
          ))}
        </div>


      </div>

      {/* <NavBar /> */}
      {/* <Grid container >


        <Grid item xs={1}>
         
        </Grid>


        <Grid item xs={10}>


          <b color="red">Recently PLayed</b> 
          <KeyboardArrowLeftIcon onClick={() => previousFour()} />
           <KeyboardArrowRightIcon onClick={() => nextFour()} />
          <Divider />

          <Grid container spacing={1}>

            {play.slice(start, end).map((value) => (

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
          <KeyboardArrowLeftIcon onClick={() => previousFour()} />
          <KeyboardArrowRightIcon onClick={() => nextFour()} />
          <Divider />

          <Grid container spacing={1}>

            {data.slice(start, end).map((value) => (

              <Grid item xs={3}>


                <Paper elevation={0} className={classes.paperdata} >
                  <img src={value.images.medium} className="myimg" />
                  <Typography align="center">{value.trackname}</Typography>

                </Paper>

              </Grid>





            ))}

          </Grid>


        </Grid>





      </Grid> */}
      <Footer />
    </div>

  )
}






export default HomePage;