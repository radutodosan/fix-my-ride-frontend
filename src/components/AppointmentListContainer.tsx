import React from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Badge,
  Alert,
} from 'react-bootstrap';
import { Appointment } from '../types/Appointment';
import { UserType } from '../types/userType';



interface AppointmentListContainerProps {
  userType: UserType;
  appointments: Appointment[];
  maxWidth?: string;
  renderActions?: (appointment: Appointment) => React.ReactNode;
}

const statusVariantMap: Record<string, string> = {
  PENDING: 'secondary',
  CONFIRMED: 'success',
  CANCELLED: 'danger',
  COMPLETED: 'primary',
};


const AppointmentListContainer: React.FC<AppointmentListContainerProps> = ({
  userType,
  appointments,
  maxWidth = '750px',
  renderActions,
}) => {
  return (
    <Container className="mt-5" style={{ maxWidth }}>
      <h2 className="text-center mb-4">My Appointments</h2>

      {appointments.length === 0 ? (
        <Alert variant="info" className="text-center">No appointments found.</Alert>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment.id} className="mb-4 shadow-sm">
            <Row className="g-0 align-items-center">
              <Col md={3} className="text-center p-3">
                <Image
                  src={
                    "https://robohash.org/" +
                    (userType === UserType.CLIENT
                      ? appointment.mechanicUsername
                      : appointment.clientUsername
                    ) +
                    ".png"
                  }
                  roundedCircle
                  fluid
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  alt="Profile"
                />
                <p className="mt-2 fw-bold">
                  {userType === UserType.CLIENT
                    ? appointment.mechanicUsername
                    : appointment.clientUsername}
                </p>
              </Col>

              <Col md={9}>
                <Card.Body>
                  <Card.Title>{appointment.title}</Card.Title>
                  <Card.Text><strong>Description:</strong> {appointment.description}</Card.Text>
                  <Card.Text><strong>Car:</strong> {appointment.carDetails}</Card.Text>
                  <Card.Text><strong>Date:</strong> {appointment.appointmentDate}</Card.Text>
                  {appointment.appointmentTime && (
                    <Card.Text><strong>Time:</strong> {appointment.appointmentTime}</Card.Text>
                  )}
                  <Card.Text>
                    <strong>Status:</strong>{' '}
                    <Badge bg={statusVariantMap[appointment.status] || 'secondary'}>
                      {appointment.status}
                    </Badge>
                  </Card.Text>

                  {renderActions && (
                    <div className="mt-3">
                      {renderActions(appointment)}
                    </div>
                  )}
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))
      )}
    </Container>
  );
};

export default AppointmentListContainer;
