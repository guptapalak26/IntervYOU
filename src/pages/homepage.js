import React from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../videos/homepage.mp4';
import '../css/homepage.css';

const Home = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('./jobDescription');
  };

  const goToHome = () => {
    navigate('./aboutus');
  };

  return (
    <div className="home-container">
      {/* Background video */}
      <video className="background-video" src={video} autoPlay loop muted></video>

      <div className="home-content">
        <h1 className="home-heading">Welcome to IntervYou</h1>
        <p className="home-description">
          Your ultimate tool for analyzing and improving interview skills.
        </p>
        <div className="home-buttons">
          <button className="home-button" onClick={goToMain}>
            Get Started
          </button>
          <button className="home-button" onClick={goToHome}>
            About Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
