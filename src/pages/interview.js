import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import night_city from '../videos/city.mp4';
import '../css/interview.css';

const Interview = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null); // State for resume upload
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle video file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert('No file selected.');
      return;
    }

    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file.');
      return;
    }

    setVideoFile(file);
  };

  // Handle resume file change
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  // Submit video and optional resume for analysis
  const handleSubmit = async () => {
    if (!videoFile) {
      alert('Please upload a video before submitting.');
      return;
    }

    const jobDescription = localStorage.getItem('jobDescription');
    if (!jobDescription) {
      alert('Job description is missing.');
      return;
    }

    setLoading(true);

    // Prepare the form data
    const formData = new FormData();
    formData.append('file', videoFile);
    if (resumeFile) formData.append('resume', resumeFile); // Add resume file if provided
    formData.append(
      'text',
      `Analyze the following job description and evaluate the interviewee's answer. Also, provide feedback on presentation skills like eye contact, pacing, and clarity. Job description: ${jobDescription}`
    );
    formData.append('providers', 'google'); // Supported provider

    try {
      const response = await axios.post('https://api.edenai.run/v2/video/question_answer', formData, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTQ2MzgxNTQtZWQzNy00OGFhLWEwNWUtNTc0Mjc2YmJhNTA5IiwidHlwZSI6ImFwaV90b2tlbiJ9.85KXbjVnosofEsZV7p2yKnBvqGdEZsgWl4j03ICZWAk', // Replace with a valid API key
        },
      });

      // Log the full response to see the structure
      console.log(response.data);

      // Adjust according to the response structure
      if (response.data && response.data.google && response.data.google.answer) {
        setFeedback(response.data.google.answer);
      } else {
        setFeedback('No feedback available.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);

      if (error.response) {
        console.log('Response data:', error.response.data);
        setFeedback(`API Error: ${error.response.data.message || 'Permission error. Check your API key and permissions.'}`);
      } else if (error.request) {
        setFeedback('No response from the server. Please check your network connection.');
      } else {
        setFeedback(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const goToFeedback = () => {
    navigate('./feedback');
  };

  return (
    <div className="interview-container">
      {/* Background video */}
      <div className="interview-night-video">
        <video src={night_city} autoPlay loop muted></video>
      </div>

      <h1 className="header">Interview Analysis</h1>
      <p>Upload your interview video below. The feedback will analyze your answer and presentation skills.</p>

      <input type="file" accept="video/*" onChange={handleFileChange} disabled={loading} />
      <p className="optional-text">Optional: Upload your resume</p>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} disabled={loading} />

      <button onClick={handleSubmit} disabled={!videoFile || loading}>
        {loading ? 'Analyzing...' : 'Submit Video'}
      </button>

      {/* Display feedback */}
      {feedback ? (
        <div className="feedback-container">
          <h2>Feedback</h2>
          <pre>{"Your feedback result is now ready."}</pre>
          <button onClick={goToFeedback}>Go to Feedback</button>
        </div>
      ) : (
        <div className="feedback-container">
          <p>No feedback available yet.</p>
        </div>
      )}
    </div>
  );
};

export default Interview;
