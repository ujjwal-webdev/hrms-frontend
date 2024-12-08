import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function SignIn() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
        setLoading(true)
        const res = await axios.post('http://localhost:8896/admin/login', formData, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        
        // console.log(res.data);

        if(!res.data)
        {
            setError(data.message);
            setLoading(false);
            return;
        }

        const { token, tokenType } = res.data;
        setLoading(false);
        setError(null);
        localStorage.setItem('authToken', `${tokenType} ${token}`);
        navigate('/hr-home');

    } 
    catch (error) 
    {
        console.log(error);
        setLoading(false);
        setError(error.response.data.message)
    }
  }
  
  return (
    <div className="p-4 mx-auto" style={{ maxWidth: '500px' }}>
      <h1 className="text-center fw-bold my-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input
          type="text"
          placeholder="Username"
          className="form-control"
          id="userName"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="btn btn-primary text-uppercase fw-bold"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      {/* <div className="d-flex gap-2 mt-4">
        <p className="mb-0">Don't have an account?</p>
        <Link to="/sign-up" className="text-decoration-none text-primary fw-bold">
          Sign Up
        </Link>
      </div> */}
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
}
