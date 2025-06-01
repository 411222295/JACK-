import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { chatWithGPT } from '../components/api/chat';

const CompanyChatPage: React.FC = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([{
    role: 'assistant',
    content: language === 'zh'
      ? '嗨！請問您想建立哪一個職缺呢？我會一步步引導您填寫職缺資訊。'
      : 'Hi! What position would you like to post? I will guide you step by step.',
  }]);
  const [jobData, setJobData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userInput = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);

    try {
      // Get AI response
      const response = await chatWithGPT(userInput);
      
      // Add AI response to messages
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      // Update job data based on response
      // This is a simplified example - you would need more sophisticated parsing
      if (response.includes('職缺資料已成功儲存')) {
        setFinished(true);
        setHasResponse(true);
      }
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: language === 'zh'
            ? '抱歉，發生錯誤。請稍後再試。'
            : 'Sorry, an error occurred. Please try again later.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleStartMatching = () => navigate('/company/results');
  const handleBack = () => navigate('/company/register');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="sticky top-0 bg-white shadow-md z-10 p-4 flex items-center justify-between">
        <button onClick={handleBack} className="text-gray-600 hover:text-gray-800 flex items-center">
          <ArrowLeft className="mr-1" /> {language === 'zh' ? '返回' : 'Back'}
        </button>
        <h1 className="text-3xl font-bold text-gray-800 text-center flex-1">TalenTag AI</h1>
        <div className="w-12 text-right">
          <button onClick={() => setLanguage('zh')} className={language === 'zh' ? 'font-bold' : ''}>繁中</button>
          {' / '}
          <button onClick={() => setLanguage('en')} className={language === 'en' ? 'font-bold' : ''}>EN</button>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-4 py-6 max-w-3xl w-full mx-auto">
        <div className="flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 max-w-[75%] rounded-xl shadow-md whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-100 text-blue-900 self-end rounded-br-none'
                  : 'bg-white text-gray-800 self-start rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </main>

      <div className="sticky bottom-0 bg-white p-4 shadow-inner">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === 'zh' ? '輸入訊息...' : 'Enter your message...'}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className={`bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              language === 'zh' ? '發送' : 'Send'
            )}
          </button>
        </div>
      </div>

      {hasResponse && finished && (
        <div className="p-4 bg-transparent text-center">
          <button
            onClick={handleStartMatching}
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-green-600 transition"
          >
            {language === 'zh' ? '開始人才配對' : 'Start Talent Matching'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyChatPage;