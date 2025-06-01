import React, { useState } from 'react';
import TalentCard from './TalentCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Talent {
  id: string;
  name: string;
  title: string;
  skills: string[];
  experience: string;
  image: string;
  matchScore: number;
  matchingReasons: string[];
  education?: {
    school: string;
    major: string;
    degree: string;
  };
}

interface TalentMatchingProps {
  talents: Talent[];
}

const TalentMatching: React.FC<TalentMatchingProps> = ({ talents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedTalents, setLikedTalents] = useState<Talent[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentTalent = talents[currentIndex];
  const nextTalent = talents[currentIndex + 1];

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (direction === 'right') {
      setLikedTalents(prev => [...prev, currentTalent]);
    }
    
    // 延遲一下再切換到下一張卡片，讓動畫有時間完成
    setTimeout(() => {
      if (currentIndex < talents.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
      setIsAnimating(false);
    }, 300);
  };

  if (currentIndex >= talents.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] bg-gray-50 p-4">
        <h2 className="text-2xl font-bold mb-4">已完成所有候選人評估</h2>
        <p className="text-gray-600 mb-8">您已右滑選擇了 {likedTalents.length} 位候選人</p>
        
        {likedTalents.length > 0 ? (
          <div className="w-full max-w-md space-y-4">
            <h3 className="text-xl font-semibold mb-4">已選擇的候選人：</h3>
            {likedTalents.map(talent => (
              <div
                key={talent.id}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center">
                  <img
                    src={talent.image}
                    alt={talent.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg">{talent.name}</h4>
                        <p className="text-gray-600">{talent.title}</p>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        匹配度 {Math.round(talent.matchScore)}%
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {talent.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {talent.skills.length > 3 && (
                        <span className="text-gray-500 text-sm">
                          +{talent.skills.length - 3} 項技能
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">您尚未選擇任何候選人</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-gray-50 p-4">
      {/* 操作提示 */}
      <div className="mb-8 flex justify-center items-center gap-12">
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
          <ChevronLeft className="w-6 h-6 text-red-500" strokeWidth={2.5} />
          <span className="ml-2 text-gray-600">左滑婉拒</span>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
          <span className="mr-2 text-gray-600">右滑有興趣</span>
          <ChevronRight className="w-6 h-6 text-green-500" strokeWidth={2.5} />
        </div>
      </div>

      {/* 卡片堆疊 */}
      <div className="relative w-full max-w-md mx-auto h-[600px]">
        <AnimatePresence mode="popLayout">
          {/* 當前卡片 */}
          {currentTalent && (
            <div className="absolute inset-0" key={currentTalent.id}>
              <TalentCard
                talent={currentTalent}
                onSwipe={handleSwipe}
              />
            </div>
          )}
          
          {/* 下一張卡片（預覽） */}
          {nextTalent && !isAnimating && (
            <div
              className="absolute inset-0 -z-10 transform scale-95 opacity-50 pointer-events-none"
              style={{ filter: 'blur(2px)' }}
            >
              <TalentCard
                key={nextTalent.id}
                talent={nextTalent}
                onSwipe={() => {}}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 進度指示器 */}
      <div className="mt-8">
        <div className="flex justify-center gap-2 mb-2">
          {talents.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-500 scale-125'
                  : index < currentIndex
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm">
          還有 {talents.length - currentIndex - 1} 位候選人
        </p>
      </div>
    </div>
  );
};

export default TalentMatching; 