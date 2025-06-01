import React, { useState } from 'react';

interface ResumeFormProps {
  onSubmit: (resumeData: ResumeData) => void;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  education: {
    school: string;
    major: string;
    degree: string;
    graduationYear: string;
  };
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  skills: string[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
  }[];
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit }) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { name: '', email: '', phone: '' },
    education: { school: '', major: '', degree: '', graduationYear: '' },
    experience: [],
    skills: [],
    projects: []
  });

  const [newSkill, setNewSkill] = useState('');

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      education: { ...prev.education, [name]: value }
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(resumeData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">個人資訊</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="姓名"
            value={resumeData.personalInfo.name}
            onChange={handlePersonalInfoChange}
            className="border rounded-lg p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="電子郵件"
            value={resumeData.personalInfo.email}
            onChange={handlePersonalInfoChange}
            className="border rounded-lg p-2"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="電話"
            value={resumeData.personalInfo.phone}
            onChange={handlePersonalInfoChange}
            className="border rounded-lg p-2"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">教育背景</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="school"
            placeholder="學校"
            value={resumeData.education.school}
            onChange={handleEducationChange}
            className="border rounded-lg p-2"
            required
          />
          <input
            type="text"
            name="major"
            placeholder="科系"
            value={resumeData.education.major}
            onChange={handleEducationChange}
            className="border rounded-lg p-2"
            required
          />
          <input
            type="text"
            name="degree"
            placeholder="學位"
            value={resumeData.education.degree}
            onChange={handleEducationChange}
            className="border rounded-lg p-2"
            required
          />
          <input
            type="text"
            name="graduationYear"
            placeholder="畢業年份"
            value={resumeData.education.graduationYear}
            onChange={handleEducationChange}
            className="border rounded-lg p-2"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">技能</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="新增技能"
            className="border rounded-lg p-2 flex-1"
          />
          <button
            type="button"
            onClick={addSkill}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            新增
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
      >
        提交履歷
      </button>
    </form>
  );
};

export default ResumeForm; 