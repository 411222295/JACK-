import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { Upload, File, ChevronRight, X } from 'lucide-react';

const UploadResumePage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentPage, setResumeCompletion } = useAppContext();
  
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };
  
  const handleRemoveFile = () => {
    setUploadedFile(null);
  };
  
  const handleSubmit = () => {
    setResumeCompletion(100);
    setCurrentPage('studentAnalysis');
    navigate('/student/analysis');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 border-b border-gray-200 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-bold mb-6">上傳您的履歷</h2>
          
          <div 
            className={`
              border-2 border-dashed rounded-lg p-8 mb-6 flex flex-col items-center justify-center
              ${isDragging ? 'border-[#2D439B] bg-[#2D439B]/5' : 'border-gray-300'}
              ${uploadedFile ? 'bg-[#2D439B]/5' : ''}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!uploadedFile ? (
              <>
                <Upload size={48} className="text-[#2D439B] mb-4" />
                <h3 className="text-lg font-semibold mb-2">拖曳檔案至此或點擊上傳</h3>
                <p className="text-gray-500 text-sm mb-4">支援 PDF, DOC, DOCX 格式</p>
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('resume-upload')?.click()}
                >
                  選擇檔案
                </Button>
              </>
            ) : (
              <div className="w-full">
                <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <File className="text-[#2D439B] mr-3" size={24} />
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleRemoveFile}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleSubmit}
            disabled={!uploadedFile}
          >
            <span className="text-lg">繼續</span>
            <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadResumePage;