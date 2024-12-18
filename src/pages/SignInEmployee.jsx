import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/employee/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.data) {
        setError('Login failed. Please try again.');
        setLoading(false);
        return;
      }

      const { token, tokenType } = res.data;
      setLoading(false);
      setError(null);
      localStorage.setItem('authToken', `${tokenType} ${token}`);
      navigate('/employee-home');
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center fw-bold mb-4 text-primary">Sign In Employee</h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="userName"
              placeholder="Username"
              onChange={handleChange}
            />
            <label htmlFor="userName">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary text-uppercase fw-bold w-100 mt-3"
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
        <div className="text-center mt-4">
          <p className="mb-0">Don't have an account?</p>
          <Link to="/sign-up" className="text-decoration-none text-primary fw-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
