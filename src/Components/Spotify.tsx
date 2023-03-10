import { useState, useEffect, useContext } from "react";
import {Artist, Track, CurrentTrack } from "../Modules/Interfaces"
import axios from "axios";
import '../App.css';
import { LoginContext } from "./LogIn";

const Spotify: React.FC = () => {
  const token = useContext(LoginContext)
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [tracksLong, setTracksLong] = useState<Track[]>([]);
  const [artistsLong, setArtistsLong] = useState<Artist[]>([]);

  const [switchDivs, setSwitchDivs] = useState<boolean>(false);
  const [term, setTerm] = useState<string>('Show Long Term');

  const handleClick = () => {
    setSwitchDivs(!switchDivs);
    setTerm(!switchDivs ? 'Show Short Term' : 'Show Long Term')
  };
  const getArtistInfo = (id: string, name: string,) => {
    console.log(`Clicked artists ${id} and ${name} `)
  }

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
      const response = await axios.get<{ items: Track[] }>("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTracks(response.data.items);
    };

    const getTopArtists = async () => {
      const response = await axios.get<{ items: Artist[] }>("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setArtists(response.data.items);
    };

    const getTopTracksLong = async () => {
      const response = await axios.get<{ items: Track[] }>("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTracksLong(response.data.items);
    };

    const getTopArtistsLong = async () => {
      const response = await axios.get<{ items: Artist[] }>("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setArtistsLong(response.data.items);
    };

    getCurrentTrack();
    getTopTracks();
    getTopArtists();
    getTopTracksLong();
    getTopArtistsLong();

  }, [token]);

  return (

    <>
      <div className="wrapper">
        {
          <div className="wrapper">
            <div className="header-img">
              <h2 className="heading">Spotify profile</h2>
            </div>
            {currentTrack ? (
              <div className="current-track">
                <p>Now playing: <span>{currentTrack.item.name} by {currentTrack.item.artists[0].name}</span></p>
              </div>
            ) : (
              <h4>Looks like nothing is playing...</h4>
            )}

            {/* SHORT TERM ARTISTS AND TRACKS CONDITIONALLY RENDERS THE DIV BASED ON BTN CLICK*/}

            <div className="switch-btn-cont">
              <button className="switch-btn" onClick={handleClick}>{term}</button>
            </div>

            {!switchDivs ? (

              <div className="top-div">

                <div className="top-artists" >
                  <h3>Top Artists Short Term</h3>
                  {artists.map(artist => (

                    <div className="list-div" key={artist.id} >
                      <img src={artist.images[0].url} alt={artist.name} />
                      <p>{artist.name}</p>
                    </div>

                  ))}</div>

                <div className="top-tracks">
                  <h3>Top Tracks Short Term</h3>
                  {tracks.map(track => (
                    <div className="list-div" key={track.id}>
                      <img src={track.album.images[0].url} alt={track.name} />
                      <p>{track.artists[0].name} -</p><span>{track.name}</span>
                    </div>
                  ))}</div>

              </div>

            ) : (

              <div className="long-term">

                <div className="top-artists-long">
                  <h3>Top Artists Long Term</h3>
                  {artistsLong.map(artistL => (
                    <div className="list-div" key={artistL.id} onClick={() => getArtistInfo(artistL.id, artistL.name)}>
                      <img src={artistL.images[0].url} alt={artistL.name} />
                      <p>{artistL.name}</p>
                    </div>
                  ))}</div>

                <div className="top-tracks-long">
                  <h3>Top Tracks Long Term</h3>
                  {tracksLong.map(trackL => (
                    <div className="list-div" key={trackL.id}>
                      <img src={trackL.album.images[0].url} alt={trackL.name} />
                      <p>{trackL.artists[0].name} -</p><span>{trackL.name}</span>
                    </div>
                  ))}</div>

              </div>
            )}

            <div className="log-out"><a href="https://accounts.spotify.com/fi/status"><button>Log Out</button></a></div>
          </div>

        }


      </div>
    </>

  )
};

export default Spotify;