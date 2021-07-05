import React, { useState, useEffect, useContext } from 'react'

import Footer from './Footer'
import NavBar from './NavBar'
import SideDrawer from './SideDrawer'
import { SongContext } from './SongContext';

// NEwww
import './css/mainpage.css';





function HomePage() {

  const { Recent, Liked, Album } = useContext(SongContext)

  const [data, setData] = Liked
  const [play, setrecentPlay] = Recent
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)
  const [albums, recentalbum] = Album


  useEffect(() => {

    const getLikedSongs = () => {
      fetch('http://localhost:8000/likedsongs')
        .then(response => response.json())
        .then(val => {
          setData(val)

        }

        )
    }
    const getRecentlyPlayed = () => {
      fetch('http://localhost:8000/recentlyplayed')
        .then(response => response.json())
        .then(val => {
          
          setrecentPlay(val)

        }

        )
    }

    const getalbums = () => {
      fetch('http://localhost:8000/albums')
        .then(response => response.json())
        .then(val => {
          recentalbum(val)
          // console.log(val)

        }
        )
    }

    getalbums()
    getRecentlyPlayed()
    getLikedSongs()



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
        <NavBar />



        <h2>Good Afternoon</h2>
        {/* Recently played part */}
        <br />
        <div className="top-recently-played-grid">

          {albums.map((value, index) => (<div key={index} className="one-block">
            <img src={value.images.medium} width={80} />
            <h3>{value.album}</h3>
          </div>))
          }


        </div>
        <br />
        <br />
        <br />
        <br />
        <h2>Recently Played</h2>
        {/* Jump right back in  */}

        <br />
        <div className="jump-right-back-in-part">
          {play.slice(start, end).map((value, index) => (
            <div key={index} className="one-card">
              <img src={value.images.medium} width={153} />
              <h4>{value.trackname}</h4>
              <h5>{value.artists[0].name}</h5>

            </div>
          ))}
        </div>
        <br />
        <br />
        <br />
        <br />
        <h2>Liked Songs</h2>
        <br />
        <div className="jump-right-back-in-part">
          {data.slice(start, end).map((value) => (
            <div className="one-card">
              <img src={value.images.medium} width={153} />
              <h4>{value.trackname}</h4>
              <h5>When Chai met Toast</h5>

            </div>
          ))}
        </div>


      </div>

     
      <Footer />
    </div >

  )
}






export default HomePage;