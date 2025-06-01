import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebaseConfig';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';

interface JobData {
  title: string;
  skills: string;
  location: string;
  analysis?: string;
}

const CompanyResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestJob = async () => {
      try {
        const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'), limit(1));
        const snapshot = await getDocs(q);
        const latest = snapshot.docs[0]?.data() as JobData;
        setJob(latest);
      } catch (error) {
        console.error('無法載入職缺資料：', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestJob();
  }, []);

  const handleNextStep = () => {
    navigate('/company/talent-matching');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">AI 分析結果</h1>
        <p className="text-gray-600 text-lg">根據您與 AI 的對話，我們為您準備了以下建議</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full mb-10 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📄 職缺資訊</h2>
        {loading ? (
          <p className="text-gray-500">載入中...</p>
        ) : job ? (
          <>
            <p className="text-gray-700 mb-1">🔹 職缺名稱：{job.title}</p>
            <p className="text-gray-700 mb-1">🔹 技能需求：{job.skills}</p>
            <p className="text-gray-700 mb-1">🔹 工作地點：{job.location}</p>
          </>
        ) : (
          <p className="text-red-500">未找到最新職缺資料</p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full mb-10 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 分析報告摘要</h2>
        {loading ? (
          <p className="text-gray-500">載入中...</p>
        ) : job?.analysis ? (
          <p className="text-gray-700 whitespace-pre-wrap">{job.analysis}</p>
        ) : (
          <p className="text-gray-400">尚無分析摘要。</p>
        )}
      </div>

      <button
        onClick={handleNextStep}
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-md flex items-center transition duration-300 group"
      >
        <span>開始人才配對</span>
        <svg
          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CompanyResultsPage;
