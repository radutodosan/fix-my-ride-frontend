import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { clientSignup, mechanicSignup } from '../services/AuthService';
import { useAlert } from '../contexts/AlertContext';
import { handleApiError } from '../utils/handleApiError';
import { UserType } from '../types/userType';
import PasswordInput from '../components/PasswordInput';

const SignUpPage: React.FC = () => {
  const [userType, setUserType] = useState<UserType.CLIENT | UserType.MECHANIC>(UserType.CLIENT);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { showSuccess, showError } = useAlert();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      const msg = 'Passwords do not match!';
      showError(msg);
      setError(msg);
      return;
    }

    try {
      const signupData = { username, email, password };

      if (userType === UserType.CLIENT) {
        await clientSignup(signupData);
      } else {
        await mechanicSignup(signupData);
      }

      showSuccess('Signup successful! You can now login.');
      navigate('/login');
    } catch (err) {
      const message = handleApiError(err);
      showError(message);
      setError(message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Form onSubmit={handleSignup} className="p-4 border rounded shadow-sm bg-light">
            <h2 className="text-center mb-4">Sign Up</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="formUserType">
              <Form.Label>User Type</Form.Label>
              <Form.Select
                value={userType}
                onChange={(e) => {
                  setUserType(e.target.value as UserType.CLIENT | UserType.MECHANIC)
                  if (error) setError('');
                }}
              >
                <option value={UserType.CLIENT}>Client</option>
                <option value={UserType.MECHANIC}>Mechanic</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (error) setError('');
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
                required
              />
            </Form.Group>

            <PasswordInput
              label="Password"
              value={password}
              placeholder='Enter password'
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }
              }
              required
            />

            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              placeholder='Confirm password'
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError('');
              }
              }
              required
            />

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Sign Up
            </Button>

            <div className="text-center">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
