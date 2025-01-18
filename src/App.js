import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobDescription from './pages/jobDescription'; // Correct import
import Interview from './pages/interview'; // Correct import

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route for Job Description */}
          <Route path="/" element={<JobDescription />} />
          {/* Route for Interview */}
          <Route path="/interview" element={<Interview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
