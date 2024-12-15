import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { useNavigate } from 'react-router-dom';

export default function SignInExternal() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userName: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/candidate/signin`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage('Sign in successful!');
      setMessageType('success');
      navigate('/candidate-home');
    } catch (error) {
      setMessage('Sign in failed. Please check your credentials and try again.');
      setMessageType('danger');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center text-primary mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="form-floating">
            <input
              type="text"
              name="userName"
              value={credentials.userName}
              onChange={handleChange}
              className="form-control"
              id="floatingUserName"
              placeholder="Username"
              required
            />
            <label htmlFor="floatingUserName">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
        {message && (
          <div className={`alert mt-3 text-center alert-${messageType}`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
