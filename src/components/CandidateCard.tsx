import React from 'react';
import { Send, Bookmark } from 'lucide-react';
import Button from './Button';

interface CandidateCardProps {
  candidate: {
    id: number;
    name: string;
    school: string;
    major: string;
    year: string;
    tags: string[];
    imageUrl: string;
    experience: string[];
  };
  onMessage: (id: number) => void;
  onSave: (id: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onMessage,
  onSave,
  onNext,
  onPrev,
}) => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden relative">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 h-96">
          <img 
            src={candidate.imageUrl} 
            alt={candidate.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full md:w-3/5 p-6">
          <div className="bg-[#0039CB] text-white py-2 px-4 mb-4 rounded-md">
            <h2 className="text-xl font-bold">{candidate.school} {candidate.major} {candidate.year}</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {candidate.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-[#2D439B] px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="bg-[#0039CB]/10 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-[#0039CB] mb-2">實際經驗</h3>
              <ul className="list-disc pl-5">
                {candidate.experience.map((exp, index) => (
                  <li key={index} className="mb-1">{exp}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-auto">
            <Button 
              variant="primary" 
              onClick={() => onMessage(candidate.id)}
              className="flex-1"
            >
              <Send size={18} className="mr-2" />
              傳訊息
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onSave(candidate.id)}
              className="flex-1"
            >
              <Bookmark size={18} className="mr-2" />
              儲存
            </Button>
          </div>
        </div>
      </div>
      
      {/* Swipe indicators */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-center">
        <button 
          onClick={onPrev}
          className="bg-white/80 p-3 rounded-full shadow-md text-[#2D439B] hover:bg-white transition-all"
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="font-medium">下一位</span>
          </div>
        </button>
      </div>
      
      <div className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center justify-center">
        <button 
          onClick={onNext}
          className="bg-white/80 p-3 rounded-full shadow-md text-[#2D439B] hover:bg-white transition-all"
        >
          <div className="flex items-center">
            <span className="font-medium">上一位</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;