import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ResumeUpload from "./pages/ResumeUpload";
import JobRecommendations from "./pages/JobRecommendations";
import CourseRecommendations from "./pages/CourseRecommendations";
import AnalysisResult from "./pages/AnalysisResult";


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/jobs" element={<JobRecommendations />} />
        <Route path="/courses" element={<CourseRecommendations />} />
        <Route path="/analysis" element={<AnalysisResult />} />

      </Routes>
    </div>
  );
}
