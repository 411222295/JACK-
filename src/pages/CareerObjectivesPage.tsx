import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { Check, ChevronRight } from 'lucide-react';

const CareerObjectivesPage: React.FC = () => {
  const navigate = useNavigate();
  const { studentFormData, setStudentFormData, setCurrentPage, setResumeCompletion } = useAppContext();
  
  const [formData, setFormData] = useState({
    careerObjective: studentFormData.careerObjective || '',
    desiredIndustry: studentFormData.desiredIndustry || '',
    expectations: studentFormData.expectations || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, saving data...');
    
    // Save form data
    setStudentFormData(prev => {
      console.log('Previous student data:', prev);
      const newData = { ...prev, ...formData };
      console.log('New student data:', newData);
      return newData;
    });
    
    // Update progress
    setResumeCompletion(prev => {
      const newProgress = Math.min(prev + 15, 100);
      console.log('Updated resume completion:', newProgress);
      return newProgress;
    });
    
    // Set current page and navigate
    console.log('Setting current page to studentSkills');
    setCurrentPage('studentSkills');
    
    console.log('Navigating to /student/skills');
    navigate('/student/skills', { replace: false });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 border-b border-gray-200 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-[#2D439B] rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-medium">2</span>
          </div>
          <h2 className="text-xl font-bold">求職動機和期望發展方向</h2>
          <div className="ml-auto">
            <Check className="text-green-500" size={24} />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="您的求職動機"
            placeholder="請描述您為什麼想要應徵這個職位..."
            name="careerObjective"
            value={formData.careerObjective}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          
          <Input
            label="期望的產業領域"
            placeholder="例如：科技業、金融業..."
            name="desiredIndustry"
            value={formData.desiredIndustry}
            onChange={handleChange}
            required
          />
          
          <Input
            label="職涯發展期望"
            placeholder="請描述您的職涯規劃和期望..."
            name="expectations"
            value={formData.expectations}
            onChange={handleChange}
            multiline
            rows={4}
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

export default CareerObjectivesPage; 