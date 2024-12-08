import React from 'react';
import { Link } from 'react-router-dom';

export default function EmployeeHome() {
  return (
    <div>
        {/* <Link to="/sign-in"> */}
            <h1>Employee Home</h1>
            <button className="btn btn-primary btn-sm px-4 py-2">
                View your profile
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Update your profile
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Update your password
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Add Address
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Update Address
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Get All addresses
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Delete Address
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Add Leave
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Update Leave
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Delete Pending Leave
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                checkLatestLeaveStatus
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Get All Leaves
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Check work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2">
                Change Work status
            </button>
        {/* </Link> */}
    </div>
  );
}
