import React, { useState, useEffect } from "react";
import queryString from "query-string";
import axios from "axios";

import './App.css';

const scopes = ["user-read-playback-state", "user-library-read", "user-top-read"];

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  album: { images: { url: string }[] };
  artists: { name: string }[];
}

interface CurrentTrack {
  item: {
    name: string;
    artists: { name: string }[];
  };
}

const Spotify: React.FC = () => {

  const [token, setToken] = useState<string>('');
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);


  // AUTH

  const handleLogin = () => {
    const redirectToSpotify = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${scopes.join(
      "%20"
    )}&response_type=token`;
    window.location.href = redirectToSpotify;
  };

  useEffect(() => {
    const token = queryString.parse(window.location.hash).access_token;
    if (token) {
      setToken(token as string);
    }
    window.location.hash = '';
  }, []);

  // API CALLS

  useEffect(() => {
    if (!token) return;

    const getCurrentTrack = async () => {
      const response = await axios.get<CurrentTrack>("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCurrentTrack(response.data);
    };

    const getTopTracks = async () => {
      const response = await axios.get<{ items: Track[] }>("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTracks(response.data.items);
    };

    const getTopArtists = async () => {
      const response = await axios.get<{ items: Artist[] }>("https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setArtists(response.data.items);
    };

    getCurrentTrack();
    getTopTracks();
    getTopArtists();

  }, [token]);

  return (

    <>
    <div className="wrapper">
      
      {token ? (
        <div className="wrapper">
          <div className="header-img">
          <h2 className="heading">Spotify profile</h2>
          </div>
          {currentTrack ? (
            <div className="current-track">
              <p>Now playing: <span>{currentTrack.item.name} by {currentTrack.item.artists[0].name}</span></p>
            </div>
          ) : (
            <h4>Loading current track...</h4>
          )}
        <div className="top-div">

          <div className="top-artists">
            <h3>Top Artists</h3>
            {artists.map(artist => (
              <div className="list-div" key={artist.id}>
              <img src={artist.images[0].url} alt={artist.name} />
              <p>{artist.name}</p>
          </div>
      ))}</div>

          <div className="top-tracks">
            <h3>Top Tracks</h3>
            {tracks.map(track => (
              <div className="list-div" key={track.id}>
              <img src={track.album.images[0].url} alt={track.name} />
              <p>{track.artists[0].name} -</p><span>{track.name}</span>
          </div>
      ))}</div>  

          </div>
          <div className="log-out"><a href="https://accounts.spotify.com/fi/status"><button>Log Out</button></a></div>
        </div>

        ) : (

        // MAIN PAGE BEFORE AUTH  
            
         <div className="intro"> 
            <h2>Spotify profile!</h2>
            <p className="intro-text">Whatever content text</p>
            <button onClick={handleLogin}><p>Login with Spotify</p></button>
        </div>
      )}
  
  
    </div>
    </>

  )};

  export default Spotify;