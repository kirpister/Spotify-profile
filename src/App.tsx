import React, { useState, useEffect } from "react";
import queryString from "query-string";
import axios from "axios";

import "./App.css";

const clientId = "42ff73c74f314a5e9514343f5da732b2";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-read-playback-state", "user-library-read", "user-top-read"];

interface Track {
  item: {
    name: string;
    artists: { name: string }[];
  };
}

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const handleLogin = () => {
    const redirectToSpotify = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token`;
    window.location.href = redirectToSpotify;
  };

  useEffect(() => {
    const token = queryString.parse(window.location.hash).access_token;
    if (token) {
      setToken(token as string);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const getCurrentTrack = async () => {
      const response = await axios.get<Track>("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCurrentTrack(response.data);
    };

    getCurrentTrack();
  }, [token]);

  return (
    <div className="current">
      {token ? (
        <>
          {currentTrack ? (
            <>
              <p>
                Now playing: {currentTrack.item.name} by {currentTrack.item.artists[0].name}
              </p>
            </>
          ) : (
            <h3>Loading current track...</h3>
          )}
        </>
      ) : (
        <button onClick={handleLogin}><span>Login with Spotify</span></button>
      )}
    </div>
  );
};

export default App;
