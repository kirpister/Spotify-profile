import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Artist,
  ArtistMore,
  Track,
  CurrentTrack,
  User,
} from "../Modules/Interfaces";
import "../App.css";
import { LoginContext } from "./LogIn";
import {
  getUserData,
  getCurrentTrack,
  getTopArtists,
  getTopTracks,
  getRecentTracks
} from "../Modules/DataService";

const Spotify: React.FC = () => {
  const token = useContext(LoginContext);
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [singleArtist, setSingleArtist] = useState<ArtistMore[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [tracksLong, setTracksLong] = useState<Track[]>([]);
  const [artistsLong, setArtistsLong] = useState<Artist[]>([]);
  const [userData, setUserData] = useState<User>();
  const [recentTracks, setRecentTracks] = useState<any[]>([]);

  const [switchDivs, setSwitchDivs] = useState<boolean>(false);
  const [term, setTerm] = useState<string>("Show Long Term");

  const handleClick = () => {
    setSwitchDivs(!switchDivs);
    setTerm(!switchDivs ? "Show Short Term" : "Show Long Term");
  };

  const getArtistInfo = async (id: string, name: string) => {
    const response = await axios.get<ArtistMore[]>(
      `https://api.spotify.com/v1/artists/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSingleArtist(response.data);
    console.log(singleArtist);
  };

  // API CALLS
  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {

      const [userData, currentTrack, artists, artistsLong, tracks, tracksLong] = await Promise.all([
        getUserData(token),
        getCurrentTrack(token),
        getTopArtists(token, "short_term"),
        getTopArtists(token, "long_term"),
        getTopTracks(token, "short_term"),
        getTopTracks(token, "long_term"),
        getRecentTracks(token)
      ]);
  
      setUserData(userData);
      setCurrentTrack(currentTrack);
      setArtists(artists);
      setArtistsLong(artistsLong);
      setTracks(tracks);
      setTracksLong(tracksLong);
      setRecentTracks(recentTracks);
    };
    fetchData();
    console.log(recentTracks);
    
  }, [token]);

  return (
    <>
      <div className="wrapper">
        <header>
          <div className="log-out">
            {userData ? (
              <p>
                Logged in as <a href="/">{userData?.display_name}</a>
              </p>
            ) : (
              <></>
            )}

            {userData ? (
              <a href="https://accounts.spotify.com/fi/status">
                <button>Log Out</button>
              </a>
            ) : (
              ""
            )}
          </div>
        </header>

        <div className="header-img">
          <h2 className="heading">
            {" "}
            Hello, <span>{userData?.display_name}</span>
          </h2>
        </div>
        <div className="user-img">
          <img src={userData?.images[0].url} alt="user-img"/>
        </div>
        {currentTrack ? (
          <div className="current-track">
            <p>
              Now playing:{" "}
              <span>
                {currentTrack.item.name} by {currentTrack.item.artists[0].name}
              </span>
            </p>
          </div>
        ) : (
          <h4>Looks like nothing is playing...</h4>
        )}

        {/* SHORT TERM ARTISTS AND TRACKS CONDITIONALLY RENDERS THE DIV BASED ON BTN CLICK*/}

        <div className="switch-btn-cont">
          <button className="switch-btn" onClick={handleClick}>
            {term}
          </button>
        </div>

        {!switchDivs ? (
          <div className="top-div">
            <div className="top-artists">
              <h3>Top Artists Short Term</h3>
              {artists.map((artist: any) => {
                return (
                  <div
                    className="list-div"
                    key={artist.id}
                    onClick={() => getArtistInfo(artist.id, artist.name)}
                  >
                    <img src={artist.images[0].url} alt={artist.name} />
                    <p>{artist.name}</p>
                  </div>
                );
              })}

              {Object.keys(singleArtist).length > 0 ? (
                <div className="artist-modal">
                  <div className="artist-detail">
                    <p>{singleArtist[0]?.name}</p>
                    <img
                      src={singleArtist[0]?.images[0]?.url}
                      alt={singleArtist[0]?.name}
                    />
                    <p>{singleArtist[0]?.type}</p>
                    <p>{singleArtist[0]?.popularity}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>



            <div className="top-tracks">
              <h3>Top Tracks Short Term</h3>
              {tracks.map((track: any) => (
                <div className="list-div" key={track.id}>
                  <img src={track.album.images[0].url} alt={track.name} />
                  <p>{track.artists[0].name} -</p>
                  <span>{track.name}</span>
                </div>
              ))}
            </div>
      
              {/* {singleArtist.length > 0 ? (
                <div className="artist-modal">
                  <div className="artist-detail">
                    <p>{singleArtist[0]?.name}</p>
                    <img
                      src={singleArtist[0]?.images[0].url}
                      alt={singleArtist[0]?.name}
                    />
                    <p>{singleArtist[0]?.type}</p>
                    <p>{singleArtist[0]?.popularity}</p>
                  </div>
                </div>
              ) : (
                ""
              )} */}
             </div>
               
            ) : (

              <div className="long-term">
                <div className="top-artists-long">
                  <h3>Top Artists Long Term</h3>
                  {artistsLong.map((artistL) => (
                    <div
                      className="list-div"
                      key={artistL.id}
                      onClick={() => getArtistInfo(artistL.id, artistL.name)}
                    >
                      <img src={artistL.images[0].url} alt={artistL.name} />
                      <p>{artistL.name}</p>
                    </div>
                  ))}
                </div>

                <div className="top-tracks-long">
                  <h3>Top Tracks Long Term</h3>
                  {tracksLong.map((trackL) => (
                    <div className="list-div" key={trackL.id}>
                      <img src={trackL.album.images[0].url} alt={trackL.name} />
                      <p>{trackL.artists[0].name} -</p>
                      <span>{trackL.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>   

          <div>
            <h3>Recently Played Tracks</h3>
            <ul>
              {recentTracks.map((track) => (
              <li key={track.played_at}>
                {track.track.artist} - {track.track.name}
              </li>
              ))}

            </ul>
          </div>    
  
        <div className="log-out">
          <a href="https://accounts.spotify.com/fi/status">
            <button>Log Out</button>
          </a>
        </div>
    </>
  );
};

export default Spotify;
