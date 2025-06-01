import React from 'react';

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  timestamp?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isUser = false,
  timestamp
}) => {
  return (
    <div className={`mb-4 ${isUser ? 'flex justify-end' : 'flex justify-start'}`}>
      <div className={`
        max-w-[80%] px-4 py-3 rounded-2xl
        ${isUser 
          ? 'bg-gray-200 text-gray-800' 
          : 'bg-[#2D439B] text-white'}
      `}>
        <p className="text-base">{message}</p>
        {timestamp && (
          <p className={`text-xs mt-1 ${isUser ? 'text-gray-500' : 'text-gray-300'}`}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;