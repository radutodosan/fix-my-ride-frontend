import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import homePageImage from '../assets/home-page-img.png';


const HomePage: React.FC = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        {/* Left Side - Text */}
        <Col md={6}>
          <h1 className="display-5 fw-semibold mb-2">Welcome to</h1>
          <h1 className="display-3 fw-bold mb-3" style={{ color: '#2c3e50' }}>
            Fix My Ride
          </h1>
          <p className="lead">
            Manage your mechanic appointments as a client or handle your client appointments as a mechanic — all in one place.
          </p>
        </Col>

        {/* Right Side - Image */}
        <Col md={6} className="text-center">
          <img
            src={homePageImage}
            alt="Car mechanic"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Col>
      </Row>
    </Container >
  );
};

export default HomePage;
