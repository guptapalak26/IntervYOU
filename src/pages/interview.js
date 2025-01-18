import React, { useEffect, useState } from 'react';

const Interview = () => {
  const [jobDescription, setJobDescription] = useState('');

  useEffect(() => {
    // Retrieve the job description from local storage
    const savedJobDescription = localStorage.getItem('jobDescription');
    if (savedJobDescription) {
      setJobDescription(savedJobDescription);
    }
  }, []);

  return (
    <div id="interview-container">
      <h1>Interview Page</h1>
      <p>Job Description:</p>
      <p>{jobDescription}</p>
    </div>
  );
};

export default Interview;
