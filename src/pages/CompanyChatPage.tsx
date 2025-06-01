import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL;
const REFERER = import.meta.env.VITE_OPENROUTER_SITE;
const TITLE = import.meta.env.VITE_OPENROUTER_TITLE;

type Role = 'user' | 'assistant';
type Language = 'zh' | 'en';

interface Message {
  role: Role;
  content: string;
}

const requiredFields = ['title', 'description', 'skills', 'plus', 'location', 'mode', 'salary'];
const labels: Record<string, { zh: string; en: string }> = {
  title: { zh: '職缺名稱', en: 'Job Title' },
  description: { zh: '工作內容', en: 'Job Description' },
  skills: { zh: '必備技能', en: 'Required Skills' },
  plus: { zh: '加分條件', en: 'Preferred Qualifications' },
  location: { zh: '工作地點', en: 'Job Location' },
  mode: { zh: '工作型態', en: 'Work Type' },
  salary: { zh: '薪資範圍', en: 'Salary Range' },
};

const CompanyChatPage: React.FC = () => {
  const [language, setLanguage] = useState<Language>('zh');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: language === 'zh'
      ? '嗨！請問您想建立哪一個職缺呢？我會一步步引導您填寫職缺資訊。'
      : 'Hi! What position would you like to post? I will guide you step by step.',
  }]);
  const [jobData, setJobData] = useState<Record<string, string>>({});
  const [hasResponse, setHasResponse] = useState(false);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const systemPrompt = language === 'zh'
    ? `你是一位親切、耐心且語氣自然的繁體中文 AI 助理，協助企業一步步建立職缺資料。請依照以下 7 個欄位順序收集資訊：職缺名稱、工作內容、必備技能、加分條件、工作地點、工作型態、薪資範圍。每次只問一題。若使用者回答模糊請補問細節，不要總結或跳過欄位。`
    : `You are a friendly and patient AI assistant guiding the user to complete job posting fields. Please collect these 7 fields: Job Title, Job Description, Required Skills, Preferred Qualifications, Location, Work Mode, Salary Range. Ask one question at a time. If vague, follow up. Do not summarize or skip fields.`;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIAnalysis = async (fullData: Record<string, string>) => {
    const prompt = Object.keys(fullData).map(key => `${labels[key]?.[language] || key}: ${fullData[key]}`).join('\n');
    const finalPrompt = language === 'zh'
      ? `以下是公司職缺資訊，請產生一段 2~3 句的分析摘要，建議應徵人選特質或能力方向：\n${prompt}`
      : `Here is a job posting. Please generate a 2-3 sentence summary with recommended candidate traits and skills:\n${prompt}`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': REFERER,
        'X-Title': TITLE,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: finalPrompt },
        ],
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    return data?.choices?.[0]?.message?.content?.trim() || '(分析失敗)';
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userInput = input.trim();
    const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': REFERER,
          'X-Title': TITLE,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            ...newMessages.map((m) => ({ role: m.role as Role, content: m.content })),
          ],
          max_tokens: 300,
          temperature: 0.5,
        }),
      });

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content?.trim() || '(無回應)';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

      const lower = userInput.toLowerCase();
      for (const field of requiredFields) {
        if (!jobData[field] && lower.includes(field)) {
          setJobData(prev => ({ ...prev, [field]: userInput }));
        }
      }

      const allFilled = requiredFields.every(key => jobData[key]);
      if (allFilled && !finished) {
        setFinished(true);
        const fullData = { ...jobData };
        await addDoc(collection(db, 'jobs'), {
          ...fullData,
          createdAt: Timestamp.now(),
        });

        const summary = requiredFields.map(key => `🔹 ${labels[key][language]}：${fullData[key]}`).join('\n');
        const confirmHeader = language === 'zh' ? '📄 職缺資料已成功儲存至 Firebase ✅' : '📄 Job data has been saved to Firebase ✅';
        const analysis = await getAIAnalysis(fullData);
        const analysisHeader = language === 'zh' ? '📊 分析報告摘要' : '📊 Summary';

        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: `${confirmHeader}\n\n${summary}\n\n${analysisHeader}\n${analysis}` },
        ]);
        setHasResponse(true);
      }
    } catch (error: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: language === 'zh'
            ? `⚠️ 系統錯誤，請稍後再試。(${error.message})`
            : `⚠️ System error. Please try again later. (${error.message})`,
        },
      ]);
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
              className={`p-3 max-w-[75%] rounded-xl shadow-md whitespace-pre-wrap transition-all duration-300 ${
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
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            {language === 'zh' ? '發送' : 'Send'}
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
