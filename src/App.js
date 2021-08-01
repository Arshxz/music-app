import React, { useState, useRef } from "react";

// import Styles
import './styles/app.scss'

// import Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
import data from './data'

const App = () => {
  //Ref
  const audioRef= useRef(null)
  //State
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] =useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })
  const [libraryStatus, setLibraryStatus] = useState(false)
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({...songInfo, currentTime: current, duration})
  }
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)    
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      if(isPlaying) {
        audioRef.current.play()
      }
    }


  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} setSongInfo={setSongInfo} songInfo={songInfo} songs={songs} setSongs={setSongs}/>
      <Library songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} audioRef={audioRef} setSongs={setSongs} libraryStatus = {libraryStatus}/>
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  )
}

export default App;
