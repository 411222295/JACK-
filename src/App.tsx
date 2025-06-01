import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Pages
import HomePage from './pages/HomePage';
import CompanyRegisterPage from './pages/CompanyRegisterPage';
import CompanyChatPage from './pages/CompanyChatPage';
import CompanyResultsPage from './pages/CompanyResultsPage';
import CandidateViewPage from './pages/CandidateViewPage';
import ChatWithCandidatePage from './pages/ChatWithCandidatePage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import ResumeCompletionPage from './pages/ResumeCompletionPage';
import CareerObjectivesPage from './pages/CareerObjectivesPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import StudentAnalysisPage from './pages/StudentAnalysisPage';
import UploadResumePage from './pages/UploadResumePage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import TalentMatchingPage from './pages/TalentMatchingPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="font-sans text-gray-900">
          <Routes>
            {/* Common Routes */}
            <Route path="/" element={<HomePage />} />
            
            {/* Company Routes */}
            <Route path="/company/register" element={<CompanyRegisterPage />} />
            <Route path="/company/chat" element={<CompanyChatPage />} />
            <Route path="/company/results" element={<CompanyResultsPage />} />
            <Route path="/company/candidate-view" element={<CandidateViewPage />} />
            <Route path="/company/chat-with-candidate" element={<ChatWithCandidatePage />} />
            <Route path="/company/talent-matching" element={<TalentMatchingPage />} />
            
            {/* Student Routes */}
            <Route path="/student/register" element={<StudentRegisterPage />} />
            <Route path="/student/resume-completion" element={<ResumeCompletionPage />} />
            <Route path="/student/career-objectives" element={<CareerObjectivesPage />} />
            <Route path="/student/skills" element={<SkillsPage />} />
            <Route path="/student/projects" element={<ProjectsPage />} />
            <Route path="/student/analysis" element={<StudentAnalysisPage />} />
            <Route path="/student/upload-resume" element={<UploadResumePage />} />
            <Route path="/student/dashboard" element={<StudentDashboardPage />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;