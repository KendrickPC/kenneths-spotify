import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      // Update the state of searchResults with the search method of Spotify.js.
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
    };
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState( {playlistTracks: tracks} );
    }
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
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    //  Pass the trackURIs array and playlistName to a method (later) that will save the user’s playlist to their account.
    Spotify.savePlaylist(this.state.playlistName, trackUris).then( () => {
      alert('Playlist saved!');
      this.setState( {
        playlistName: `New Playlist`,
        playlistTracks: [],
      } )
    });
  }

  search(term) {
    return Spotify.search(term).then(searchResults => {
      this.setState( {searchResults: searchResults} )
    })
  }

  render () {
    return (
      <div>
      <h1>Kenneth's <span className="highlight">SPOT</span>IFY</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar
          onSearch={this.search}
          onClick = {this.search}
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

  componentDidMount() {
    window.addEventListener('load', Spotify.search(''));
  }

}



export default App;
