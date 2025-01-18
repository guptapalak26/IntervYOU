import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobDescription = () => {
  const [jobDescription, setJobDescription] = useState('');
  const navigate = useNavigate(); // Use navigate for routing

  const handleStartInterview = () => {
    // Save job description to local storage
    localStorage.setItem('jobDescription', jobDescription);
    // Navigate to the Interview page
    navigate('/interview');
  };

  return (
    <div id="job-description-container">
      <h1 id="job-description-heading">Job Description</h1>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Enter the job description here"
      />
      <button onClick={handleStartInterview}>Start Interview</button>
    </div>
  );
};

export default JobDescription;
