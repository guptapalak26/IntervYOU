import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import night_city from '../videos/city.mp4';
import '../css/interview.css';

const Interview = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle file change (upload video)
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

  // Submit video for analysis
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

    const formData = new FormData();
    formData.append('file', videoFile);  // Use the selected video file
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

      setFeedback(response.data.google.answer || 'No feedback available'); // Adjust based on API response
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

  return (
    <div>
      {/* Background video */}
      <div className="interview_night_video">
        <video src={night_city} autoPlay loop muted></video>
      </div>

      <h1 className="header">Interview Analysis</h1>
      <p>Upload your interview video below. The feedback will analyze your answer and presentation skills.</p>

      {/* Video upload form */}
      <input type="file" accept="video/*" onChange={handleFileChange} disabled={loading} />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Analyzing...' : 'Submit Video'}
      </button>

      {/* Display feedback */}
      {feedback && (
        <div>
          <h2>Feedback</h2>
          <pre>{JSON.stringify(feedback, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Interview;
