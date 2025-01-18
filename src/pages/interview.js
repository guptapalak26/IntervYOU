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
    formData.append('file', videoFile);
    formData.append(
      'text',
      `Analyze the following job description and evaluate the interviewee's answer. Also, provide feedback on presentation skills like eye contact, pacing, and clarity. Job description: ${jobDescription}`
    );

    try {
      // Make the API request to Gemini API for analysis
      const response = await axios.post('https://api.gemini.com/v1/analyze-video', formData, {
        headers: {
          Authorization: 'Bearer YOUR_API_KEY',
          'Content-Type': 'multipart/form-data',
        },
      });

      // Display feedback or navigate to another page
      setFeedback(response.data);
    } catch (error) {
      console.error('Error uploading video:', error);
      setFeedback('An error occurred while analyzing the video.');
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
