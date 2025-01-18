import React, { useState } from 'react';
import axios from 'axios';

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
      return;
    }

    setLoading(true);

    const jobDescription = localStorage.getItem("jobDescription");

    if (!jobDescription) {
      alert("Job description is missing.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Interview Analysis</h1>
      <p>Upload your interview video below. The feedback will analyze your answer and presentation skills.</p>
      
      {/* Video upload form */}
      <input type="file" accept="video/*" onChange={handleFileChange} />
      
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Submit Video"}
      </button>

      {/* Display feedback */}
      {feedback && <div><h2>Feedback</h2><pre>{JSON.stringify(feedback, null, 2)}</pre></div>}
    </div>
  );
};

export default Interview;
