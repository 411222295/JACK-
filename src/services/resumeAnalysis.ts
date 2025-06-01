import { ResumeData } from '../components/ResumeForm';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  requirements: string[];
  description: string;
  skills: string[];
}

interface MatchResult {
  job: JobPosting;
  matchScore: number;
  matchingSkills: string[];
  matchingReasons: string[];
}

export const analyzeResume = async (resumeData: ResumeData): Promise<string[]> => {
  // 這裡應該調用 OpenAI API 來分析履歷
  // 目前使用模擬數據
  const skills = resumeData.skills;
  const experience = resumeData.experience;
  
  // 模擬 AI 分析出的標籤
  const tags = [
    ...skills,
    '團隊合作',
    '問題解決',
    '溝通能力',
    '專案管理',
    '快速學習'
  ];
  
  return tags;
};

export const matchJobPostings = (
  tags: string[],
  jobPostings: JobPosting[]
): MatchResult[] => {
  const results: MatchResult[] = jobPostings.map(job => {
    const matchingSkills = job.skills.filter(skill =>
      tags.some(tag => tag.toLowerCase().includes(skill.toLowerCase()))
    );

    const matchScore = (matchingSkills.length / job.skills.length) * 100;

    const matchingReasons = matchingSkills.map(skill =>
      `您具備 ${skill} 技能，符合職位要求`
    );

    if (matchScore > 0) {
      matchingReasons.push(`您的技能組合與該職位匹配度為 ${matchScore.toFixed(0)}%`);
    }

    return {
      job,
      matchScore,
      matchingSkills,
      matchingReasons
    };
  });

  // 根據匹配分數排序
  return results.sort((a, b) => b.matchScore - a.matchScore);
};

// 模擬的職缺數據
export const sampleJobPostings: JobPosting[] = [
  {
    id: '1',
    title: '前端工程師',
    company: 'TechCorp',
    requirements: ['2年以上前端開發經驗', '良好的團隊合作能力'],
    description: '負責公司產品的前端開發與維護',
    skills: ['React', 'TypeScript', 'HTML', 'CSS', 'JavaScript']
  },
  {
    id: '2',
    title: '後端工程師',
    company: 'DataSys',
    requirements: ['熟悉後端開發框架', '資料庫設計經驗'],
    description: '開發和維護後端服務與API',
    skills: ['Python', 'Django', 'PostgreSQL', 'RESTful API']
  },
  {
    id: '3',
    title: '全端工程師',
    company: 'WebTech',
    requirements: ['前後端開發經驗', '系統架構設計能力'],
    description: '負責完整的網站開發與維護',
    skills: ['React', 'Node.js', 'MongoDB', 'Express']
  }
]; 