const clientID = '573adad7e69c4042a21a0f02c4dddc8e';
const redirectURI = "http://localhost:3000/";

let accessToken;

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (hasAccessToken && hasExpiresIn) {
      accessToken = hasAccessToken[1];
      let expiresIn = Number(hasExpiresIn[1])
      // clears the params and acquires a new access token when upon expiration.
      window.setTimeout( () => accessToken = '', expiresIn * 1000 );
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location.href = accessUrl;
      }
  },
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    .then(response => response.json())
    .catch((error)  => {
      console.log('Error:', error);
    })
    .then( jsonResponse => {
      if(!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map( track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        cover: track.album.images[2].url,
        preview: track.preview_url,
      }))
    })
  },

  savePlaylist(name, trackUris) {
    if (!name && !trackUris) {
      return;
    }
    let accessToken = Spotify.getAccessToken();
    let headers = {
      Authorization: `Bearer ${accessToken}`,

    };
    let userID;

    return fetch(`https://api.spotify.com/v1/me`, {headers: headers} 
      ).then(
        response => {
          if (response.ok) {
            return response.json();
          } 
        }
      ).then(
       jsonResponse => {
         userID = jsonResponse.id;
         return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
           headers: headers,
           method: 'POST',
           body: JSON.stringify( {name: name} )
         })
       }
      ).then(response => response.json() 
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify( {uris: trackUris} ),
        })
      })

  },
  
};


export default Spotify;