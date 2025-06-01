import React from 'react';
import { Tag } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  vertical?: boolean;
  withSubtitle?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  vertical = false,
  withSubtitle = false
}) => {
  const sizes = {
    small: 'text-xl',
    medium: 'text-3xl',
    large: 'text-5xl',
  };
  
  const iconSizes = {
    small: 24,
    medium: 32,
    large: 48,
  };

  return (
    <div className={`flex ${vertical ? 'flex-col items-center' : 'items-center'}`}>
      <div className="flex items-center">
        <h1 className={`${sizes[size]} font-bold text-[#2D439B]`}>
          TalenTag
        </h1>
        <Tag 
          className="text-[#00B9F2] transform rotate-12 ml-1" 
          size={iconSizes[size]} 
          color="#00B9F2" 
          strokeWidth={2} 
        />
      </div>
      {withSubtitle && (
        <p className="text-[#2D439B] mt-2 text-lg">AI精準媒合人才與機會</p>
      )}
    </div>
  );
};

export default Logo;