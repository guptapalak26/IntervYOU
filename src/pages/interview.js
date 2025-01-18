import React, { useState } from 'react';
import axios from 'axios';
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
      return;
    }

    setLoading(true);

    const jobDescription = localStorage.getItem('jobDescription');
    if (!jobDescription) {
      alert('Job description is missing.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default Interview;
