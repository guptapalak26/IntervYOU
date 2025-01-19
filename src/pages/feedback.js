import React, { useState, useEffect } from 'react';
import '../css/feedback.css';

<<<<<<< HEAD
const FeedbackPage = () => {
=======

const FeedbackPage= () => {
>>>>>>> 876a91d4da2afc1a38b9ad790018c01989928d33
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Retrieve the saved feedback from local storage
    const savedFeedback = localStorage.getItem('feedback');
    if (savedFeedback) {
<<<<<<< HEAD
      // Use regular expression to remove '*' from feedback
      const cleanedFeedback = savedFeedback.replace(/\*/g, '');
      setFeedback(cleanedFeedback);
    }
  }, []);

  // Split the feedback into paragraphs for better structure
  const feedbackParagraphs = feedback ? feedback.split("\n") : [];

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Interview Feedback</h2>
      {feedback ? (
        <div className="feedback-content">
          {feedbackParagraphs.length > 0 && feedbackParagraphs.map((paragraph, index) => (
            <p key={index} className="feedback-text">{paragraph}</p>
          ))}
        </div>
      ) : (
        <p className="no-feedback">No feedback available.</p>
=======
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
>>>>>>> 876a91d4da2afc1a38b9ad790018c01989928d33
      )}
    </div>
  );
};

export default FeedbackPage;
<<<<<<< HEAD
=======


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
>>>>>>> 876a91d4da2afc1a38b9ad790018c01989928d33
