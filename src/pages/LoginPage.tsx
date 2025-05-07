import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { clientLogin, mechanicLogin } from '../services/AuthService';
import { useAlert } from '../contexts/AlertContext';
import { handleApiError } from '../utils/handleApiError';
import {
  saveAccessToken,
  saveUsername,
  saveUserType,
  getAccessToken,
} from '../utils/storageUtils';
import { UserType } from '../types/userType';
import PasswordInput from '../components/PasswordInput';

const LoginPage: React.FC = () => {
  const { showSuccess, showError } = useAlert();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType.CLIENT | UserType.MECHANIC>(UserType.CLIENT);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (userType === UserType.CLIENT) {
        const response = await clientLogin({ username, password });
        saveAccessToken(response.token);
        saveUsername(response.client.username);
        console.log("Client: " + getAccessToken());
      } else {
        const response = await mechanicLogin({ username, password });
        saveAccessToken(response.token);
        saveUsername(response.mechanic.username);
        console.log("Mechanic: " + getAccessToken());
      }

      saveUserType(userType);
      showSuccess("Login successful!");
      navigate("/");
    } catch (err: unknown) {
      const message = handleApiError(err);
      showError(message);
      setError(message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Form onSubmit={handleLogin} className="p-4 border rounded shadow-sm bg-light">
            <h2 className="text-center mb-4">Login</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                required
              />
            </Form.Group>

            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError('');
              }}
              required
            />

            <Form.Group className="mb-4" controlId="formUserType">
              <Form.Label>User Type</Form.Label>
              <Form.Select
                value={userType}
                onChange={(e) => {
                  setUserType(e.target.value as UserType.CLIENT | UserType.MECHANIC);
                  if (error) setError('');
                }}
                required
              >
                <option value={UserType.CLIENT}>Client</option>
                <option value={UserType.MECHANIC}>Mechanic</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>

            <div className="text-center mt-3">
              Don't have an account? <Link to="/signup">Register here</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
