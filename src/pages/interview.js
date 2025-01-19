import React, { useState } from 'react';
import axios from 'axios';
import night_city from '../videos/city.mp4';
import '../css/interview.css';

const Interview = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null); // New state for resume upload
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

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

  // Handle file change (upload resume)
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  // Submit video and resume for analysis
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

<<<<<<< HEAD
    // Prepare the form data
=======
>>>>>>> fa633df16bb8eb3e662695ca7f6828a49a366cd1
    const formData = new FormData();
    formData.append('file', videoFile); // Use the selected video file
    if (resumeFile) formData.append('resume', resumeFile); // Optional resume file
    formData.append(
      'text',
      `Analyze the following job description and evaluate the interviewee's answer. Also, provide feedback on presentation skills like eye contact, pacing, and clarity. Job description: ${jobDescription}`
    );
    formData.append('providers', 'google'); // Supported provider

    try {
      const response = await axios.post('https://api.edenai.run/v2/video/question_answer', formData, {
        headers: {
          Authorization: 'Bearer <YOUR_API_KEY>', // Replace with a valid API key
        },
      });

<<<<<<< HEAD
      // Log the full response to see the structure
      console.log(response.data);

      // Adjust according to the response structure
      if (response.data && response.data.google && response.data.google.answer) {
        setFeedback(response.data.google.answer);
      } else {
        setFeedback('No feedback available.');
      }
=======
      setFeedback(response.data.google.answer || 'No feedback available'); // Adjust based on API response
      console.log(response.data.google.answer);
>>>>>>> fa633df16bb8eb3e662695ca7f6828a49a366cd1
    } catch (error) {
      console.error('Error uploading video:', error);

      if (error.response) {
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
    <div className="interview-container">
      {/* Background video */}
      <div className="interview-night-video">
        <video src={night_city} autoPlay loop muted></video>
      </div>

      <h1 className="header">Interview Analysis</h1>
      <p>Upload your interview video below. The feedback will analyze your answer and presentation skills.</p>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Analyzing...' : 'Submit Video'}
      </button>

      {/* Video upload form */}
      <input type="file" accept="video/*" onChange={handleFileChange} disabled={loading} />
      <p className="optional-text">Optional: Upload your resume</p>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} disabled={loading} />
      
      {/* Display feedback */}
      {feedback && (
        <div className="feedback-container">
          <h2>Feedback</h2>
          <pre>{feedback}</pre>
        </div>
      )}
    </div>
  );
};

export default Interview;
