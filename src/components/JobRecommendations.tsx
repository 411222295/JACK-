import React from 'react';
import { motion } from 'framer-motion';

interface JobRecommendationsProps {
  recommendations: {
    job: {
      id: string;
      title: string;
      company: string;
      description: string;
      requirements: string[];
    };
    matchScore: number;
    matchingSkills: string[];
    matchingReasons: string[];
  }[];
}

const JobRecommendations: React.FC<JobRecommendationsProps> = ({ recommendations }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">推薦職缺</h2>
      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{rec.job.title}</h3>
                <p className="text-gray-600">{rec.job.company}</p>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  匹配度 {rec.matchScore.toFixed(0)}%
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{rec.job.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">要求條件：</h4>
              <ul className="list-disc list-inside text-gray-700">
                {rec.job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">匹配技能：</h4>
              <div className="flex flex-wrap gap-2">
                {rec.matchingSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">匹配原因：</h4>
              <ul className="list-disc list-inside text-gray-700">
                {rec.matchingReasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendations; 