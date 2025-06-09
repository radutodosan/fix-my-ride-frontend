import React, { useEffect, useState } from 'react';
import { useAlert } from '../contexts/AlertContext';
import { getAllMechanics } from '../services/ClientsService';
import { UserDetails } from '../types/UserDetails';
import { handleApiError } from '../utils/handleApiError';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Image, Spinner } from 'react-bootstrap';

const ClientMechanicsPage: React.FC = () => {
  const [mechanics, setMechanics] = useState<UserDetails[]>([]);
  const { showError } = useAlert();
  const navigate = useNavigate();

  const fetchMechanics = async () => {
    try {
      const data = await getAllMechanics();
      setMechanics(data);
    } catch (error) {
      const message = handleApiError(error);
      showError(message);
    }
  };
  useEffect(() => {


    fetchMechanics();
  }, []);

  const handleBookAppointment = (username: string) => {
    navigate(`/client/create-appointment/${username}`);
  };


  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Available Mechanics</h2>
      {mechanics.length === 0 ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Row xs={1} md={2} lg={2} className="g-4">
          {mechanics.map((mechanic, index) => (
            <Col key={index}>
              <Card className="h-100 shadow-sm">
                <Row className="g-0 h-100">
                  <Col xs={4} className="d-flex align-items-center justify-content-center">
                    <Image
                      src={mechanic.pictureUrl || 'https://via.placeholder.com/100'}
                      roundedCircle
                      fluid
                      alt="Mechanic"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </Col>
                  <Col xs={8}>
                    <Card.Body>
                      <Card.Title>{mechanic.username}</Card.Title>
                      <Card.Text>
                        <strong>Email:</strong> {mechanic.email}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleBookAppointment(mechanic.username)}
                      >
                        Book Appointment
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ClientMechanicsPage;