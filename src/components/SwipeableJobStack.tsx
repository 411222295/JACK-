import React, { useState, useEffect } from 'react';
import SwipeableJobCard from './SwipeableJobCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  tags: string[];
  matchScore: number;
  matchingReasons: string[];
}

interface SwipeableJobStackProps {
  jobs: Job[];
  onLike: (job: Job) => void;
  onDislike: (job: Job) => void;
}

const SwipeableJobStack: React.FC<SwipeableJobStackProps> = ({
  jobs,
  onLike,
  onDislike,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentJob = jobs[currentIndex];
  const nextJob = jobs[currentIndex + 1];

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (direction === 'right') {
      onLike(currentJob);
    } else {
      onDislike(currentJob);
    }

    if (currentIndex < jobs.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (!currentJob) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h3 className="text-xl font-semibold text-gray-600 mb-4">
          沒有更多職缺了
        </h3>
        <p className="text-gray-500">
          我們會持續為您尋找合適的機會
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* 操作提示 */}
      <div className="absolute -top-12 left-0 right-0 flex justify-center items-center gap-8 text-gray-500 text-sm">
        <div className="flex items-center">
          <ChevronLeft className="mr-1" />
          <span>左滑不感興趣</span>
        </div>
        <div className="flex items-center">
          <span>右滑有興趣</span>
          <ChevronRight className="ml-1" />
        </div>
      </div>

      {/* 卡片堆疊 */}
      <div className="relative h-[600px]">
        <AnimatePresence mode="popLayout">
          {/* 下一張卡片（預覽） */}
          {nextJob && !isTransitioning && (
            <div
              key={`preview-${nextJob.id}`}
              className="absolute inset-0 -z-10"
              style={{ transform: 'scale(0.95)', opacity: 0.5, filter: 'blur(2px)' }}
            >
              <SwipeableJobCard
                job={nextJob}
                onSwipe={() => {}}
                isPreview={true}
              />
            </div>
          )}

          {/* 當前卡片 */}
          <motion.div
            key={currentJob.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <SwipeableJobCard
              job={currentJob}
              onSwipe={handleSwipe}
              isPreview={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 進度指示器 */}
      <div className="mt-6 flex justify-center gap-2">
        {jobs.map((_, index) => (
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

      {/* 剩餘職缺數量 */}
      <div className="mt-4 text-center text-gray-500 text-sm">
        還有 {jobs.length - currentIndex - 1} 個職缺
      </div>
    </div>
  );
};

export default SwipeableJobStack; 