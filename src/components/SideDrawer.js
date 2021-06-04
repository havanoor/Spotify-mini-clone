import React from 'react'
import './css/sidebar.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import logo from './spotify-logobw.png'
import liked from './likedsongs.jpeg'

function SideDrawer() {


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
            <li>Amit Trivedi Mix</li>
            <li>Kailash Kher Mix</li>
            <li>When Chai Met Toast Mix</li>
            <li>Tamil Indie</li>
            <li>Your Top Songs 2020</li>
          </ul>
        </div>
        <br />
        <div>
          <ul className="playlists">
            <li>Kailash kher hits</li>
            <li>This is Kailash Kher</li>
            <li>Soulful Sid Sriram</li>
            <li>Weekend Pop</li>
            <li>This is Maroon 5</li>
            <li>This is Maroon 5</li>
            <li>This is Maroon 5</li>
            <li>Weekend Pop</li>
            <li>This is Maroon 5</li>
            <li>This is Maroon 5</li>
            <li>This is Maroon 5</li><li>Weekend Pop</li>
            <li>This is Maroon 5</li>
            <li>This is Maroon 5</li>
            <li>This is Maroon 5</li><li>Weekend Pop</li>
            <li>This is Maroon 5</li>
            <li>This is Maroon 5</li>
            <li>This is Maroon 5</li>
          </ul>
        </div>
      </div>




    </div>






  )
}




export default SideDrawer;