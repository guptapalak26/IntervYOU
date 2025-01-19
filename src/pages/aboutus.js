import React from "react";
import "../css/aboutus.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Us</h1>
        <p>Welcome to <span className="highlight">IntervYOU</span></p>
      </div>

      <div className="about-us-section">
        <h2>Our Mission</h2>
        <p>
          At <span className="highlight">IntervYOU</span>, our mission is to empower students to excel in their career journeys by building confidence, sharpening interview skills, and helping them stand out in a competitive job market.
        </p>
        <p>
          We understand that transitioning from education to employment can be challenging, especially when it comes to preparing for job interviews. That’s why we created <span className="highlight">IntervYOU</span>—a platform designed to provide students with the tools they need to succeed.
        </p>
      </div>

      <div className="about-us-section">
        <h2>What We Do</h2>
        <ul>
          <li>
            <strong>Personalized Interview Preparation:</strong> We generate custom interview questions tailored to specific job descriptions, ensuring every practice session is relevant and impactful.
          </li>
          <li>
            <strong>Realistic Simulations:</strong> Our platform replicates real-world interview scenarios by using live video recording and time-limited responses, giving students the opportunity to practice under authentic conditions.
          </li>
          <li>
            <strong>AI-Powered Feedback:</strong> Leveraging advanced artificial intelligence, we analyze your performance across key areas such as presentation skills, clarity, and alignment with job requirements. You’ll receive actionable insights to help you continuously improve.
          </li>
          <li>
            <strong>Accessible and Supportive:</strong> Whether you're preparing for your first internship or your dream job, <span className="highlight">IntervYOU</span> is here to guide you at every step. Our easy-to-use platform is built with students in mind, making it simple to focus on what matters most—becoming the best version of yourself.
          </li>
        </ul>
      </div>

      <div className="about-us-section">
        <h2>Our Vision</h2>
        <p>
          We envision a world where every student has access to the resources and confidence they need to pursue their aspirations. Through innovative technology and thoughtful design, <span className="highlight">IntervYOU</span> aims to make interview preparation an empowering and transformative experience.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
