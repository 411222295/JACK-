import React, { useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface JobCardProps {
  job: {
    title: string;
    company: string;
    location: string;
    salary: string;
    description: string;
    requirements: string[];
    tags: string[];
    matchScore: number;
    matchingReasons: string[];
  };
  onSwipe: (direction: 'left' | 'right') => void;
  isPreview?: boolean;
}

const SwipeableJobCard: React.FC<JobCardProps> = ({ job, onSwipe, isPreview = false }) => {
  const controls = useAnimation();
  const swipeThreshold = 100;
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handleDragEnd = async (event: any, info: PanInfo) => {
    if (isPreview) return;
    
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > 500) {
      const direction = offset > 0 ? 'right' : 'left';
      await controls.start({
        x: direction === 'right' ? 500 : -500,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe(direction);
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
    setSwipeDirection(null);
  };

  const handleDrag = (event: any, info: PanInfo) => {
    if (isPreview) return;
    
    if (info.offset.x > 50) {
      setSwipeDirection('right');
    } else if (info.offset.x < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const cardContent = (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <div className="bg-blue-100 px-3 py-1 rounded-full shadow-md">
          <span className="text-blue-800 font-semibold">
            匹配度 {Math.round(job.matchScore)}%
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-600">{job.location}</span>
        <span className="text-blue-600 font-semibold">{job.salary}</span>
      </div>
      
      <div className="text-gray-700">{job.description}</div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">要求條件</h4>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start text-gray-600">
                <span className="mr-2">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h4 className="font-semibold text-green-800 mb-2">匹配原因</h4>
          <ul className="space-y-2">
            {job.matchingReasons.map((reason, index) => (
              <li key={index} className="flex items-start text-green-700">
                <span className="mr-2">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (isPreview) {
    return (
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      drag={!isPreview ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      animate={controls}
      className="w-full max-w-md mx-auto select-none"
      whileDrag={{ scale: 1.05 }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* 滑動提示圖示 - 左側 */}
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-red-500 p-3 rounded-full shadow-lg transition-all duration-200
            ${swipeDirection === 'left' ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}
        >
          <X className="w-6 h-6 text-white" />
        </div>

        {/* 滑動提示圖示 - 右側 */}
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-green-500 p-3 rounded-full shadow-lg transition-all duration-200
            ${swipeDirection === 'right' ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}
        >
          <Heart className="w-6 h-6 text-white" />
        </div>

        {cardContent}
      </div>
    </motion.div>
  );
};

export default SwipeableJobCard; 