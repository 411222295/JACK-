import React from 'react';
import TalentMatching from '../components/TalentMatching';

const sampleTalents = [
  {
    id: '1',
    name: '王小明',
    title: '前端工程師',
    skills: ['React', 'TypeScript', 'Node.js'],
    experience: '3年網頁開發經驗，專注於前端技術',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    matchScore: 95,
    matchingReasons: [
      '具備所需的前端技術棧',
      '有相關的網頁開發經驗',
      '技術專注度符合職位要求'
    ],
    education: {
      school: '台灣大學',
      major: '資訊工程',
      degree: '學士'
    }
  },
  {
    id: '2',
    name: '李小華',
    title: '後端工程師',
    skills: ['Python', 'Django', 'PostgreSQL'],
    experience: '4年後端開發經驗，擅長數據庫優化',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    matchScore: 88,
    matchingReasons: [
      '擁有豐富的後端開發經驗',
      '數據庫優化能力突出',
      '技術棧完全匹配'
    ],
    education: {
      school: '清華大學',
      major: '資訊工程',
      degree: '碩士'
    }
  },
  {
    id: '3',
    name: '張小龍',
    title: '全端工程師',
    skills: ['Vue.js', 'Java', 'Spring Boot'],
    experience: '5年全端開發經驗，具備良好的系統架構能力',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    matchScore: 92,
    matchingReasons: [
      '全棧開發能力強',
      '具備系統架構經驗',
      '技術領域廣泛'
    ],
    education: {
      school: '交通大學',
      major: '資訊工程',
      degree: '碩士'
    }
  },
  {
    id: '4',
    name: '陳小琳',
    title: 'UI/UX 設計師',
    skills: ['Figma', 'Adobe XD', 'Sketch'],
    experience: '3年設計經驗，專注於使用者體驗優化',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    matchScore: 85,
    matchingReasons: [
      'UI/UX 設計經驗豐富',
      '擅長使用主流設計工具',
      '注重使用者體驗'
    ],
    education: {
      school: '師範大學',
      major: '數位設計',
      degree: '學士'
    }
  },
];

const TalentMatchingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-center mb-8">人才配對</h1>
          <TalentMatching talents={sampleTalents} />
        </div>
      </div>
    </div>
  );
};

export default TalentMatchingPage; 