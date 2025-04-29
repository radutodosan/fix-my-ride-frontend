import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px', backgroundColor: 'white' }}>
      {children}
    </div>
  );
};

export default Card;
