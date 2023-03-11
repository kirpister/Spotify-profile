import React from 'react';
import SpotifyLogo from '../assets/Spotify_Logo.png';

const Footer: React.FC = () => {
    return (
        <footer>
           <p>All data provided by</p>
           <a href="https://www.spotify.com/fi/signup" target="_blank" rel="noreferrer"><div className='logo-box'><img src={SpotifyLogo} alt="SpotifyLogo" /></div></a>
        </footer>
    );
};

export default Footer;