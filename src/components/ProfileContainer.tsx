import React from 'react';
import {
  Container, Card, Row, Col, Image, Button, Collapse, Form,
} from 'react-bootstrap';
import PasswordInput from './PasswordInput';

interface ProfileContainerProps {
  title: string;
  user: { username: string; email: string; pictureUrl?: string } | null;
  showEditProfile: boolean;
  onToggleEdit: () => void;
  currentPassword: string;
  newPassword: string;
  passwordForEmail: string;
  newEmail: string;
  setCurrentPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  setPasswordForEmail: (value: string) => void;
  setNewEmail: (value: string) => void;
  handleChangePassword: (e: React.FormEvent) => void;
  handleChangeEmail: (e: React.FormEvent) => void;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  title,
  user,
  showEditProfile,
  onToggleEdit,
  currentPassword,
  newPassword,
  passwordForEmail,
  newEmail,
  setCurrentPassword,
  setNewPassword,
  setPasswordForEmail,
  setNewEmail,
  handleChangePassword,
  handleChangeEmail,
}) => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">{title}</h2>

      {user ? (
        <Card className="mb-4 shadow-sm">
          <Row className="g-0 align-items-center">
            <Col xs={4} className="text-center">
              <Image
                src={user.pictureUrl || 'https://via.placeholder.com/150'}
                roundedCircle
                fluid
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  margin: '20px',
                }}
                alt="Profile"
              />
            </Col>
            <Col xs={8}>
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {user.email}
                </Card.Text>
                <Button
                  variant={showEditProfile ? 'secondary' : 'primary'}
                  onClick={onToggleEdit}
                >
                  {showEditProfile ? 'Cancel' : 'Edit Profile'}
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ) : (
        <p className="text-center">Loading profile details...</p>
      )}

      <Collapse in={showEditProfile}>
        <div>
          <Card className="p-4 shadow-sm bg-light">
            <h4 className="mb-3">Change Password</h4>
            <Form onSubmit={handleChangePassword} className="mb-4">
              <PasswordInput
                label="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <PasswordInput
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button type="submit" variant="primary">
                Change Password
              </Button>
            </Form>

            <h4 className="mb-3">Change Email</h4>
            <Form onSubmit={handleChangeEmail}>
              <Form.Group className="mb-3" controlId="newEmail">
                <Form.Label>New Email</Form.Label>
                <Form.Control
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <PasswordInput
                label="Current Password"
                value={passwordForEmail}
                onChange={(e) => setPasswordForEmail(e.target.value)}
                required
                controlId="passwordForEmail"
              />

              <Button type="submit" variant="primary">
                Change Email
              </Button>
            </Form>
          </Card>
        </div>
      </Collapse>
    </Container>
  );
};

export default ProfileContainer;
