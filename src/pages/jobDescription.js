import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import '../css/jobdescription.css';

const JobDescription = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiKey = "AIzaSyCnuVVdrvErO-BAvb-950qve15n6stIYcQ"

  const getResponseForGivenPrompt = async () => {
    if (!jobDescription) {
      alert('Please enter a job description.');
      return;
    }

    setLoading(true);

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Generate 5 interview questions based on the following job description " + jobDescription);
        const text = result.response.text();


        // Split the questions from the generated text
         const extractedQuestions = text
            .split('\n')
            .filter((line) => line.trim().match(/^\d+\./))
             .map((line) => line.replace(/^\d+\.\s*/, '').trim());

        if(extractedQuestions.length === 5) {
           setGeneratedQuestions(extractedQuestions);
         }
         else {
             alert("Unexpected format for generated questions, check the returned value in the console")
            console.log(text)
         }
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
        alert("Error fetching Gemini response:" + error.message)
    } finally{
      setLoading(false);
    }
  };


  const handleStartInterview = () => {
    if (generatedQuestions.length === 0) {
      alert('Please generate questions first.');
      return;
    }

    localStorage.setItem('jobDescription', jobDescription);
    localStorage.setItem('generatedQuestions', JSON.stringify(generatedQuestions));
    navigate('/interview');
  };

  return (
    <div id="job-description-container">
      <h1 id="job-description-heading">Job Description</h1>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Enter the job description here"
      />
      <button onClick={getResponseForGivenPrompt} disabled={loading}>
        {loading ? 'Generating Questions...' : 'Generate Questions'}
      </button>
      {generatedQuestions.length > 0 && (
  <div>
    <h2 className='generated'>Your questions have been generated.</h2>
  </div>
)}
      <button onClick={handleStartInterview} disabled={loading || generatedQuestions.length === 0}>
        Start Interview
      </button>
    </div>
  );
};

export default JobDescription;
