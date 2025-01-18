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
        style={{
          color: '#000',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          width: '100%',
          minHeight: '150px',
          fontSize: '16px',
        }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
  onClick={handleStartInterview}
  disabled={!jobDescription.trim()}
  style={{
    backgroundColor: jobDescription.trim() ? '#007BFF' : '#ccc',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: jobDescription.trim() ? 'pointer' : 'not-allowed',
    opacity: jobDescription.trim() ? 1 : 0.6,
  }}
>
  Start Interview
      </button>
    </div>
  );
};

export default JobDescription;
