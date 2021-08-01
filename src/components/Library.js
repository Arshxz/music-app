import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({ songs, setCurrentSong, isPlaying, audioRef, setSongs, libraryStatus }) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                <LibrarySong 
                song={song} 
                songs={songs}
                id={song.id}
                setSongs={setSongs}
                key={song.id}
                isPlaying={isPlaying}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                libraryStatus = {libraryStatus}
                />
                ))}
            </div>
        </div>
    )
}

export default Library