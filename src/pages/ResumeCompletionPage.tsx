import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ResumeCompletionPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentPage } = useAppContext();
  
  const handleContinue = () => {
    setCurrentPage('careerObjectives');
    navigate('/student/career-objectives');
  };

  const handleSkills = () => {
    setCurrentPage('skills');
    navigate('/student/skills');
  };

  const handleProjects = () => {
    setCurrentPage('studentProjects');
    navigate('/student/projects');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#2D439B] text-white rounded-xl p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">您的履歷完成度</h1>
          <div className="relative h-2 bg-white/30 rounded-full mb-4">
            <div className="absolute left-0 top-0 h-full w-[35%] bg-cyan-400 rounded-full"></div>
          </div>
          <p className="text-white/90">請補充以下資訊，提高您的適配機會：</p>
        </div>

        <div className="space-y-4">
          {/* 基本資料 */}
          <div className="bg-white rounded-lg p-4 flex items-center">
            <div className="w-8 h-8 bg-[#2D439B]/10 rounded-full flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-[#2D439B]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">基本資料</h2>
              <p className="text-green-600 text-sm">已完成</p>
            </div>
          </div>

          {/* 求職動機和期望發展方向 */}
          <button
            onClick={handleContinue}
            className="w-full bg-white rounded-lg p-4 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-gray-500 font-medium">2</span>
            </div>
            <div className="flex-1 text-left">
              <h2 className="font-semibold">求職動機和期望發展方向</h2>
              <p className="text-amber-600 text-sm">尚未完成</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          {/* 技能與專長 */}
          <button
            onClick={handleSkills}
            className="w-full bg-white rounded-lg p-4 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-gray-500 font-medium">3</span>
            </div>
            <div className="flex-1 text-left">
              <h2 className="font-semibold">技能與專長</h2>
              <p className="text-amber-600 text-sm">尚未完成</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          {/* 作品集與專案經驗 */}
          <button
            onClick={handleProjects}
            className="w-full bg-white rounded-lg p-4 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-gray-500 font-medium">4</span>
            </div>
            <div className="flex-1 text-left">
              <h2 className="font-semibold">作品集與專案經驗</h2>
              <p className="text-amber-600 text-sm">尚未完成</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-[#2D439B] text-white py-4 rounded-lg mt-8 hover:bg-[#1E2F7B] transition-colors"
        >
          繼續填寫履歷
        </button>
      </div>
    </div>
  );
};

export default ResumeCompletionPage; 