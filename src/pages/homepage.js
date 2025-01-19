import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/homepage.css';

const Home = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('./jobDescription');
  };

  const goToHome = () => {
    navigate('./feedback');
  };
  

  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to Interview Analyzer</h1>
      <p className="home-description">
        Your ultimate tool for analyzing and improving interview skills.
      </p>
      <div className="home-buttons">
        <button
          className="home-button"
          onClick={(goToMain)}
        >
          Get Started
        </button>
        <button
          className="home-button"
          onClick={(goToHome)}
        >
          About Us
        </button>
      </div>
    </div>
  );
};

export default Home;
