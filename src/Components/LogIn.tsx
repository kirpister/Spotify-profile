import { createContext, useState, useEffect } from "react";
import queryString from "query-string";
import "../App.css";

import Spotify from "./Spotify";

export const LoginContext = createContext("");

const LogIn = () => {
  const [token, setToken] = useState<string>("");

  const scopes = [
    "user-read-playback-state",
    "user-library-read",
    "user-top-read",
    "user-read-recently-played",
  ];

  const handleLogin = () => {
    const redirectToSpotify = `https://accounts.spotify.com/authorize?client_id=${
      process.env.REACT_APP_CLIENT_ID
    }&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${scopes.join(
      "%20"
    )}&response_type=token`;
    window.location.href = redirectToSpotify;
  };

  useEffect(() => {
    const token = queryString.parse(window.location.hash).access_token;
    if (token) {
      setToken(token as string);
    }
    window.location.hash = "";
  }, []);

  return (
    <LoginContext.Provider value={token}>
      <div className="wrapper">
        {token ? (
          <>
            <Spotify />
          </>
        ) : (
          <div className="intro">
            <h2>Spotify profile!</h2>
            <p className="intro-text">Share your taste in music!</p>
            <button onClick={handleLogin}>
              <p>Login with Spotify</p>
            </button>
          </div>
        )}
      </div>
    </LoginContext.Provider>
  );
};

export default LogIn;
