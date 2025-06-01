import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { Plus, X } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  technologies: string[];
}

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { studentFormData, setStudentFormData, setResumeCompletion } = useAppContext();
  
  const [projects, setProjects] = useState<Project[]>(studentFormData.projects || []);
  const [currentProject, setCurrentProject] = useState<Project>({
    name: '',
    description: '',
    technologies: []
  });
  const [newTechnology, setNewTechnology] = useState('');
  
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTechnology = () => {
    if (newTechnology.trim() && !currentProject.technologies.includes(newTechnology.trim())) {
      setCurrentProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };
  
  const handleRemoveTechnology = (tech: string) => {
    setCurrentProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };
  
  const handleAddProject = () => {
    if (currentProject.name && currentProject.description) {
      setProjects([...projects, currentProject]);
      setCurrentProject({
        name: '',
        description: '',
        technologies: []
      });
    }
  };
  
  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProject.name || currentProject.description) {
      handleAddProject();
    }
    setStudentFormData(prev => ({ ...prev, projects }));
    setResumeCompletion(prev => Math.min(prev + 20, 100));
    navigate('/student/analysis');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Logo size="medium" />
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">作品集與專案經驗</h1>
          
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                <button
                  onClick={() => handleRemoveProject(index)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            <form className="space-y-4">
              <Input
                name="name"
                value={currentProject.name}
                onChange={handleProjectChange}
                placeholder="專案名稱"
              />
              
              <textarea
                name="description"
                value={currentProject.description}
                onChange={handleProjectChange}
                placeholder="專案描述"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              
              <div>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="使用的技術"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTechnology}
                    variant="secondary"
                  >
                    添加
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full flex items-center text-sm"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(tech)}
                        className="ml-1 hover:text-blue-900"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button
                type="button"
                onClick={handleAddProject}
                variant="secondary"
                fullWidth
                disabled={!currentProject.name || !currentProject.description}
              >
                <Plus size={20} className="mr-2" />
                添加專案
              </Button>
            </form>
            
            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                variant="primary"
                fullWidth
              >
                完成
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage; 