import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { Briefcase, Bell, MessageCircle, User } from 'lucide-react';

const StudentDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { resumeCompletion } = useAppContext();

  // Mock opportunities
  const opportunities = [
    {
      id: 1,
      company: "創新數位行銷有限公司",
      position: "社群內容實習生",
      matchScore: 95,
      logo: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=60"
    },
    {
      id: 2,
      company: "未來影視製作公司",
      position: "影片剪輯實習生",
      matchScore: 91,
      logo: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=60"
    },
    {
      id: 3,
      company: "星辰科技有限公司",
      position: "行銷內容實習生",
      matchScore: 87,
      logo: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=60"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="py-4 px-6 border-b border-gray-200 flex justify-center bg-white">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-6">
        <div className="max-w-xl mx-auto">
          <div className="bg-gradient-to-r from-[#2D439B] to-[#3A51B1] text-white p-6 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-2">您的履歷完成度: {resumeCompletion}%</h2>
            <p className="mb-4">您的履歷已被推薦給 {opportunities.length} 家企業</p>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30"
              >
                提升曝光度
              </Button>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mb-3">為您推薦的機會</h3>
          
          <div className="space-y-4 mb-8">
            {opportunities.map(opportunity => (
              <div 
                key={opportunity.id} 
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mr-4 rounded-lg overflow-hidden">
                  <img 
                    src={opportunity.logo} 
                    alt={opportunity.company} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold">{opportunity.position}</h3>
                  <p className="text-sm text-gray-600">{opportunity.company}</p>
                </div>
                
                <div className="bg-[#2D439B] text-white px-3 py-1 rounded-full text-sm font-medium">
                  匹配度 {opportunity.matchScore}%
                </div>
              </div>
            ))}
          </div>
          
          <h3 className="text-lg font-semibold mb-3">最近訊息</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-center border-b border-gray-100 pb-3 mb-3">
              <Bell size={18} className="text-[#2D439B] mr-3" />
              <div>
                <p className="text-sm">
                  <span className="font-medium">創新數位行銷有限公司</span> 對您的履歷感興趣！
                </p>
                <p className="text-xs text-gray-500">2小時前</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MessageCircle size={18} className="text-[#2D439B] mr-3" />
              <div>
                <p className="text-sm">
                  <span className="font-medium">未來影視製作公司</span> 向您發送了訊息
                </p>
                <p className="text-xs text-gray-500">昨天</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="max-w-xl mx-auto flex justify-around">
          <button className="flex flex-col items-center px-4 py-2 text-[#2D439B]">
            <Briefcase size={24} />
            <span className="mt-1 text-xs font-medium">機會</span>
          </button>
          
          <button className="flex flex-col items-center px-4 py-2 text-gray-400">
            <MessageCircle size={24} />
            <span className="mt-1 text-xs font-medium">訊息</span>
          </button>
          
          <button className="flex flex-col items-center px-4 py-2 text-gray-400">
            <User size={24} />
            <span className="mt-1 text-xs font-medium">履歷</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;