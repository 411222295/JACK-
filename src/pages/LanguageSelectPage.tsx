import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const LanguageSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCompanyFormData } = useAppContext();

  const handleSelect = (lang: 'zh' | 'en') => {
    setCompanyFormData(prev => ({ ...prev, language: lang }));
    navigate('/company/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-md text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Please select your language</h1>
        <div className="flex justify-center gap-6 pt-4">
          <button
            onClick={() => handleSelect('zh')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg"
          >
            繁體中文
          </button>
          <button
            onClick={() => handleSelect('en')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md text-lg"
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectPage;
