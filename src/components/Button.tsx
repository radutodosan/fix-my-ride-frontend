import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', variant = 'primary' }) => {
  const baseClass = 'px-4 py-2 rounded font-semibold';
  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-400 text-white hover:bg-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variantClass[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
