import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import SignOutButton from '../components/SignOutButton';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      setError('Failed to fetch user data');
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const userData = Object.fromEntries(formData.entries());
      
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${user.id}`, userData);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      fetchUserData();
    } catch (error) {
      setError('Failed to update profile' + error);
    }
  };

  if (!user) {
    return <Container className="my-4"><p>Loading...</p></Container>;
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">User Profile</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            defaultValue={user.name} 
            readOnly={!isEditing} 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            defaultValue={user.email} 
            readOnly={!isEditing} 
          />
        </Form.Group>
        {isEditing && (
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password" 
              placeholder="Leave blank to keep current password" 
            />
          </Form.Group>
        )}
        {isEditing ? (
          <>
            <Button variant="primary" type="submit" className="me-2">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
        <SignOutButton />
      </Form>
    </Container>
  );
};

export default ProfilePage;