import React from 'react'
import { Link } from 'react-router-dom';

export default function Welcome() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
          <h1 className="fw-bold text-primary mb-4">Welcome to SRH Organisation</h1>
          <Link to="/sign-in">
            <button className="btn btn-primary btn-lg px-4 py-2">
              Sign In HR
            </button>
          </Link>
          <Link to="/sign-in-employee">
            <button className="btn btn-primary btn-lg px-4 py-2">
              Sign In Employee
            </button>
          </Link>
        </div>
      );
}
