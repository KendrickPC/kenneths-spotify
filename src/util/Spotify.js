const clientID = '573adad7e69c4042a21a0f02c4dddc8e';
const redirectURI = 'http://localhost:3000/';
let accessToken;

export const Spotify = {

  getAccessToken() {
    console.log("first")
    console.log(accessToken)
    if (accessToken) {
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      console.log("second")
      console.log(accessToken)
      let expireTime = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expireTime * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      console.log(jsonResponse.tracks);
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(name, trackURIs) {
    if (!name && trackURIs.length !== 0) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers: headers}).then(response => response.json()).then(jsonResponse => {
      userId = jsonResponse.id;

      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          name: name
        })
      }).then(response => response.json()).then(jsonResponse => {
        const playlistId = jsonResponse.id;

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({
            uris: trackURIs
          })
        });
      });
    });

  },

}

export default Spotify;