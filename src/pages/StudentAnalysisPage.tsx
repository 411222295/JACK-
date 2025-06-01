import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SwipeableJobStack from '../components/SwipeableJobStack';
import { analyzeResume, matchJobPostings, sampleJobPostings } from '../services/resumeAnalysis';

const StudentAnalysisPage: React.FC = () => {
  const [step, setStep] = useState<'analysis' | 'recommendations'>('analysis');
  const [analyzedTags, setAnalyzedTags] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [likedJobs, setLikedJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 模擬從前一頁獲取的履歷數據
  const mockResumeData = {
    personalInfo: { name: '王小明', email: 'wang@example.com', phone: '0912345678' },
    education: { school: '台灣大學', major: '資訊工程', degree: '學士', graduationYear: '2024' },
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    experience: [
      {
        company: 'TechStartup',
        position: '前端工程師實習生',
        duration: '2023/07 - 2023/08',
        description: '參與公司產品的前端開發'
      }
    ],
    projects: [
      {
        name: '個人作品集網站',
        description: '使用 React 和 TypeScript 開發的個人網站',
        technologies: ['React', 'TypeScript', 'Tailwind CSS']
      }
    ]
  };

  useEffect(() => {
    const analyzeAndMatch = async () => {
      try {
        console.log('開始分析履歷...');
        // 分析履歷，獲取標籤
        const tags = await analyzeResume(mockResumeData);
        console.log('分析得到的標籤:', tags);
        setAnalyzedTags(tags);
        
        // 延遲一下再顯示標籤動畫
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error('分析錯誤:', error);
        setIsLoading(false);
      }
    };

    analyzeAndMatch();
  }, []);

  const handleProceedToRecommendations = async () => {
    setIsLoading(true);
    try {
      console.log('開始匹配職缺...');
      console.log('分析標籤:', analyzedTags);
      console.log('可用職缺:', sampleJobPostings);
      
      const matches = matchJobPostings(analyzedTags, sampleJobPostings);
      console.log('匹配結果:', matches);
      
      // 轉換匹配結果為職缺卡片格式
      const jobsWithIds = matches.map(match => ({
        id: match.job.id,
        title: match.job.title,
        company: match.job.company,
        location: '台北市',  // 假設位置
        salary: '月薪 50,000 - 80,000',  // 假設薪資範圍
        description: match.job.description,
        requirements: match.job.requirements,
        tags: match.matchingSkills,
        matchScore: match.matchScore,
        matchingReasons: match.matchingReasons
      }));
      
      console.log('處理後的職缺:', jobsWithIds);
      setRecommendations(jobsWithIds);
      
      // 確保狀態更新後再切換步驟
      setTimeout(() => {
        setStep('recommendations');
        setIsLoading(false);
      }, 100);
      
    } catch (error) {
      console.error('匹配錯誤:', error);
      setIsLoading(false);
    }
  };

  const handleLikeJob = (job: any) => {
    setLikedJobs(prev => [...prev, job]);
    // 這裡可以添加將喜歡的職缺保存到後端的邏輯
    console.log('已收藏職缺:', job.title);
  };

  const handleDislikeJob = (job: any) => {
    // 這裡可以添加記錄不喜歡的職缺的邏輯，用於改進推薦
    console.log('不感興趣:', job.title);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-700">分析您的履歷中...</p>
          </div>
        </div>
      )}

      {step === 'analysis' && !isLoading && (
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">您的履歷強項分析</h1>
            
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-xl font-semibold mb-6">專業技能</h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {analyzedTags.filter(tag => 
                  ['React', 'TypeScript', 'Node.js', 'Python'].includes(tag)
                ).map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <h2 className="text-xl font-semibold mb-6">軟實力</h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {analyzedTags.filter(tag => 
                  !['React', 'TypeScript', 'Node.js', 'Python'].includes(tag)
                ).map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={handleProceedToRecommendations}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
                >
                  查看匹配職缺
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'recommendations' && (
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">為您推薦的最佳職缺</h1>
            <p className="text-gray-600 text-center mb-12">
              根據您的履歷分析，我們為您找到了以下最匹配的職位
            </p>
            
            {recommendations.length > 0 ? (
              <SwipeableJobStack
                jobs={recommendations}
                onLike={handleLikeJob}
                onDislike={handleDislikeJob}
              />
            ) : (
              <div className="text-center text-gray-600">
                <p>目前沒有找到匹配的職缺</p>
                <p className="mt-2">請稍後再試</p>
              </div>
            )}

            {likedJobs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4 text-center">已收藏的職缺</h2>
                <div className="space-y-4">
                  {likedJobs.map(job => (
                    <div
                      key={job.id}
                      className="bg-white rounded-lg p-4 shadow flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                      </div>
                      <span className="text-blue-600">{job.salary}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAnalysisPage;