import { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
    setProducts(response.data);
  };

  const fetchUsers = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`);
    setUsers(response.data);
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData.entries());

    if (isEditing) {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/products/${currentItem.id}`, productData);
    } else {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products`, productData);
    }

    setShowProductModal(false);
    fetchProducts();
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    if (isEditing) {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${currentItem.id}`, userData);
    } else {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, userData);
    }

    setShowUserModal(false);
    fetchUsers();
  };

  const handleDelete = async (id, type) => {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/${type}/${id}`);
    if (type === 'products') {
      fetchProducts();
    } else {
      fetchUsers();
    }
  };

  const handleEdit = (item, type) => {
    setCurrentItem(item);
    setIsEditing(true);
    if (type === 'products') {
      setShowProductModal(true);
    } else {
      setShowUserModal(true);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      <Tabs defaultActiveKey="products" id="admin-tabs" className="mb-3">
        <Tab eventKey="products" title="Products">
          <Button className="mb-3"
            style={{
              backgroundColor: "#ffd814",
              borderColor: "#fcd200",
              color: "black"
            }}
            onClick={() => {
              setIsEditing(false);
              setCurrentItem(null);
              setShowProductModal(true);
            }}>
            Add New Product
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th style={{width: "30%"}}>Title</th>
                <th style={{width: "30%"}}>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.rating.rate}</td>
                  <td>
                    <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(product, 'products')}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(product.id, 'products')}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="users" title="Users">
          <Button variant="primary" className="mb-3"
            style={{
              backgroundColor: "#ffd814",
              borderColor: "#fcd200",
              color: "black"
            }}
            onClick={() => {
              setIsEditing(false);
              setCurrentItem(null);
              setShowUserModal(true);
            }}
          >
            Add New User
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.password ? user.password : "No password assigned"}</td>
                  <td>
                    <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(user, 'users')}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(user.id, 'users')}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      <Modal show={showProductModal} onHide={() => setShowProductModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProductSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" defaultValue={currentItem?.title} style={{ backgroundColor: "#eee", borderRadius: "0.3rem" }} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" defaultValue={currentItem?.price} style={{ backgroundColor: "#eee", borderRadius: "0.3rem" }} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" defaultValue={currentItem?.category} style={{ backgroundColor: "#eee", borderRadius: "0.3rem" }} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" defaultValue={currentItem?.description} style={{ backgroundColor: "#eee", borderRadius: "0.3rem" }} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="url" name="image" defaultValue={currentItem?.image} style={{ backgroundColor: "#eee", borderRadius: "0.3rem" }} required />
            </Form.Group>
            <Button variant="primary" type="submit"
              style={{
                backgroundColor: "#ffd814",
                borderColor: "#fcd200",
                color: "black"
              }}>
              {isEditing ? 'Update Product' : 'Add Product'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUserSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" defaultValue={currentItem?.name} style={{ backgroundColor: "#eee", borderRadius: "0.3rem" }} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" defaultValue={currentItem?.email} style={{ backgroundColor: "#eee", borderRadius: "0.3rem" }} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" style={{ backgroundColor: "#eee", borderRadius: "0.3rem" }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" name="role" style={{ backgroundColor: "#eee", borderRadius: "0.3rem" }} />
            </Form.Group>
            <Button variant="primary" type="submit"
              style={{
                backgroundColor: "#ffd814",
                borderColor: "#fcd200",
                color: "black"
              }}
            >
              {isEditing ? 'Update User' : 'Add User'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPage;