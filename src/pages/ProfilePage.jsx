import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import SignOutButton from '../components/SignOutButton';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const userDate = useSelector((state) => state.user.currentUser);

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

  if (!userDate) {
    return <Link to={"/signin"} className="text-center"><h5 className="my-4">Please log in to you account</h5></Link>;
  }

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
            <Button type="submit" style={{
              backgroundColor: "#3bff14",
              borderColor: "#3bff14",
              color: "black",
              borderRadius: "3rem",
              marginRight: "0.5rem"
            }}>
              Save Changes
            </Button>
            <Button onClick={() => setIsEditing(false)} style={{
              backgroundColor: "#db1a1a",
              borderColor: "#db1a1a",
              color: "white",
              borderRadius: "3rem",
              marginRight: "0.5rem"
            }}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={() => setIsEditing(true)} style={{
              backgroundColor: "#3bff14",
              borderColor: "#3bff14",
              color: "black",
              borderRadius: "3rem",
              marginRight: "0.5rem"
            }}>
              Edit Profile
            </Button>
            <SignOutButton />
          </>
        )}
      </Form>
    </Container>
  );
};

export default ProfilePage;