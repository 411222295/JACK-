import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { Check, ChevronRight, X, Plus } from 'lucide-react';

const SkillsPage: React.FC = () => {
  console.log('SkillsPage rendered');
  
  const navigate = useNavigate();
  const { studentFormData, setStudentFormData, setCurrentPage, setResumeCompletion } = useAppContext();
  
  const [skills, setSkills] = useState<string[]>(studentFormData.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [softSkills, setSoftSkills] = useState<string[]>(studentFormData.softSkills || []);
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [languages, setLanguages] = useState<string[]>(studentFormData.languages || []);
  const [newLanguage, setNewLanguage] = useState('');
  
  const handleAddItem = (
    item: string,
    items: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>,
    setNewItem: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (item.trim() && !items.includes(item.trim())) {
      setItems([...items, item.trim()]);
      setNewItem('');
    }
  };
  
  const handleRemoveItem = (
    itemToRemove: string,
    items: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setItems(items.filter(item => item !== itemToRemove));
  };
  
  const handleKeyPress = (
    e: React.KeyboardEvent,
    item: string,
    items: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>,
    setNewItem: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem(item, items, setItems, setNewItem);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    
    // First update all state
    await Promise.all([
      setStudentFormData(prev => ({
        ...prev,
        skills,
        softSkills,
        languages
      })),
      setResumeCompletion(prev => Math.min(prev + 15, 100)),
      setCurrentPage('projects')
    ]);

    // Then navigate
    console.log('Navigating to projects page');
    navigate('/student/projects');
  };

  const renderSkillSection = (
    title: string,
    placeholder: string,
    items: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>,
    newItem: string,
    setNewItem: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, newItem, items, setItems, setNewItem)}
          placeholder={placeholder}
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => handleAddItem(newItem, items, setItems, setNewItem)}
        >
          <Plus size={20} />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {items.map((item) => (
          <div
            key={item}
            className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full flex items-center text-sm"
          >
            <span>{item}</span>
            <button
              type="button"
              onClick={() => handleRemoveItem(item, items, setItems)}
              className="ml-2 hover:text-blue-900"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 border-b border-gray-200 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-[#2D439B] rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-medium">3</span>
          </div>
          <h2 className="text-xl font-bold">技能與專長</h2>
          <div className="ml-auto">
            <Check className="text-green-500" size={24} />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {renderSkillSection(
            '技術技能',
            '輸入技術技能，例如：React、Python...',
            skills,
            setSkills,
            newSkill,
            setNewSkill
          )}
          
          {renderSkillSection(
            '軟實力',
            '輸入軟實力，例如：團隊合作、溝通能力...',
            softSkills,
            setSoftSkills,
            newSoftSkill,
            setNewSoftSkill
          )}
          
          {renderSkillSection(
            '語言能力',
            '輸入語言能力，例如：英文 TOEIC 750、日文 N2...',
            languages,
            setLanguages,
            newLanguage,
            setNewLanguage
          )}
          
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={skills.length === 0 && softSkills.length === 0 && languages.length === 0}
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

export default SkillsPage; 