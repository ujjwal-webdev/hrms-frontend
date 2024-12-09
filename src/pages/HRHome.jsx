import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function HRHome() {

  const [selectedFeature, setSelectedFeature] = useState(null);
  const [message, setMessage] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [username, setUsername] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [hrFormData, setHRFormData] = useState({
    dateOfBirth: '',
    email: '',
    gender: '',
    name: '',
    role: '',
    salary: '',
});

const handleRegisterHRChange = (e) => {
    const { name, value } = e.target;
    setHRFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const [updatePasswordFormData, setUpdatePasswordFormData] = useState({
    newPassword: '',
    confirmPassword: '',
});

const handleUpdatePasswordChange = (e) => {
    const {name, value} = e.target;
    setUpdatePasswordFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const[changeRole, setChangeRole] = useState({
    employeeId: '',
    newRole: '',
})

const handleRoleChange = (e) => {
    const {name, value} = e.target;
    setChangeRole((prev) => ({
        ...prev,
        [name]: value
    }))
}

const[changeSalary, setChangeSalary] = useState({
    employeeId: '',
    employeeSalary: '',
    bonusThatYear: '',
    benefitPoints: ''
})

const handleSalaryChange = (e) => {
    const {name, value} = e.target;
    setChangeSalary((prev) => ({
        ...prev,
        [name]: value
    }))
}

const[changeDepartment, setChangeDepartment] = useState({
    employeeId: '',
    departmentId: '',
})

const handleDepartmentChange = (e) => {
    const {name, value} = e.target;
    setChangeDepartment((prev) => ({
        ...prev,
        [name]: value
    }))
}

const [updateDept, setUpdateDept] = useState({
    deptId: '',
    newDeptName: '',
});

const handleDeptChange = (e) => {
    const { name, value } = e.target;
    setUpdateDept((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const [deleteDept, setDeleteDept] = useState({
    deptId: '',
});

const handleDeptInputChange = (e) => {
    const { name, value } = e.target;
    setDeleteDept((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const [departmentId, setDepartmentId] = useState('');
const [departmentName, setDepartmentName] = useState('');
const [department, setDepartment] = useState(null);

const [departments, setDepartments] = useState([]);

  const handleAddDepartment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8896/admin/departments",
        { departmentName },
        {
          headers: {
            Authorization: localStorage.getItem('authToken'),
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(`Department added successfully: ${response.data.departmentName}`);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred while adding the department."
      );
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const employeeData = {
        name: document.getElementById("employeeName").value,
        role: document.getElementById("role").value,
        gender: document.getElementById("gender").value,
        salary: parseFloat(document.getElementById("salary").value),
        phoneNo: document.getElementById("phoneNo").value,
        dateOfBirth: document.getElementById("dateOfBirth").value,
        email: document.getElementById("email").value
    };

    const departmentId = document.getElementById("departmentId").value;

    try {
        const token = localStorage.getItem("authToken"); // Retrieve stored token

        const response = await axios.post(
            `http://localhost:8896/admin/employees/${departmentId}`,
            employeeData,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );
        setMessage(`Employee added successfully`);
        document.getElementById("addEmployeeForm").reset();
    } catch (error) {
        setMessage(
            error.response?.data?.message || "An error occurred while adding the employee."
        );
    }
};

const handleDeleteEmployee = async (e) => {
    e.preventDefault();

    if (!employeeId) {
        alert("Please enter an Employee ID.");
        return;
    }

    if (window.confirm(`Are you sure you want to delete employee with ID ${employeeId}?`)) {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.delete(
                `http://localhost:8896/admin/employees/${employeeId}`,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );
            setMessage(`Employee deleted successfully`);
            setEmployeeId(""); // Clear the form field
        } catch (error) {
            setMessage(
                error.response?.data?.message || "An error occurred while adding the employee."
            );
        }
    }
};

const handleGetEmployeeById = async (e) => {    
    e.preventDefault();

    try {
        setLoading(true);
        setEmployeeData(null);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:8896/admin/employees/byEmployeeId/${employeeId}`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            }
        });

        // console.log(response)

        setEmployeeData(response.data);
        setLoading(false);
        // setMessage(`Employee fetched successfully: ${JSON.stringify(response.data)}`);
    }
    catch (error) {
        console.log(error.response.data.message)
        setEmployeeData(null);
        setLoading(false);
        setMessage(error.response.data.message);
    }
};

const handleGetEmployeeByUsername = async (e) => { 
    e.preventDefault();

    try {
        setLoading(true);
        setEmployeeData(null);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:8896/admin/employees/byUserName/${username}`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });

        setEmployeeData(response.data);
        setLoading(false);
        // setMessage(`Employee fetched successfully: ${JSON.stringify(response.data)}`);
    } 
    catch (error) {
        setEmployeeData(null);
        setLoading(false);
        setMessage(`Error fetching employee: ${error.response?.data?.message || error.message}`);
    }
};

const handleViewYourProfile = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
        setEmployeeData(null);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:8896/admin/viewProfile`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });

        setEmployeeData(response.data);
        setLoading(false);
        // setMessage(`Employee fetched successfully: ${JSON.stringify(response.data)}`);
    }
    catch(error) {
        setEmployeeData(null);
        setLoading(false);
        setMessage(`Error fetching employee: ${error.response?.data?.message || error.message}`);
    }
};

const handleRegisterHR = async (e) => {
    e.preventDefault();

    try
    {
        setLoading(true);
        setEmployeeData(null);
        const token = localStorage.getItem("authToken");
        const response = await axios.post(`http://localhost:8896/admin/registerAdmin`,
            hrFormData, 
            {
            headers:{
                Authorization: token,
                "Content-Type": "application/json",
            }
            });
            setMessage("Successful")
    }
    catch(error)
    {
        setHRFormData(null)
        setLoading(false);
        setMessage(`Error registering HR`);
    }
}

const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    try
    {
        setLoading(true);
        setEmployeeData(null);
        const token = localStorage.getItem("authToken");
        const response = await axios.put(`http://localhost:8896/admin/updatePassword`,
            updatePasswordFormData,
            {
                headers:{
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            }
        )
        setMessage("Successful");
    }
    catch(error)
    {
        setUpdatePasswordFormData(null)
        setLoading(false)
        setMessage(`Error updating password`);
    }
}

const handleGetAllEmployees = async (e) => {
    e.preventDefault();
    try
    {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:8896/admin/employees`,
            {
                headers:{
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            }
        )
        setAllEmployees(response.data)
    }
    catch(error)
    {
        setMessage(`Error getting all employees`);
    }
}

const handleEmployeeChangeRole = async (e) => {
    e.preventDefault();
    try
    {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.patch(`http://localhost:8896/admin/employees/setNewRole/${changeRole.employeeId}/${changeRole.newRole}`,
            {},{
                headers:{
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            }
        );
        // setChangeRole(null);
        setMessage("Successful");
    }
    catch(error)
    {
        setMessage(`error: ${error.message}`);
    }
}

const handleEmployeeChangeSalary = async (e) => {
    e.preventDefault();
    try
    {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.patch(`http://localhost:8896/admin/employees/setNewSalary/${changeSalary.employeeId}/${changeSalary.employeeSalary}/${changeSalary.bonusThatYear}/${changeSalary.benefitPoints}`,
            {},{
                headers:{
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            }
        );
        // setChangeRole(null);
        setMessage("Successful");
    }
    catch(error)
    {
        setMessage(`error: ${error.message}`);
    }
}

const handleEmployeeChangeDepartment = async (e) => {
    e.preventDefault();
    try
    {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.patch(`http://localhost:8896/admin/employees/setNewDepartment/${changeDepartment.employeeId}/${changeDepartment.departmentId}`,
            {},{
                headers:{
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            }
        );
        // setChangeRole(null);
        setMessage("Successful");
    }
    catch(error)
    {
        setMessage(`error: ${error.message}`);
    }
}

const handleUpdateDepartmentName = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);

        const token = localStorage.getItem("authToken");
        const response = await axios.put(
            `http://localhost:8896/admin/departments/${updateDept.deptId}`,
            {
                departmentName: updateDept.newDeptName, // Sending the updated department name in request body
            },
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setUpdateDept({
            deptId: '',
            newDeptName: '',
        });

        setMessage(`Department updated successfully`);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
};

const handleDeleteDepartment = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);

        const token = localStorage.getItem("authToken");
        const response = await axios.delete(
            `http://localhost:8896/admin/departments/${deleteDept.deptId}`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDeleteDept({
            deptId: '',
        });

        setMessage(`Department deleted successfully`);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
};

const handleGetDepartmentById = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');
        setDepartment(null);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `http://localhost:8896/admin/departments/${departmentId}`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDepartment(response.data);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
};

const handleGetAllDepartments = async () => {
    try {
        setLoading(true);
        setMessage('');
        setDepartments([]);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `http://localhost:8896/admin/departments`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDepartments(response.data);
    } catch (error) {
        setMessage(
            `Error: ${error.response?.data?.message || error.message}`
        );
    } finally {
        setLoading(false);
    }
};

const handleGetDepartmentByName = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');
        setDepartment(null);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `http://localhost:8896/admin/departments/name/${departmentName}`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDepartment(response.data);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
};

const fetchDepartmentsSortedByName = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');
        setDepartment(null);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `http://localhost:8896/admin/departments/sortByNameAsc`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDepartments(response.data);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
}

