import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import './login.css';

const LoginForm = ({ onColorChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('#563d7c');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/login', { username, password });
      const { token } = response.data;

      // Store the token in localStorage or session storage
      localStorage.setItem('token', token);

      // Call the onColorChange function with the selected color
      onColorChange(color);

      // Redirect the user to the desired page or perform other actions
      // For example, you can use React Router to navigate to a different page
      // history.push('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ fontFamily: 'Arial', padding: '50px' }}>
  <h2 style={{ textAlign: 'center' }}>Login</h2>
  {error && <Alert variant="danger">{error}</Alert>}
  <Form onSubmit={handleLogin}>
    <Form.Group controlId="username" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </Form.Group>
    <Form.Group controlId="password" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Group>
    <Form.Group controlId="colorPicker" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Form.Label>What's your color today?</Form.Label>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Form.Control
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <Button variant="primary" type="submit">
          Login
        </Button>
      </div>
    </Form.Group>
  </Form>
</div>



  );
};

export default LoginForm;
