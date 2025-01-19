import React, { useState, useEffect } from 'react';
import '../css/feedback.css';


const FeedbackPage= () => {
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Retrieve the saved feedback from local storage
    const savedFeedback = localStorage.getItem('feedback');
    if (savedFeedback) {
      setFeedback(savedFeedback);
    }
  }, []);

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      {feedback ? (
        <p>{feedback}</p>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
};

export default FeedbackPage;


// const FeedbackPage = () => {
//   const [feedback, setFeedback] = useState(null);

//   useEffect(() => {
//     const feedbackData = {
//       eyeContact: "Maintained good eye contact throughout the interview.",
//       voice: "Clear and steady voice with good pacing.",
//       overallScore: 8.5,
//     };

//     console.log('Feedback Data:', feedbackData); // Debugging line
//     setFeedback(feedbackData);
//   }, []);

//   if (!feedback) {
//     return <p>Loading feedback...</p>;
//   }

//   return (
//     <div className="feedback-container">
//       <h1 className="feedback-heading">Interview Feedback</h1>
      
//       <div className="feedback-section">
//         <h2>Eye Contact</h2>
//         <p>{feedback.eyeContact}</p>
//       </div>

//       <div className="feedback-section">
//         <h2>Voice</h2>
//         <p>{feedback.voice}</p>
//       </div>

//       <div className="feedback-section">
//         <h2>Overall Score</h2>
//         <p>{feedback.overallScore}/10</p>
//       </div>
//     </div>
//   );
// };
