import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

function App() {
  return (
    <div>
      <h1>Kenneth's <span className="highlight">SPOT</span>IFY</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults />
          {/* <!-- Add a Playlist component --> */}
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
