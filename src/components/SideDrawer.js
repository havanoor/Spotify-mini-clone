import React, { useContext, useEffect } from 'react'
import './css/sidebar.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import logo from './spotify-logobw.png'
import liked from './likedsongs.jpeg'
import { SongContext } from './SongContext';
function SideDrawer() {
  const { Playlist } = useContext(SongContext)
  const [playlists, setPlaylists] = Playlist

  useEffect(() => {
    const getplaylists = () => {
      fetch('http://localhost:8000/playlists')
        .then(response => response.json())
        .then(val => {
          setPlaylists(val)
          console.log(val)

        }
        )
    }
    getplaylists()
  }, [])
  return (
    <div className="sidebar">


      <img className="main-logo" src={logo} width={130} />

      <ul className="side-nav-icons">
        <li><HomeIcon /> Home</li>
        <li><SearchIcon /> Search</li>
        <li><LibraryBooksRoundedIcon /> Your library</li>
      </ul>



      <div className="tabs-part">

        <div><img src={liked} width={24} alt="images" />Create Playlist</div>
        <div><img src={liked} width={24} alt="images" /> Liked Songs</div>

      </div>
      <hr className="sepr" />

      <div className="diff">
        <div>
          <ul className="playlists">
            {playlists.map((value, index) => (
              <li key={index}>{value}</li>)
            )}

          </ul>
        </div>
        <br />

      </div>




    </div>






  )
}




export default SideDrawer;