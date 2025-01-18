import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const JobDescription = () => {
  const [jobDescription, setJobDescription] = useState('');
//   const navigate = useNavigate();

  const handleStartInterview = () => {
    // Save job description to local storage or pass it via state management
    localStorage.setItem('jobDescription', jobDescription);
    // navigate('/interview');
  };

  return (
    <div>
      <h1>Job Description</h1>
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