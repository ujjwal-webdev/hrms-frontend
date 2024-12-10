import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <div className="p-4 shadow rounded" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="fw-bold text-primary mb-4">Welcome to SRH Organisation</h1>
        <p className="mb-4 text-muted">Please select your sign-in option below.</p>
        <div className="d-grid gap-3">
          <Link to="/sign-in">
            <button className="btn btn-primary btn-lg px-4 py-2 w-100">
              Sign In as HR
            </button>
          </Link>
          <Link to="/sign-in-employee">
            <button className="btn btn-primary btn-lg px-4 py-2 w-100">
              Sign In as Employee
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
