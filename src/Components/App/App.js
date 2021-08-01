import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      searchResults: [
      {
        name: "HUH? NAME?",
        artist: "BTS",
        album: "The Most Beautiful Moment in Life",
        id: "1",
      },
      {
        name: "HUH? NAME2?",
        artist: "BTS2",
        album: "The Most Beautiful Moment in Life2",
        id: "2",
      },
    ],
    playlistName: "PIANO SONGS",
    playlistTracks: [
      {
        name: "Fix You",
        artist: "Coldplay",
        album: "Rush of Blood",
        id: "99",
      },
    ],
  };
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    };
    tracks.push(track);
    this.setState( {playlistTracks: tracks} );
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter( current => current.id !== track.id );
    this.setState( {playlistTracks: tracks} );
  }

  updatePlaylistName(name) {
    this.setState( {playlistName: name} )
  }

  savePlaylist() {
    const trackUris = this.state.playlistName.map(track => track.uri);
    //  Pass the trackURIs array and playlistName to a method (later) that will save the user’s playlist to their account.

  }

  search(term) {
    console.log(term);
  }

  render () {
    return (
      <div>
      <h1>Kenneth's <span className="highlight">SPOT</span>IFY</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar
          onSearch={this.search}
        />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
          />
          {/* <!-- Add a Playlist component --> */}
          <Playlist 
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
    </div>
    )
  }
}

export default App;
