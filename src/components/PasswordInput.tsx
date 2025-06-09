import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  controlId?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Enter password',
  required = false,
  controlId = 'formPassword',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <div style={{ position: 'relative' }}>
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        <Button
          variant="link"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '0.375rem 0.75rem',
            zIndex: 2,
          }}
          tabIndex={-1}
        >
          {showPassword ? <EyeSlash /> : <Eye />}
        </Button>
      </div>
    </Form.Group>
  );
};

export default PasswordInput;
