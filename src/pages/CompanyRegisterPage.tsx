import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { INDUSTRY_OPTIONS, WORK_MODE_OPTIONS } from '../constants/options';
import { t } from '../utils/translate';

const CompanyRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { companyFormData, setCompanyFormData, setCurrentPage, language, setLanguage } = useAppContext();

  const [formData, setFormData] = useState({
    companyName: companyFormData.companyName || '',
    contactPerson: companyFormData.contactPerson || '',
    email: companyFormData.email || '',
    industry: companyFormData.industry || '',
    description: companyFormData.description || '',
    password: companyFormData.password || '',
    workMode: companyFormData.workMode || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyFormData({ ...formData, language });
    setCurrentPage('companyChat');
    navigate('/company/chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 flex justify-between items-center">
        <Logo size="medium" />
        <div className="text-sm">
          <button onClick={() => setLanguage('zh')} className={language === 'zh' ? 'font-bold' : ''}>繁中</button>
          {' / '}
          <button onClick={() => setLanguage('en')} className={language === 'en' ? 'font-bold' : ''}>EN</button>
        </div>
      </div>

      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t(language, 'companyName')}
            placeholder={t(language, 'companyName')}
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />

          <Input
            label={t(language, 'contactPerson')}
            placeholder={t(language, 'contactPerson')}
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
          />

          <Input
            label={t(language, 'email')}
            type="email"
            placeholder={t(language, 'email')}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block font-semibold mb-1">{t(language, 'industry')}</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="">{language === 'zh' ? '請選擇產業類別' : 'Select industry'}</option>
              {INDUSTRY_OPTIONS[language].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <Input
            label={t(language, 'description')}
            placeholder={t(language, 'description')}
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
          />

          <div>
            <label className="block font-semibold mb-1">
              {language === 'zh' ? '工作型態' : 'Work Mode'}
            </label>
            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="">{language === 'zh' ? '請選擇' : 'Please select'}</option>
              {WORK_MODE_OPTIONS[language].map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>

          <Input
            label={t(language, 'password')}
            type="password"
            placeholder={t(language, 'password')}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="pt-4">
            <Button type="submit" variant="primary" size="large" fullWidth>
              <span className="text-lg">{t(language, 'next')}</span>
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegisterPage;
