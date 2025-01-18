import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobDescription = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStartInterview = () => {
    if (!jobDescription.trim()) {
      setError('Please enter the job description.');
      return;
    }

    localStorage.setItem('jobDescription', jobDescription);
    navigate('/interview');
  };

  const handleInputChange = (e) => {
    setJobDescription(e.target.value);
    if (e.target.value.trim()) {
      setError('');
    }
  };

  return (
    <div id="job-description-container">
      <h1 id="job-description-heading" style={{ color: '#000' }}>Job Description</h1>
      <textarea
        value={jobDescription}
        onChange={handleInputChange}
        placeholder="Enter the job description here"
        required
      />
      {error && <p style={{ color: 'red'}}>{error}</p>}
      <button onClick={handleStartInterview} disabled={!jobDescription.trim()}>
        Start Interview
      </button>
    </div>
  );
};

export default JobDescription;
