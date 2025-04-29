import React from 'react';

interface InputProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type, value, onChange, required = false }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default Input;
