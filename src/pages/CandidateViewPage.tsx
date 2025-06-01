import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import CandidateCard from '../components/CandidateCard';
import { useAppContext } from '../context/AppContext';
import { MessageCircle, Bookmark } from 'lucide-react';

const CandidateViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { candidateData, setSavedCandidates, setCurrentPage } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMessage = (id: number) => {
    setCurrentPage('chatWithCandidate');
    navigate('/company/chat-with-candidate');
  };

  const handleSave = (id: number) => {
    const candidateToSave = candidateData.find(c => c.id === id);
    if (candidateToSave) {
      setSavedCandidates(prev => [...prev, candidateToSave]);
    }
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? candidateData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === candidateData.length - 1 ? 0 : prev + 1));
  };

  const handleOpenChat = () => {
    setCurrentPage('chatWithCandidate');
    navigate('/company/chat-with-candidate');
  };

  const handleOpenSaved = () => {
    setCurrentPage('savedCandidates');
    navigate('/company/saved-candidates');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 border-b border-gray-200 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#2D439B] text-white p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold">
              以下為您推薦的 {candidateData.length} 位人選，依照適配度高低排序。
            </h2>
          </div>
          
          {candidateData.length > 0 && (
            <CandidateCard
              candidate={candidateData[currentIndex]}
              onMessage={handleMessage}
              onSave={handleSave}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="max-w-4xl mx-auto flex justify-around">
          <button 
            onClick={handleOpenChat}
            className="flex flex-col items-center px-6 py-2 text-[#2D439B] hover:bg-[#2D439B]/10 rounded-lg transition-colors"
          >
            <MessageCircle size={24} />
            <span className="mt-1 text-sm font-medium">訊息</span>
          </button>
          
          <button 
            onClick={handleOpenSaved}
            className="flex flex-col items-center px-6 py-2 text-[#2D439B] hover:bg-[#2D439B]/10 rounded-lg transition-colors"
          >
            <Bookmark size={24} />
            <span className="mt-1 text-sm font-medium">已儲存</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateViewPage;