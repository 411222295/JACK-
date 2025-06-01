import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { ChevronRight } from 'lucide-react';

const StudentRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { studentFormData, setStudentFormData, setCurrentPage } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: studentFormData.name || '',
    school: studentFormData.school || '',
    major: studentFormData.major || '',
    year: studentFormData.year || '',
    email: studentFormData.email || '',
    phone: studentFormData.phone || '',
    password: studentFormData.password || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentFormData(formData);
    setCurrentPage('resumeCompletion');
    navigate('/student/resume-completion');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="姓名"
            placeholder="請輸入您的姓名"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <Input
            label="學校"
            placeholder="請輸入您的學校"
            name="school"
            value={formData.school}
            onChange={handleChange}
            required
          />
          
          <Input
            label="科系"
            placeholder="請輸入您的科系"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
          />
          
          <Input
            label="年級"
            placeholder="請輸入您的年級"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
          
          <Input
            label="電子郵件"
            type="email"
            placeholder="請輸入您的電子郵件"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <Input
            label="手機號碼"
            placeholder="請輸入您的手機號碼"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          
          <Input
            label="設定密碼 / 第三方登入"
            type="password"
            placeholder="設定密碼或選擇第三方登入"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
            >
              <span className="text-lg">下一步</span>
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegisterPage;