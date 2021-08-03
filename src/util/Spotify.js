const clientID = '573adad7e69c4042a21a0f02c4dddc8e';
const redirectURI = "http://localhost:3000/";
let accessToken;

export const Spotify = {

  getAccessToken() {
    if (accessToken !== '') {
      return accessToken;
    }
    const hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (hasAccessToken && hasExpiresIn) {
      accessToken = hasAccessToken[1];
      const expiresIn = Number(hasExpiresIn[1])
      // Clears the parameter from the URL, so the app doesn't try grabbing the access token after it has expired.
      window.setTimeout( () => accessToken = '', expiresIn * 1000 );
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
      }
  },
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  search(term) {
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

    return fetch(`https://api.spotify.com/v1/me`, {headers: headers} ).then(
      response => {
        if (response.ok) {
          return response.json();
        } 
      }
    )

  },
  
};