const fetchDepartmentsSortedByNameDesc = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');
        setDepartment(null);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `http://localhost:8896/admin/departments/sortByNameDesc`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDepartments(response.data);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
}




  const renderForm = () => {
    switch (selectedFeature) {
        case 'addDepartment':
            return (
                <div className="mt-4">
                  <h3>Add Department</h3>
                  <form onSubmit={handleAddDepartment}>
                    <div className="mb-3">
                      <label htmlFor="departmentName" className="form-label">
                        Department Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="departmentName"
                        placeholder="Enter department name"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </form>
                  {message && <p className="mt-3">{message}</p>}
                </div>
            );
        case 'addEmployee':
            return (
                <form id="addEmployeeForm" className="mt-4" onSubmit={handleAddEmployee}>
                    <h3>Add Employee</h3>
                    
                    <div className="mb-3">
                        <label htmlFor="employeeName" className="form-label">Employee Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="employeeName" 
                            placeholder="Enter employee name" 
                            required 
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="departmentId" className="form-label">Department ID</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="departmentId" 
                            placeholder="Enter department ID" 
                            required 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email ID</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter Email ID" 
                            required 
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select className="form-select" id="role" required>
                            <option value="">Select Role</option>
                            <option value="CODER">Coder</option>
                            <option value="TESTER">Tester</option>
                            <option value="DEBUGGER">Debugger</option>
                            <option value="HR">HR</option>
                        </select>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <select className="form-select" id="gender" required>
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="salary" className="form-label">Salary</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="salary" 
                            placeholder="Enter salary" 
                            required 
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="phoneNo" 
                            placeholder="Enter phone number" 
                            required 
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="dateOfBirth" 
                            required 
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-success">Submit</button>
                    {message && <p className="mt-3">{message}</p>}
                </form>
        );            
        case 'deleteEmployee':
            return (
                <form className="mt-4" onSubmit={handleDeleteEmployee}>
                    <h3>Delete Employee</h3>
                    <div className="mb-3">
                        <label htmlFor="employeeId" className="form-label">Employee ID</label>
                        <input
                        type="text"
                        className="form-control"
                        id="employeeId"
                        placeholder="Enter employee ID"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                        />
                    </div>
                    <button type="submit" className="btn btn-danger">Submit</button>
                    {message && <p className="mt-3">{message}</p>}
                </form>
            );
        case 'getEmployeeByID': //test from here
            return (
                <div className="mt-4">
                    <form className="mt-4" onSubmit={handleGetEmployeeById}>
                        <h3>Get Employee by ID</h3>
                        <div className="mb-3">
                            <label htmlFor="employeeId" className="form-label">Employee ID</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="employeeId" 
                                placeholder="Enter employee ID" 
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-danger">Submit</button>
                    </form>
                    {/* {loading && <p>Loading...</p>} */}

                    {employeeData && (
                        <div className="mt-4 border p-3 rounded shadow">
                            <h3>Employee Details</h3>
                            <p><strong>ID:</strong> {employeeData.employeeId}</p>
                            <p><strong>Name:</strong> {employeeData.name}</p>
                            <p><strong>Username:</strong> {employeeData.userName}</p>
                            <p><strong>Email:</strong> {employeeData.email || 'Not Provided'}</p>
                            <p><strong>Gender:</strong> {employeeData.gender || 'Not Specified'}</p>
                            <p><strong>Salary:</strong> ${employeeData.salary.toLocaleString()}</p>
                            <p><strong>Date of Birth:</strong> {employeeData.dateOfBirth || 'Not Provided'}</p>
                            <p><strong>Role:</strong> {employeeData.role}</p>
                            <p><strong>DepartmentID:</strong> {employeeData.departmentId}</p>
                            <p><strong>Joining Date:</strong> {employeeData.joiningDate}</p>
                            <p><strong>Department Name:</strong> {employeeData.departmentName}</p>
                        </div>
                    )}

                    {message && (
                        <p className="mt-3 text-danger">{message}</p>
                    )}
                </div>
            );
        case 'getEmployeeByUsername': 
            return (
                <div>
                    <form className="mt-4" onSubmit={handleGetEmployeeByUsername}>
                        <h3>Get Employee by Username</h3>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {loading && <p>Loading...</p>}

                    {employeeData && (
                        <div className="mt-4 border p-3 rounded shadow">
                            <h3>Employee Details</h3>
                            <p><strong>ID:</strong> {employeeData.employeeId}</p>
                            <p><strong>Name:</strong> {employeeData.name}</p>
                            <p><strong>Username:</strong> {employeeData.userName}</p>
                            <p><strong>Email:</strong> {employeeData.email || 'Not Provided'}</p>
                            <p><strong>Gender:</strong> {employeeData.gender || 'Not Specified'}</p>
                            <p><strong>Salary:</strong> ${employeeData.salary.toLocaleString()}</p>
                            <p><strong>Date of Birth:</strong> {employeeData.dateOfBirth || 'Not Provided'}</p>
                            <p><strong>Role:</strong> {employeeData.role}</p>
                            <p><strong>DepartmentID:</strong> {employeeData.departmentId}</p>
                            <p><strong>Joining Date:</strong> {employeeData.joiningDate}</p>
                            <p><strong>Department Name:</strong> {employeeData.departmentName}</p>
                        </div>
                    )}

                    {message && (
                        <p className="mt-3 text-danger">{message}</p>
                    )}
                </div>
            );
        case 'viewYourProfile':
            return (
                <div className="mt-4 border p-3 rounded shadow">
                    {loading && <p>Loading...</p>}

                    <form className="mt-4" onSubmit={handleViewYourProfile}>
                        <button type="submit" className="btn btn-primary">View my Profile</button>
                    </form>

                    {employeeData && (
                        <div className="mt-4 border p-3 rounded shadow">
                            <h3>Employee Details</h3>
                            <p><strong>ID:</strong> {employeeData.employeeId}</p>
                            <p><strong>Name:</strong> {employeeData.name}</p>
                            <p><strong>Username:</strong> {employeeData.userName}</p>
                            <p><strong>Email:</strong> {employeeData.email || 'Not Provided'}</p>
                            <p><strong>Gender:</strong> {employeeData.gender || 'Not Specified'}</p>
                            <p><strong>Salary:</strong> ${employeeData.salary.toLocaleString()}</p>
                            <p><strong>Date of Birth:</strong> {employeeData.dateOfBirth || 'Not Provided'}</p>
                            <p><strong>Role:</strong> {employeeData.employeeOrAdmin}</p>
                        </div>
                    )}

                    {message && (
                        <p className="mt-3 text-danger">{message}</p>
                    )}
                </div>
            );
        case 'registerAnotherHR':
            return (
                <form onSubmit={handleRegisterHR} className="border p-4 rounded shadow">
                    <h3>Employee Form</h3>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={hrFormData.name}
                            onChange={handleRegisterHRChange}
                            className="form-control"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={hrFormData.email}
                            onChange={handleRegisterHRChange}
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select
                            name="gender"
                            value={hrFormData.gender}
                            onChange={handleRegisterHRChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={hrFormData.dateOfBirth}
                            onChange={handleRegisterHRChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={hrFormData.role}
                            onChange={handleRegisterHRChange}
                            className="form-control"
                            placeholder="Enter your role"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            value={hrFormData.salary}
                            onChange={handleRegisterHRChange}
                            className="form-control"
                            placeholder="Enter your salary"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>

                    <p>{message}</p>
                </form>
            );
        case 'updatePassword':
            return (
                <form onSubmit={handleUpdatePassword} className="mt-4 border p-4 rounded shadow">
                    <h3>Update Password</h3>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            id="newPassword"
                            placeholder="Enter new password"
                            value={updatePasswordFormData.newPassword}
                            onChange={handleUpdatePasswordChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            value={updatePasswordFormData.confirmPassword}
                            onChange={handleUpdatePasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Password</button>
                    {message && <p className="mt-3 text-success">{message}</p>}
                </form>
            );
        case 'getAllEmployees':
            return (
                <div className="mt-4 border p-4 rounded shadow">
                    {allEmployees.length === 0 ? (
                        <button className="btn btn-primary" onClick={handleGetAllEmployees}>Get all employees</button>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department ID</th>
                                    <th>Department Name</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Gender</th>
                                    <th>Salary</th>
                                    <th>Date of Birth</th>
                                    <th>Joining Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allEmployees.map((employee) => (
                                    <tr key={employee.employeeId}>
                                        <td>{employee.employeeId}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email || 'Not Provided'}</td>
                                        <td>{employee.departmentId}</td>
                                        <td>{employee.departmentName || 'Not Specified'}</td>
                                        <td>{employee.userName}</td>
                                        <td>{employee.role}</td>
                                        <td>{employee.gender || 'Not Specified'}</td>
                                        <td>${employee.salary.toLocaleString()}</td>
                                        <td>{employee.dateOfBirth || 'Not Provided'}</td>
                                        <td>{employee.joiningDate || 'Not Provided'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );
        case 'changeEmployeeRole':
            return (
                <form onSubmit={handleEmployeeChangeRole} className="border p-4 rounded shadow mt-4">
                    <h3>Change Employee Role</h3>
                    <div className="mb-3">
                        <label className="form-label">Employee ID</label>
                        <input
                            type="number"
                            className="form-control"
                            name="employeeId"
                            value={changeRole.employeeId}
                            onChange={handleRoleChange}
                            placeholder="Enter Employee ID"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Role</label>
                        <select
                            className="form-select"
                            name="newRole"
                            value={changeRole.newRole}
                            onChange={handleRoleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="CODER">CODER</option>
                            <option value="TESTER">TESTER</option>
                            <option value="DEBBUGER">DEBBUGER</option>
                            <option value="HR">HR</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <p>{message}</p>
                </form>
            );
        case 'setEmployeeSalary':
            return (
                <form onSubmit={handleEmployeeChangeSalary} className="border p-4 rounded shadow mt-4">
                    <h3>Change Employee Salary</h3>
                    <div className="mb-3">
                        <label className="form-label">Employee ID</label>
                        <input
                            type="number"
                            className="form-control"
                            name="employeeId"
                            value={changeSalary.employeeId}
                            onChange={handleSalaryChange}
                            placeholder="Enter Employee ID"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Salary</label>
                        <input
                            type="number"
                            className="form-control"
                            name="employeeSalary"
                            value={changeSalary.salary}
                            onChange={handleSalaryChange}
                            placeholder="Enter Employee Salary"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">BonusThatYear</label>
                        <input
                            type="number"
                            className="form-control"
                            name="bonusThatYear"
                            value={changeSalary.bonusThatYear}
                            onChange={handleSalaryChange}
                            placeholder="Enter Employee bonus that year"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">benefitPoints</label>
                        <input
                            type="number"
                            className="form-control"
                            name="benefitPoints"
                            value={changeSalary.benefitPoints}
                            onChange={handleSalaryChange}
                            placeholder="Enter Employee benefit points"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <p>{message}</p>
                </form>
            );
        case 'changeEmployeeDepartment':
            return (
                <form onSubmit={handleEmployeeChangeDepartment} className="border p-4 rounded shadow mt-4">
                    <h3>Change Employee Role</h3>
                    <div className="mb-3">
                        <label className="form-label">Employee ID</label>
                        <input
                            type="number"
                            className="form-control"
                            name="employeeId"
                            value={changeDepartment.employeeId}
                            onChange={handleDepartmentChange}
                            placeholder="Enter Employee ID"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Department ID</label>
                        <input
                            type="number"
                            className="form-control"
                            name="departmentId"
                            value={changeDepartment.departmentId}
                            onChange={handleDepartmentChange}
                            placeholder="Enter Department ID"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <p>{message}</p>
                </form>
            );
        case 'updateDepartmentName':
            return (
                <form onSubmit={handleUpdateDepartmentName} className="border p-4 rounded shadow mt-4">
                    <h3>Update Department Name</h3>
                    <div className="mb-3">
                        <label className="form-label">Department ID</label>
                        <input
                            type="number"
                            name="deptId"
                            value={updateDept.deptId}
                            onChange={handleDeptChange}
                            className="form-control"
                            placeholder="Enter Department ID"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Department Name</label>
                        <input
                            type="text"
                            name="newDeptName"
                            value={updateDept.newDeptName}
                            onChange={handleDeptChange}
                            className="form-control"
                            placeholder="Enter New Department Name"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    {message && <p className="mt-3">{message}</p>}
                </form>
            );
        case 'deleteDepartment':
            return (
                <form onSubmit={handleDeleteDepartment} className="border p-4 rounded shadow mt-4">
                    <h3>Delete Department</h3>
                    <div className="mb-3">
                        <label className="form-label">Department ID</label>
                        <input
                            type="number"
                            name="deptId"
                            value={deleteDept.deptId}
                            onChange={handleDeptInputChange}
                            className="form-control"
                            placeholder="Enter Department ID"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-danger">
                        Delete
                    </button>
                    {message && <p className="mt-3">{message}</p>}
                </form>
            );
        case 'getDepartmentbyID':
            return (
                <form onSubmit={handleGetDepartmentById} className="border p-4 rounded shadow mt-4">
                    <h3>Get Department by ID</h3>
                    <div className="mb-3">
                        <label className="form-label">Department ID</label>
                        <input
                            type="number"
                            name="deptId"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            className="form-control"
                            placeholder="Enter Department ID"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Get Department
                    </button>
                    {message && <p className="mt-3 text-danger">{message}</p>}
                    {department && (
                        <div className="mt-4 border p-3 rounded shadow">
                            <h4>Department Details</h4>
                            <p><strong>ID:</strong> {department.departmentId}</p>
                            <p><strong>Name:</strong> {department.departmentName}</p>
                        </div>
                    )}
                </form>
            );
        case 'getAllDepartments':
            return (
                <div className="mt-4">
                    <h3>All Departments</h3>
                    <button
                        onClick={handleGetAllDepartments}
                        className="btn btn-primary mb-3"
                    >
                        Fetch All Departments
                    </button>
                    {departments && departments.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map((dept) => (
                                    <tr key={dept.departmentId}>
                                        <td>{dept.departmentId}</td>
                                        <td>{dept.departmentName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {/* {departments && departments.length === 0 && (
                        <p>No departments found.</p>
                    )} */}
                </div>
            );
            
            case 'getDepartmentByName':
                return (
                    <div className="mt-4">
                        <h3>Get Department by Name</h3>
                        <form onSubmit={handleGetDepartmentByName} className="border p-4 rounded shadow">
                            <div className="mb-3">
                                <label className="form-label">Department Name</label>
                                <input
                                    type="text"
                                    name="departmentName"
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Department Name"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        {department && (
                            <div className="mt-4">
                                <h4>Department Details</h4>
                                <p><strong>ID:</strong> {department.departmentId}</p>
                                <p><strong>Name:</strong> {department.departmentName}</p>
                            </div>
                        )}
                    </div>
                );
                
            case 'getDepartmentByName(ASC)':
                return (
                    <div className="mt-4">
                        <h3>Get Departments in Alphabetical Order (ASC)</h3>
                        <button onClick={fetchDepartmentsSortedByName} className="btn btn-primary">
                            Fetch Departments
                        </button>
                        {loading && <p>Loading...</p>}
                        {message && <p className="text-danger">{message}</p>}
                        {departments.length > 0 && (
                            <div className="mt-4">
                                <h4>Departments List</h4>
                                <ul className="list-group">
                                    {departments.map((dept) => (
                                        <li key={dept.departmentId} className="list-group-item">
                                            <strong>ID:</strong> {dept.departmentId}, <strong>Name:</strong> {dept.departmentName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );
                    
        case 'getDepartmentByName(DESC)':
            return (
                <div className="mt-4">
                        <h3>Get Departments in Alphabetical Order (Desc)</h3>
                        <button onClick={fetchDepartmentsSortedByNameDesc} className="btn btn-primary">
                            Fetch Departments
                        </button>
                        {loading && <p>Loading...</p>}
                        {message && <p className="text-danger">{message}</p>}
                        {departments.length > 0 && (
                            <div className="mt-4">
                                <h4>Departments List</h4>
                                <ul className="list-group">
                                    {departments.map((dept) => (
                                        <li key={dept.departmentId} className="list-group-item">
                                            <strong>ID:</strong> {dept.departmentId}, <strong>Name:</strong> {dept.departmentName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
            );
        case 'viewPending/CompletedLeaves':
            return (
                <form className="mt-4">
                    <h3>View Pending/Completed Leaves</h3>
                    <div className="mb-3">
                        <label htmlFor="leaveStatus" className="form-label">Leave Status</label>
                    </div>
                </form>
            );
        case 'viewPendingStatusLeavesOfEmployee':
            return (
                <form className="mt-4">
                    <h3>View Pending Status Leaves of Employee</h3>
                    <div className="mb-3">
                    </div>
                </form>
            );
        case 'viewAllLeavesOfEmployee':
            return (
                <form className="mt-4">
                    <h3>View All Leaves of Employee</h3>
                </form>
            )
        default:
            return null;
    }
  };


  return (
    <div>
        {/* <Link to="/sign-in"> */}
            <h1>HR Home</h1>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('addDepartment')}>
                Add Department
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('addEmployee')}>
                Add Employee (via DepartmentID)
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('deleteEmployee')}>
                Delete Employee
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('getEmployeeByID')}>
                Get Employee by ID
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('getEmployeeByUsername')}>
                Get Employee by Username
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('viewYourProfile')}>
                View your profile
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('registerAnotherHR')}>
                Register Another HR
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('updatePassword')}>
                Update your password
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('getAllEmployees')}>
                Get All employees
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('changeEmployeeRole')}>
                Change employee Role
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('setEmployeeSalary')}>
                Set Employee's Salary
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('changeEmployeeDepartment')}>
                Change Employee's Department
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('updateDepartmentName')}>
                Update Department Name
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('deleteDepartment')}>
                Delete Department
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('getDepartmentbyID')}>
                Get Department by ID
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('getAllDepartments')}>
                Get All Departments
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('getDepartmentByName')}>
                Get Department by Name
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('getDepartmentByName(ASC)')}>
                Get Department by Name (ASC)
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('getDepartmentByName(DESC)')}>
                Get Department by Name  (DESC)
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('viewPending/CompletedLeaves')}>
                View Pending/Completed leaves
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('viewAllLeavesOfEmployee')}>
                View all leaves of the employee
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('viewPendingStatusLeavesOfEmployee')}>
                View pending status leaves of the employee
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('respondToLeave')}>
                Respond to a leave
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('assignIndividualWork')}>
                Assign Individual work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('deleteWork')}>
                Delete Work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('updateWork')}>
                Update work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('assignGroupWork')}>
                Assign group work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listAllWork')}>
                List all works
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listAllIndividualWork')}>
                List all Individual work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listAllGroupWork')}>
                List all Group work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listAllPendingWork')}>
                List all pending work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listIndividualPendingWork')}>
                List Individual Pending work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listGroupPendingWork')}>
                List Group Pending work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listAllCompletedWork')}>
                List All completed work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listAllIndividualCompletedWork')}>
                List Individual's completed work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listGroupCompletedWork')}>
                List Group's completed work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listIndividualsInCompletedWork')}>
                List Individuals in completed work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('ListGroupsInCompletedWork')}>
                List Groups in completed work
            </button>
            {renderForm()}
        {/* </Link> */}
    </div>
  );
}
