import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const baseStyle = 'rounded-full font-medium transition-all duration-300 flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[#2D439B] text-white hover:bg-[#3A51B1] active:bg-[#223073]',
    secondary: 'bg-[#00B9F2] text-white hover:bg-[#19C5FD] active:bg-[#0099CA]',
    gradient: 'bg-gradient-to-r from-[#8AB4F8] to-[#00B9F2] text-white hover:opacity-90 active:opacity-100',
    outline: 'border-2 border-[#2D439B] text-[#2D439B] hover:bg-[#2D439B]/10 active:bg-[#2D439B]/20',
  };

  const sizes = {
    small: 'text-sm py-1 px-4',
    medium: 'text-base py-2 px-6',
    large: 'text-lg py-3 px-8',
  };

  return (
    <button
      type={type}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;