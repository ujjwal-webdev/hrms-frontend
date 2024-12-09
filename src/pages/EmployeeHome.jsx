import React from "react";
 
export default function EmployeeHome() {

  return (
<div className="container mt-5">
<h1 className="text-center mb-4">Employee Home</h1>
 
      <div className="row gy-4">

        {/* Profile Section */}
<div className="col-md-6">
<div className="card shadow-sm">
<div className="card-body">
<h5 className="card-title">Profile Management</h5>
<p className="card-text">Manage your profile and related information.</p>
<button className="btn btn-primary btn-sm me-2">View Profile</button>
<button className="btn btn-primary btn-sm me-2">Update Profile</button>
<button className="btn btn-primary btn-sm">Update Password</button>
</div>
</div>
</div>
 
        {/* Address Section */}
<div className="col-md-6">
<div className="card shadow-sm">
<div className="card-body">
<h5 className="card-title">Address Management</h5>
<p className="card-text">Manage your addresses effectively.</p>
<button className="btn btn-primary btn-sm me-2">Add Address</button>
<button className="btn btn-primary btn-sm me-2">Update Address</button>
<button className="btn btn-primary btn-sm me-2">Get All Addresses</button>
<button className="btn btn-danger btn-sm">Delete Address</button>
</div>
</div>
</div>
 
        {/* Leave Section */}
<div className="col-md-6">
<div className="card shadow-sm">
<div className="card-body">
<h5 className="card-title">Leave Management</h5>
<p className="card-text">Track and manage your leaves.</p>
<button className="btn btn-primary btn-sm me-2">Add Leave</button>
<button className="btn btn-primary btn-sm me-2">Update Leave</button>
<button className="btn btn-danger btn-sm me-2">Delete Pending Leave</button>
<button className="btn btn-info btn-sm me-2">Check Latest Leave Status</button>
<button className="btn btn-primary btn-sm">Get All Leaves</button>
</div>
</div>
</div>
 
        {/* Work Section */}
<div className="col-md-6">
<div className="card shadow-sm">
<div className="card-body">
<h5 className="card-title">Work Management</h5>
<p className="card-text">Monitor and update your work status.</p>
<button className="btn btn-primary btn-sm me-2">Check Work</button>
<button className="btn btn-primary btn-sm">Change Work Status</button>
</div>
</div>
</div>
</div>
</div>

  );

}
 