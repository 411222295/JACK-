import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import ChatBubble from '../components/ChatBubble';
import { useAppContext } from '../context/AppContext';
import { Send, ArrowLeft, User } from 'lucide-react';

const ChatWithCandidatePage: React.FC = () => {
  const navigate = useNavigate();
  const { candidateData, setCurrentPage } = useAppContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "您好！我對貴公司的職位很感興趣。我有使用Premiere的經驗，也做過幾個TikTok短片專案。", isUser: false },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = () => {
    if (!currentInput.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: currentInput, isUser: true }]);
    
    // Clear input
    setCurrentInput('');
    
    // Simulate response after 1.5 seconds
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "謝謝您的回覆！我在上一個專案中學習了很多關於短影音製作的技巧，希望有機會能為貴公司帶來新的創意。", 
        isUser: false 
      }]);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleBack = () => {
    setCurrentPage('candidateView');
    navigate('/company/candidate-view');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-3 px-4 border-b border-gray-200 flex items-center">
        <button 
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        
        <div className="flex items-center ml-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3">
            {candidateData.length > 0 ? (
              <img 
                src={candidateData[0].imageUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={20} className="text-gray-400" />
              </div>
            )}
          </div>
          
          <div>
            <h2 className="font-medium">
              {candidateData.length > 0 ? candidateData[0].name : '應徵者'}
            </h2>
            <p className="text-xs text-gray-500">
              {candidateData.length > 0 ? 
                `${candidateData[0].school} ${candidateData[0].major}` : 
                '學生'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 px-4 py-4 overflow-y-auto bg-gray-50">
        <div className="max-w-xl mx-auto">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <ChatBubble 
                key={idx} 
                message={msg.text} 
                isUser={msg.isUser} 
              />
            ))}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-3 bg-white">
        <div className="max-w-xl mx-auto flex">
          <textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="輸入訊息..."
            className="flex-1 resize-none border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D439B]/40"
            rows={1}
          />
          <button
            onClick={handleSend}
            className="bg-[#2D439B] text-white px-4 rounded-r-lg flex items-center justify-center hover:bg-[#3A51B1] transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithCandidatePage;