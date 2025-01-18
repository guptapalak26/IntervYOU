import React, { useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import night_city from '../videos/city.mp4';
import '../css/interview.css';

const Interview = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file change (upload video)
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Send video and job description to Gemini API
  const handleSubmit = async () => {
    if (!videoFile) {
      alert("Please upload a video.");
=======
import { useNavigate } from 'react-router-dom';

const Interview = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file.');
>>>>>>> eeeb4e045610d2b10d970147333c56c21d0a424a
      return;
    }

    setLoading(true);

<<<<<<< HEAD
    const jobDescription = localStorage.getItem("jobDescription");

    if (!jobDescription) {
      alert("Job description is missing.");
=======
    const jobDescription = localStorage.getItem('jobDescription');
    if (!jobDescription) {
      alert('Job description is missing.');
>>>>>>> eeeb4e045610d2b10d970147333c56c21d0a424a
      setLoading(false);
      return;
    }

    const formData = new FormData();
<<<<<<< HEAD
    formData.append("file", videoFile);
    formData.append("text", `Analyze the following job description and evaluate the interviewee's answer. Also, provide feedback on presentation skills like eye contact, pacing, and clarity. Job description: ${jobDescription}`);

    try {
      // Make the API request to send the video to Gemini API for analysis
      const response = await axios.post("https://api.gemini.com/v1/analyze-video", formData, {
        headers: {
          "Authorization": "Bearer AIzaSyCnuVVdrvErO-BAvb-950qve15n6stIYcQ", 
          "Content-Type": "multipart/form-data"
        },
      });

      // Display the feedback from the Gemini API
      setFeedback(response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
      setFeedback("An error occurred while analyzing the video.");
=======
    formData.append('file', file);
    formData.append(
      'text',
      `Analyze the following job description and evaluate the interviewee's answer. Also, provide feedback on presentation skills like eye contact, pacing, and clarity. Job description: ${jobDescription}`
    );

    try {
      await axios.post('https://api.gemini.com/v1/analyze-video', formData, {
        headers: {
          Authorization: 'Bearer YOUR_API_KEY',
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/video-details', { state: { videoFileName: file.name } });
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('An error occurred while analyzing the video.');
>>>>>>> eeeb4e045610d2b10d970147333c56c21d0a424a
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
<<<<<<< HEAD
      <div className="interview_night_video">
                <video src={night_city} autoPlay loop muted></video>
        </div>
      <h1 class="header">Interview Analysis</h1>
      <p>Upload your interview video below. The feedback will analyze your answer and presentation skills.</p>
      
      {/* Video upload form */}
      <input type="file" accept="video/*" onChange={handleFileChange} />
      
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Submit Video"}
      </button>

      {/* Display feedback */}
      {feedback && <div><h2>Feedback</h2><pre>{JSON.stringify(feedback, null, 2)}</pre></div>}
=======
      <h1>Interview Analysis</h1>
      <p>Upload your interview video below. The feedback will analyze your answer and presentation skills.</p>

      <label
        htmlFor="video-upload"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Uploading...' : 'Submit Video'}
        <input
          type="file"
          id="video-upload"
          accept="video/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={loading}
        />
      </label>
>>>>>>> eeeb4e045610d2b10d970147333c56c21d0a424a
    </div>
  );
};

export default Interview;
