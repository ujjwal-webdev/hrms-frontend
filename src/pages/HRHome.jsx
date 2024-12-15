import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { handleViewYourProfile } from '../HRservices/ProfileService';
import { handleRegisterHR } from '../HRservices/ProfileService';
import { handleUpdatePassword } from '../HRservices/ProfileService';
import { handleAddEmployee } from '../HRservices/EmployeeService';
import { handleDeleteEmployee } from '../HRservices/EmployeeService';
import { handleGetEmployeeById } from '../HRservices/EmployeeService';
import { handleGetEmployeeByUsername } from '../HRservices/EmployeeService';
import { handleGetAllEmployees } from '../HRservices/EmployeeService';
import { handleEmployeeChangeRole } from '../HRservices/EmployeeService';
import { handleEmployeeChangeSalary } from '../HRservices/EmployeeService';
import { handleEmployeeChangeDepartment } from '../HRservices/EmployeeService';
import { fetchEmployeeSalaryDetails } from '../HRservices/EmployeeService';
import { fetchEmployeeEquipmentDetails } from '../HRservices/EmployeeService';
import { handleAddDepartment } from '../HRservices/DepartmentService';
import { handleUpdateDepartmentName } from '../HRservices/DepartmentService';
import { handleDeleteDepartment } from '../HRservices/DepartmentService';
import { handleGetDepartmentById } from '../HRservices/DepartmentService';
import { handleGetAllDepartments } from '../HRservices/DepartmentService';
import { handleGetDepartmentByName } from '../HRservices/DepartmentService';
import { fetchDepartmentsSortedByName } from '../HRservices/DepartmentService';
import { fetchDepartmentsSortedByNameDesc } from '../HRservices/DepartmentService';
import { fetchPendingLeaves } from '../HRservices/LeaveService';
import { fetchLeavesOfEmployee } from '../HRservices/LeaveService';
import { handleLeaveResponse } from '../HRservices/LeaveService';
import { handleAssignWork } from '../HRservices/WorkService';
import { handleDeleteWork } from '../HRservices/WorkService';
import { handleUpdateWork } from '../HRservices/WorkService';
import { handleAssignGroupWork } from '../HRservices/WorkService';
import { fetchAllWorks } from '../HRservices/WorkService';
import { fetchAllIndividualWorks } from '../HRservices/WorkService';
import { fetchAllGroupWorks } from '../HRservices/WorkService';
import { fetchAllPendingWorks } from '../HRservices/WorkService';
import { fetchIndividualPendingWorks } from '../HRservices/WorkService';
import { fetchGroupPendingWorks } from '../HRservices/WorkService';
import { fetchAllCompletedWorks } from '../HRservices/WorkService';
import { fetchAllIndividualCompletedWorks } from '../HRservices/WorkService';
import { fetchAllGroupCompletedWorks } from '../HRservices/WorkService';
import { fetchIndividualCompletedWorks } from '../HRservices/WorkService';
import { fetchGroupCompletedWorks } from '../HRservices/WorkService';
import { handleCreateJob } from '../HRservices/JobService';
import { handleGetJobById } from '../HRservices/JobService';
import { handleGetAllJobs } from '../HRservices/JobService';
import { handleDeleteJob } from '../HRservices/JobService';
import { handleFetchCandidates } from '../HRservices/CandidateService';
import { handleCandidateUpdateStatus } from '../HRservices/CandidateService';
import { handleGetCandidateById } from '../HRservices/CandidateService';
import { handleAssignEquipment } from '../HRservices/EmployeeService';
import { handleUnassignEquipment } from '../HRservices/EmployeeService';

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

const [pendingLeaves, setPendingLeaves] = useState([]);

const [leaves, setLeaves] = useState([]);

const [leaveResponse, setLeaveResponse] = useState({
    leaveId: '',
    status: '',
});
const [responseLeave, setResponseLeave] = useState(null);

const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeaveResponse((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const [workDetails, setWorkDetails] = useState({
    empId: '',
    name: '',
    description: '',
    endDate: ''
});

const handleWorkChange = (e) => {
    const { name, value } = e.target;
    setWorkDetails((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const [workId, setWorkId] = useState('');

const [updateWorkDetails, setUpdateWorkDetails] = useState({
    workId: '',
    name: '',
    description: '',
    endDate: ''
});

const handleWorkUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateWorkDetails((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const [groupWorkDetails, setGroupWorkDetails] = useState({
    leaderId: '',
    employeesId: '',
    workName: '',
    workDescription: '',
    endDate: '',
});

const handleGroupWorkDetailsInputChange = (e) => {
    const { name, value } = e.target;
    setGroupWorkDetails((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const [works, setWorks] = useState([]);

const [individualWorks, setIndividualWorks] = useState([]);

const [groupWorks, setGroupWorks] = useState([]);

const [pendingWorks, setPendingWorks] = useState([]);

const [individualPendingWorks, setIndividualPendingWorks] = useState([]);

const [groupPendingWorks, setGroupPendingWorks] = useState([]);

const [allCompletedWorks, setAllCompletedWorks] = useState([]);

const [allIndividualCompletedWorks, setAllIndividualCompletedWorks] = useState([]);

const [allGroupCompletedWorks, setAllGroupCompletedWorks] = useState([]);

const [individualCompletedWorks, setIndividualCompletedWorks] = useState([]);

const [groupCompletedWorks, setGroupCompletedWorks] = useState([]);

const [salaryDetails, setSalaryDetails] = useState([]);

const [equipmentDetails, setEquipmentDetails] = useState([]);

const [equipment, setEquipment] = useState({
    name: '',
    model: '',
    serialNumber: '',
    assignedDate: ''
});

const [equipmentId, setEquipmentId] = useState('');

const [job, setJob] = useState({
    position: '',
    description: '',
    experienceRequired: '',
});

const [jobId, setJobId] = useState('');

const [jobs, setJobs] = useState([]);

const [candidates, setCandidates] = useState([]);

const [candidateId, setCandidateId] = useState('');
const [status, setStatus] = useState('PENDING');
const [updatedCandidate, setUpdatedCandidate] = useState(null);

const [candidate, setCandidate] = useState(null);

// const handleAddDepartment = async (e) => {
//     e.preventDefault();

//     try {
//         const response = await axios.post(
//         "http://localhost:8896/admin/departments",
//         { departmentName },
//         {
//             headers: {
//             Authorization: localStorage.getItem('authToken'),
//             "Content-Type": "application/json",
//             },
//         }
//         );
//         setMessage(`Department added successfully: ${response.data.departmentName}`);
//     } catch (error) {
//         setMessage(
//         error.response?.data?.message || "An error occurred while adding the department."
//         );
//     }
// };

// const handleAddEmployee = async (e) => {
//     e.preventDefault();

//     const employeeData = {
//         name: document.getElementById("employeeName").value,
//         role: document.getElementById("role").value,
//         gender: document.getElementById("gender").value,
//         salary: parseFloat(document.getElementById("salary").value),
//         phoneNo: document.getElementById("phoneNo").value,
//         dateOfBirth: document.getElementById("dateOfBirth").value,
//         email: document.getElementById("email").value
//     };

//     const departmentId = document.getElementById("departmentId").value;

//     try {
//         const token = localStorage.getItem("authToken"); // Retrieve stored token

//         const response = await axios.post(
//             `http://localhost:8896/admin/employees/${departmentId}`,
//             employeeData,
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//         setMessage(`Employee added successfully`);
//         document.getElementById("addEmployeeForm").reset();
//     } catch (error) {
//         setMessage(
//             error.response?.data?.message || "An error occurred while adding the employee."
//         );
//     }
// };

// const handleDeleteEmployee = async (e) => {
//     e.preventDefault();

//     if (!employeeId) {
//         alert("Please enter an Employee ID.");
//         return;
//     }

//     if (window.confirm(`Are you sure you want to delete employee with ID ${employeeId}?`)) {
//         try {
//             const token = localStorage.getItem("authToken");
//             const response = await axios.delete(
//                 `http://localhost:8896/admin/employees/${employeeId}`,
//                 {
//                     headers: {
//                         Authorization: token,
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );
//             setMessage(`Employee deleted successfully`);
//             setEmployeeId(""); // Clear the form field
//         } catch (error) {
//             setMessage(
//                 error.response?.data?.message || "An error occurred while adding the employee."
//             );
//         }
//     }
// };

// const handleGetEmployeeById = async (e) => {    
//     e.preventDefault();

//     try {
//         setLoading(true);
//         setEmployeeData(null);
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(`http://localhost:8896/admin/employees/byEmployeeId/${employeeId}`, {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             }
//         });

//         // console.log(response)

//         setEmployeeData(response.data);
//         setLoading(false);
//         // setMessage(`Employee fetched successfully: ${JSON.stringify(response.data)}`);
//     }
//     catch (error) {
//         console.log(error.response.data.message)
//         setEmployeeData(null);
//         setLoading(false);
//         setMessage(error.response.data.message);
//     }
// };

// const handleGetEmployeeByUsername = async (e) => { 
//     e.preventDefault();

//     try {
//         setLoading(true);
//         setEmployeeData(null);
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(`http://localhost:8896/admin/employees/byUserName/${username}`, {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });

//         setEmployeeData(response.data);
//         setLoading(false);
//         // setMessage(`Employee fetched successfully: ${JSON.stringify(response.data)}`);
//     } 
//     catch (error) {
//         setEmployeeData(null);
//         setLoading(false);
//         setMessage(`Error fetching employee: ${error.response?.data?.message || error.message}`);
//     }
// };

// const handleViewYourProfile = async (e) => {
//     e.preventDefault();

//     try {
//         setLoading(true);
//         setEmployeeData(null);
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(`http://localhost:8896/admin/viewProfile`, {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });

//         setEmployeeData(response.data);
//         setLoading(false);
//         // setMessage(`Employee fetched successfully: ${JSON.stringify(response.data)}`);
//     }
//     catch(error) {
//         setEmployeeData(null);
//         setLoading(false);
//         setMessage(`Error fetching employee: ${error.response?.data?.message || error.message}`);
//     }
// };

// const handleRegisterHR = async (e) => {
//     e.preventDefault();

//     try
//     {
//         setLoading(true);
//         setEmployeeData(null);
//         const token = localStorage.getItem("authToken");
//         const response = await axios.post(`http://localhost:8896/admin/registerAdmin`,
//             hrFormData, 
//             {
//             headers:{
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             }
//             });
//             setMessage("Successful")
//     }
//     catch(error)
//     {
//         setHRFormData(null)
//         setLoading(false);
//         setMessage(`Error registering HR`);
//     }
// }

// const handleUpdatePassword = async (e) => {
//     e.preventDefault();
    
//     try
//     {
//         setLoading(true);
//         setEmployeeData(null);
//         const token = localStorage.getItem("authToken");
//         const response = await axios.put(`http://localhost:8896/admin/updatePassword`,
//             updatePasswordFormData,
//             {
//                 headers:{
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 }
//             }
//         )
//         setMessage("Successful");
//     }
//     catch(error)
//     {
//         setUpdatePasswordFormData(null)
//         setLoading(false)
//         setMessage(`Error updating password`);
//     }
// }

// const handleGetAllEmployees = async (e) => {
//     e.preventDefault();
//     try
//     {
//         setLoading(true);
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(`http://localhost:8896/admin/employees`,
//             {
//                 headers:{
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 }
//             }
//         )
//         setAllEmployees(response.data)
//     }
//     catch(error)
//     {
//         setMessage(`Error getting all employees`);
//     }
// }

// const handleEmployeeChangeRole = async (e) => {
//     e.preventDefault();
//     try
//     {
//         setLoading(true);
//         const token = localStorage.getItem("authToken");
//         const response = await axios.patch(`http://localhost:8896/admin/employees/setNewRole/${changeRole.employeeId}/${changeRole.newRole}`,
//             {},{
//                 headers:{
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 }
//             }
//         );
//         // setChangeRole(null);
//         setMessage("Successful");
//     }
//     catch(error)
//     {
//         setMessage(`error: ${error.message}`);
//     }
// }

// const handleEmployeeChangeSalary = async (e) => {
//     e.preventDefault();
//     try
//     {
//         setLoading(true);
//         const token = localStorage.getItem("authToken");
//         const response = await axios.patch(`http://localhost:8896/admin/employees/setNewSalary/${changeSalary.employeeId}/${changeSalary.employeeSalary}/${changeSalary.bonusThatYear}/${changeSalary.benefitPoints}`,
//             {},{
//                 headers:{
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 }
//             }
//         );
//         // setChangeRole(null);
//         setMessage("Successful");
//     }
//     catch(error)
//     {
//         setMessage(`error: ${error.message}`);
//     }
// }

// const handleEmployeeChangeDepartment = async (e) => {
//     e.preventDefault();
//     try
//     {
//         setLoading(true);
//         const token = localStorage.getItem("authToken");
//         const response = await axios.patch(`http://localhost:8896/admin/employees/setNewDepartment/${changeDepartment.employeeId}/${changeDepartment.departmentId}`,
//             {},{
//                 headers:{
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 }
//             }
//         );
//         // setChangeRole(null);
//         setMessage("Successful");
//     }
//     catch(error)
//     {
//         setMessage(`error: ${error.message}`);
//     }
// }

// const handleUpdateDepartmentName = async (e) => {
//     e.preventDefault();
//     try {
//         setLoading(true);

//         const token = localStorage.getItem("authToken");
//         const response = await axios.put(
//             `http://localhost:8896/admin/departments/${updateDept.deptId}`,
//             {
//                 departmentName: updateDept.newDeptName, 
//             },
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         setUpdateDept({
//             deptId: '',
//             newDeptName: '',
//         });

//         setMessage(`Department updated successfully`);
//     } catch (error) {
//         setMessage(
//             `Error`
//         );
//     } finally {
//         setLoading(false);
//     }
// };

// const handleDeleteDepartment = async (e) => {
//     e.preventDefault();
//     try {
//         setLoading(true);

//         const token = localStorage.getItem("authToken");
//         const response = await axios.delete(
//             `http://localhost:8896/admin/departments/${deleteDept.deptId}`,
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         setDeleteDept({
//             deptId: '',
//         });

//         setMessage(`Department deleted successfully`);
//     } catch (error) {
//         setMessage(
//             `Error`
//         );
//     } finally {
//         setLoading(false);
//     }
// };

// const handleGetDepartmentById = async (e) => {
//     e.preventDefault();
//     try {
//         setLoading(true);
//         setMessage('');
//         setDepartment(null);

//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(
//             `http://localhost:8896/admin/departments/${departmentId}`,
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         setDepartment(response.data);
//     } catch (error) {
//         setMessage(
//             `Error`
//         );
//     } finally {
//         setLoading(false);
//     }
// };

// const handleGetAllDepartments = async () => {
//     try {
//         setLoading(true);
//         setMessage('');
//         setDepartments([]);

//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(
//             `http://localhost:8896/admin/departments`,
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         setDepartments(response.data);
//     } catch (error) {
//         setMessage(
//             `Error: ${error.response?.data?.message || error.message}`
//         );
//     } finally {
//         setLoading(false);
//     }
// };

// const handleGetDepartmentByName = async (e) => {
//     e.preventDefault();
//     try {
//         setLoading(true);
//         setMessage('');
//         setDepartment(null);

//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(
//             `http://localhost:8896/admin/departments/name/${departmentName}`,
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         setDepartment(response.data);
//     } catch (error) {
//         setMessage(
//             `Error`
//         );
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchDepartmentsSortedByName = async (e) => {
//     e.preventDefault();
//     try {
//         setLoading(true);
//         setMessage('');
//         setDepartment(null);

//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(
//             `http://localhost:8896/admin/departments/sortByNameAsc`,
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         setDepartments(response.data);
//     } catch (error) {
//         setMessage(
//             `Error`
//         );
//     } finally {
//         setLoading(false);
//     }
// }

// const fetchDepartmentsSortedByNameDesc = async (e) => {
//     e.preventDefault();
//     try {
//         setLoading(true);
//         setMessage('');
//         setDepartment(null);

//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(
//             `http://localhost:8896/admin/departments/sortByNameDesc`,
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         setDepartments(response.data);
//     } catch (error) {
//         setMessage(
//             `Error`
//         );
//     } finally {
//         setLoading(false);
//     }
// }

// const fetchAllLeaves = async () => {    //Need to test
//     try {
//         setLoading(true);
//         setMessage('');
//         setLeaves([]);

//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(`http://localhost:8896/admin/allLeaves`, {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });

//         setLeaves(response.data);
//         setMessage("Leave history fetched successfully.");
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchPendingLeaves = async () => {    //need to test
//     try {
//         setLoading(true);
//         setMessage('');
//         setPendingLeaves([]);

//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(`http://localhost:8896/admin/allPendingLeaves`, {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });

//         setPendingLeaves(response.data);
//         setMessage("Pending leaves fetched successfully.");
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchLeavesOfEmployee = async (e) => {    //need to test
//     e.preventDefault();
//     try {
//         setLoading(true);
//         setMessage('');
//         setLeaves([]);

//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             throw new Error("Authentication token is missing. Please log in again.");
//         }

//         const response = await axios.get(`http://localhost:8896/admin/allLeaves/${employeeId}`, {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });

//         setLeaves(response.data);
//         setMessage("Leaves fetched successfully.");
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const handleLeaveResponse = async (e) => {  //need to test
//     e.preventDefault();
//     try {
//         setLoading(true);
//         setMessage('');
//         setResponseLeave(null);

//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             throw new Error("Authentication token is missing. Please log in again.");
//         }

//         const { leaveId, status } = leaveResponse;

//         const response = await axios.patch(
//             `http://localhost:8896/admin/response/${leaveId}/${status}`,
//             {},
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         setResponseLeave(response.data);
//         setMessage("Response submitted successfully.");
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const handleAssignWork = async (e) => {
//     e.preventDefault();
//     try {
//         setLoading(true);
//         setMessage('');

//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             throw new Error("Authentication token is missing. Please log in again.");
//         }

//         const { empId, name, description, endDate } = workDetails;

//         const response = await axios.post(
//             `http://localhost:8896/admin/work/${empId}`,
//             { name, description, endDate },
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         setMessage(response.data || "Work assigned successfully.");
//         setWorkDetails({ empId: '', name: '', description: '', endDate: '' });
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const handleDeleteWork = async (e) => {
//     e.preventDefault();
//     try {
//         setLoading(true);
//         // setError(false);
//         setMessage('');

//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             throw new Error("Authentication token is missing. Please log in again.");
//         }

//         const response = await axios.delete(`http://localhost:8896/admin/work/${workId}`, {
//             headers: {
//                 Authorization: token,
//             },
//         });

//         setMessage("Work deleted successfully.");
//         setWorkId('');
//     } catch (error) {
//         // setError(true);
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const handleUpdateWork = async (e) => {
//     e.preventDefault();
//     try {
//         setLoading(true);
//         // setError(false);
//         setMessage('');

//         const { workId, ...workData } = updateWorkDetails;

//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             throw new Error("Authentication token is missing. Please log in again.");
//         }

//         const response = await axios.put(`http://localhost:8896/admin/work/${workId}`, workData, {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });

//         setMessage("Work updated successfully.");
//         setUpdateWorkDetails({
//             workId: '',
//             name: '',
//             description: '',
//             endDate: ''
//         });
//     } catch (error) {
//         // setError(true);
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const handleAssignGroupWork = async (e) => {
//     e.preventDefault();
//     try {
//         setLoading(true);
//         // setError(false);
//         setMessage('');

//         const { leaderId, employeesId, workName, workDescription, endDate } = groupWorkDetails;

//         // Prepare the payload
//         const payload = {
//             leaderId: parseInt(leaderId),
//             employeesId: employeesId.split(',').map((id) => parseInt(id.trim())),
//             work: {
//                 name: workName,
//                 description: workDescription,
//                 endDate,
//             },
//         };

//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             throw new Error("Authentication token is missing. Please log in again.");
//         }

//         const response = await axios.post("http://localhost:8896/admin/work", payload, {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });

//         setMessage("Work assigned successfully.");
//         setGroupWorkDetails({
//             leaderId: '',
//             employeesId: '',
//             workName: '',
//             workDescription: '',
//             endDate: '',
//         });
//     } catch (error) {
//         // setError(true);
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchAllWorks = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get("http://localhost:8896/admin/allWorks", {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         console.log(response.data)
//         setWorks(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchAllIndividualWorks = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get("http://localhost:8896/admin/allIndividualWorks", {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setIndividualWorks(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchAllGroupWorks = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get("http://localhost:8896/admin/allGroupWorks", {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setGroupWorks(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchAllPendingWorks = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get("http://localhost:8896/admin/allPendingWorks", {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setPendingWorks(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchIndividualPendingWorks = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get("http://localhost:8896/admin/allIndividualPendingWorks", {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setIndividualPendingWorks(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchGroupPendingWorks = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get("http://localhost:8896/admin/allGroupPendingWorks", {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setGroupPendingWorks(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchAllCompletedWorks = async () => {    //need to test
//     setLoading(true);
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get("http://localhost:8896/admin/allCompletedWorks", {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setAllCompletedWorks(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchAllIndividualCompletedWorks = async () => {    //need to test
//     setLoading(true);
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get("http://localhost:8896/admin/allIndividualCompletedWorks", {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setAllIndividualCompletedWorks(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchAllGroupCompletedWorks = async () => {    //need to test
//     setLoading(true);
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get("http://localhost:8896/admin/allGroupCompletedWorks", {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setAllGroupCompletedWorks(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchIndividualCompletedWorks = async () => { //Need to test
//     setLoading(true);
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get("http://localhost:8896/admin/allIndividualInCompletedWorks", {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setIndividualCompletedWorks(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchGroupCompletedWorks = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get("http://localhost:8896/admin/allGroupInCompletedWorks", {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setGroupCompletedWorks(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchEmployeeSalaryDetails = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
//     setSalaryDetails([]);
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(`http://localhost:8896/admin/employees/salaryInfo/${employeeId}`, {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setSalaryDetails(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchEmployeeEquipmentDetails = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
//     setEquipmentDetails([]);
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(`http://localhost:8896/admin/employees/equipmentInfo/${employeeId}`, {
//             headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//             },
//         });
//         setEquipmentDetails(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//         setLoading(false);
//     }
// };

// const handleAssignEquipment = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.post(
//             `http://localhost:8896/admin/equipments/${employeeId}`,
//             equipment,
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//         setMessage(`Success: ${response.data}`);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     }
// };

// const handleUnassignEquipment = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.delete(
//             `http://localhost:8896/admin/equipments/${equipmentId}`,
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//         setMessage(`Success: Equipment unassigned successfully!`);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     }
// };

// const handleCreateJob = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.post(
//             "http://localhost:8896/admin/jobs/createJob",
//             job,
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": "application/json"
//                 },
//             }
//         );
//         setMessage(`Success: Job created successfully with ID ${response.data.jobId}`);
//         setJob({ position: '', description: '', experienceRequired: '' });
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     }
// };

// const handleGetJobById = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setJob(null);
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(`http://localhost:8896/admin/jobs/getJobById/${jobId}`, {
//             headers: {
//                 Authorization: token,
//             },
//         });
//         setJob(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     }
// };

// const handleGetAllJobs = async () => {
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get('http://localhost:8896/admin/jobs/getAllJobs', {
//             headers: {
//                 Authorization: token,
//             },
//         });
//         setJobs(response.data);
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     }
// };

// const handleDeleteJob = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         await axios.delete(`http://localhost:8896/admin/jobs/deleteJob/${jobId}`, {
//             headers: {
//                 Authorization: token,
//             },
//         });
//         setMessage('Job deleted successfully!');
//         setJobId(''); // Clear input field after success
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     }
// };

// const handleFetchCandidates = async () => {
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(`http://localhost:8896/candidate/job/${jobId}`, {
//             headers: {
//                 Authorization: token,
//             },
//         });
//         setCandidates(response.data); // Set candidates data in state
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     }
// };

// const handleCandidateUpdateStatus = async () => {
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.put(
//             `http://localhost:8896/candidate/status/${candidateId}?status=${status}`, 
//             {},
//             {
//                 headers: {
//                     Authorization: token,
//                 },
//             }
//         );
//         setUpdatedCandidate(response.data); // Set updated candidate details
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     }
// };

// const handleGetCandidateById = async () => {
//     setMessage('');
//     try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(
//             `http://localhost:8896/candidate/getCandidateById/${candidateId}`,
//             {
//                 headers: {
//                     Authorization: token,
//                 },
//             }
//         );
//         setCandidate(response.data); // Set candidate details
//     } catch (error) {
//         setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     }
// };

  const renderForm = () => {
    switch (selectedFeature) {
        case 'addDepartment':
            return (
                <div className="mt-4">
                  <h3>Add Department</h3>
                  <form onSubmit={(e)=>handleAddDepartment (e, setMessage, departmentName)}>
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
                <form id="addEmployeeForm" className="mt-4" onSubmit={(e) => handleAddEmployee(e, setMessage)}>
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
                <form className="mt-4" onSubmit={(e) => handleDeleteEmployee(e, setMessage, employeeId,setEmployeeId)}>
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
                    <form className="mt-4" onSubmit={(e) => handleGetEmployeeById(e, setMessage, employeeId, setEmployeeData, setLoading)}>
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
                    <form className="mt-4" onSubmit={(e) => handleGetEmployeeByUsername (e, setMessage, username, setEmployeeData, setLoading)}>
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

                    <form className="mt-4" onSubmit={(e) => handleViewYourProfile (e, setMessage, setEmployeeData, setLoading)}>
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
                <form onSubmit={(e) => handleRegisterHR (e, setMessage, setLoading, hrFormData, setEmployeeData, setHRFormData)} className="border p-4 rounded shadow">
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
                <form onSubmit={(e) => handleUpdatePassword (e, setMessage, setLoading, updatePasswordFormData, setEmployeeData, setUpdatePasswordFormData)} className="mt-4 border p-4 rounded shadow">
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
                        <button className="btn btn-primary" onClick={(e) => handleGetAllEmployees(e, setMessage, setLoading, setAllEmployees)}>Get all employees</button>
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
                <form onSubmit={(e) => handleEmployeeChangeRole (e, setMessage, setLoading, changeRole)} className="border p-4 rounded shadow mt-4">
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
                <form onSubmit={(e) => handleEmployeeChangeSalary (e, setMessage, setLoading, changeSalary)} className="border p-4 rounded shadow mt-4">
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
                <form onSubmit={(e) => handleEmployeeChangeDepartment (e, setMessage, setLoading, changeDepartment)} className="border p-4 rounded shadow mt-4">
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
                <form onSubmit={(e) => handleUpdateDepartmentName (e, setMessage, setLoading, updateDept, setUpdateDept)} className="border p-4 rounded shadow mt-4">
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
                <form onSubmit={(e) => handleDeleteDepartment (e, setMessage, setLoading, deleteDept, setDeleteDept)} className="border p-4 rounded shadow mt-4">
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
                <form onSubmit={(e) => handleGetDepartmentById (e, setMessage, setLoading, departmentId, setDepartmentId, setDepartment)} className="border p-4 rounded shadow mt-4">
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
                        onClick={() => handleGetAllDepartments (setLoading, setMessage, setDepartments) }
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
                        <form onSubmit={(e) => handleGetDepartmentByName (e, setLoading, setMessage, departmentName, setDepartment) } className="border p-4 rounded shadow">
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
                        <button onClick={(e) => fetchDepartmentsSortedByName (e, setLoading, setMessage, setDepartments)} className="btn btn-primary">
                            Fetch Departments
                        </button>
                        {loading && <p>Loading...</p>}
                        {message && <p className="text-danger">{message}</p>}
                        {departments && departments.length > 0 && (
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
                        <button onClick={(e) => fetchDepartmentsSortedByNameDesc (e, setLoading, setMessage, setDepartments)} className="btn btn-primary">
                            Fetch Departments
                        </button>
                        {loading && <p>Loading...</p>}
                        {message && <p className="text-danger">{message}</p>}
                        {departments && departments.length > 0 && (
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
                <div className="mt-4">
                    <h3>View Pending/Completed Leaves</h3>
                    <button onClick={fetchAllLeaves} className="btn btn-primary">
                        Fetch Leave History
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p className="text-danger">{message}</p>}
                    {leaves.length > 0 && (
                        <div className="mt-4">
                            <h4>Leave History</h4>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Employee Name</th>
                                        <th>Leave Status</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaves.map((leave) => (
                                        <tr key={leave.leaveId}>
                                            <td>{leave.leaveId}</td>
                                            <td>{leave.employeeName}</td>
                                            <td>{leave.status}</td>
                                            <td>{leave.startDate}</td>
                                            <td>{leave.endDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            );
            
        case 'viewPendingStatusLeavesOfEmployee':
            return (
                <div className="mt-4">
                    <h3>View Pending Leaves</h3>
                    <button onClick={fetchPendingLeaves(setMessage, setLoading, setPendingLeaves)} className="btn btn-primary">
                        Fetch Pending Leaves
                    </button>
                    {/* {loading && <p>Loading...</p>}
                    {message && <p className="text-danger">{message}</p>} */}
                    {pendingLeaves.length > 0 && (
                        <div className="mt-4">
                            <h4>Pending Leaves</h4>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Employee Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingLeaves.map((leave) => (
                                        <tr key={leave.leaveId}>
                                            <td>{leave.leaveId}</td>
                                            <td>{leave.employeeName}</td>
                                            <td>{leave.startDate}</td>
                                            <td>{leave.endDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            );
                
        case 'viewAllLeavesOfEmployee':
            return (
                <div className="mt-4">
                    <h3>View Leaves of an Employee</h3>
                    <form onSubmit={(e) => fetchLeavesOfEmployee (e, setMessage, setLoading, setLeaves)} className="border p-4 rounded shadow">
                        <div className="mb-3">
                            <label className="form-label">Employee ID</label>
                            <input
                                type="number"
                                name="employeeId"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="form-control"
                                placeholder="Enter Employee ID"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Fetch Leaves
                        </button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {message && <p className="text-danger">{message}</p>}
                    {leaves.length > 0 && (
                        <div className="mt-4">
                            <h4>Leave History</h4>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Leave ID</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                        <th>Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaves.map((leave) => (
                                        <tr key={leave.leaveId}>
                                            <td>{leave.leaveId}</td>
                                            <td>{leave.startDate}</td>
                                            <td>{leave.endDate}</td>
                                            <td>{leave.status}</td>
                                            <td>{leave.reason}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            );

        case 'respondToLeave':
            return (
                <div className="mt-4">
                    <h3>Respond to Leave Request</h3>
                    <form onSubmit={(e) => handleLeaveResponse (e, setMessage, setLoading, setResponseLeave)} className="border p-4 rounded shadow">
                        <div className="mb-3">
                            <label className="form-label">Leave ID</label>
                            <input
                                type="number"
                                name="leaveId"
                                value={leaveResponse.leaveId}
                                onChange={handleLeaveChange}
                                className="form-control"
                                placeholder="Enter Leave ID"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Response Status</label>
                            <select
                                name="status"
                                value={leaveResponse.status}
                                onChange={handleLeaveChange}
                                className="form-select"
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="APPROVED">APPROVED</option>
                                <option value="REJECTED">REJECTED</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit Response
                        </button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {message && <p className="text-danger">{message}</p>}
                    {responseLeave && (
                        <div className="mt-4">
                            <h4>Leave Response Details</h4>
                            <p><strong>Leave ID:</strong> {responseLeave.leaveId}</p>
                            <p><strong>Status:</strong> {responseLeave.status}</p>
                            <p><strong>Reason:</strong> {responseLeave.reason}</p>
                        </div>
                    )}
                </div>
            );

        case 'assignIndividualWork':
            return (
                <div className="mt-4">
                    <h3>Assign Individual Work</h3>
                    <form onSubmit={(e) => handleAssignWork (e, setMessage, setLoading, setWorkDetails)} className="border p-4 rounded shadow">
                        <div className="mb-3">
                            <label className="form-label">Employee ID</label>
                            <input
                                type="number"
                                name="empId"
                                value={workDetails.empId}
                                onChange={handleWorkChange}
                                className="form-control"
                                placeholder="Enter Employee ID"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Work name</label>
                            <input
                                type="text"
                                name="name"
                                value={workDetails.name}
                                onChange={handleWorkChange}
                                className="form-control"
                                placeholder="Enter Work name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Work Description</label>
                            <textarea
                                name="description"
                                value={workDetails.description}
                                onChange={handleWorkChange}
                                className="form-control"
                                placeholder="Enter Work Description"
                                rows="3"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>End Date</label>
                            <input
                                name='endDate'
                                value={workDetails.endDate}
                                onChange={handleWorkChange}
                                className='form-control'
                                placeholder='Enter end date'
                                type='date'
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Assign Work
                        </button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {message && <p className="text-danger">{message}</p>}
                </div>
            );
        
        case 'deleteWork':
            return (
                <div className="mt-4">
                    <h3>Delete Work</h3>
                    <form onSubmit={(e) => handleDeleteWork (e, setMessage, setLoading, setWorkId)} className="border p-4 rounded shadow">
                        <div className="mb-3">
                            <label className="form-label">Work ID</label>
                            <input
                                type="number"
                                name="workId"
                                value={workId}
                                onChange={(e) => setWorkId(e.target.value)}
                                className="form-control"
                                placeholder="Enter Work ID"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-danger">
                            Delete Work
                        </button>
                    </form>
                    {loading && <p>Loading...</p>}
                    <p>{message}</p>
                </div>
            );

        case 'updateWork':
            return (
                <div className="mt-4">
                    <h3>Update Work</h3>
                    <form onSubmit={(e) => handleUpdateWork (e, setMessage, setLoading, setUpdateWorkDetails) } className="border p-4 rounded shadow">
                        <div className="mb-3">
                            <label className="form-label">Work ID</label>
                            <input
                                type="number"
                                name="workId"
                                value={updateWorkDetails.workId}
                                onChange={handleWorkUpdateInputChange}
                                className="form-control"
                                placeholder="Enter Work ID"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Work name</label>
                            <input
                                type="text"
                                name="name"
                                value={updateWorkDetails.name}
                                onChange={handleWorkUpdateInputChange}
                                className="form-control"
                                placeholder="Enter Work name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Work Description</label>
                            <textarea
                                name="description"
                                value={updateWorkDetails.description}
                                onChange={handleWorkUpdateInputChange}
                                className="form-control"
                                placeholder="Enter Work Description"
                                rows="3"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>End Date</label>
                            <input
                                name='endDate'
                                value={updateWorkDetails.endDate}
                                onChange={handleWorkUpdateInputChange}
                                className='form-control'
                                placeholder='Enter end date'
                                type='date'
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update Work
                        </button>
                    </form>
                    {loading && <p>Loading...</p>}
                    <p>{message}</p>
                </div>
            );

        case 'assignGroupWork':
            return (
                <div className="mt-4">
                    <h3>Assign Group Work</h3>
                    <form onSubmit={(e) => handleAssignGroupWork (e, setLoading, setMessage, setGroupWorkDetails)} className="border p-4 rounded shadow">
                        <div className="mb-3">
                            <label className="form-label">Leader ID</label>
                            <input
                                type="number"
                                name="leaderId"
                                value={groupWorkDetails.leaderId}
                                onChange={handleGroupWorkDetailsInputChange}
                                className="form-control"
                                placeholder="Enter Leader ID"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Employee IDs (Comma Separated)</label>
                            <input
                                type="text"
                                name="employeesId"
                                value={groupWorkDetails.employeesId}
                                onChange={handleGroupWorkDetailsInputChange}
                                className="form-control"
                                placeholder="e.g., 3,8,9"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Work Name</label>
                            <input
                                type="text"
                                name="workName"
                                value={groupWorkDetails.workName}
                                onChange={handleGroupWorkDetailsInputChange}
                                className="form-control"
                                placeholder="Enter Work Name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Work Description</label>
                            <textarea
                                name="workDescription"
                                value={groupWorkDetails.workDescription}
                                onChange={handleGroupWorkDetailsInputChange}
                                className="form-control"
                                placeholder="Enter Work Description"
                                rows="3"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">endDate</label>
                            <input
                                type="date"
                                name="endDate"
                                value={groupWorkDetails.endDate}
                                onChange={handleGroupWorkDetailsInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Assign Work</button>
                    </form>
                    {loading && <p>Loading...</p>}
                    <p>{message}</p>
                </div>
            );
            
        case 'listAllWork':
            return (
                <div className="mt-4">
                    <h3>All Works</h3>
                    <button onClick={fetchAllWorks (setLoading, setMessage, setWorks)} className="btn btn-primary mb-3">
                        Load Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {works.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Work ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Leader ID</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Work Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {works.map((work) => (
                                    <tr key={work.workId}>
                                        <td>{work.workId}</td>
                                        <td>{work.name || "N/A"}</td>
                                        <td>{work.description}</td>
                                        <td>{work.leaderId}</td>
                                        <td>{work.startDate}</td>
                                        <td>{work.endDate || "N/A"}</td>
                                        <td>{work.workType}</td>
                                        <td>{work.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );

        case 'listAllIndividualWork':
            return (
                <div className="mt-4">
                    <h3>All Individual Works</h3>
                    <button onClick={fetchAllIndividualWorks (setLoading, setMessage, setIndividualWorks)} className="btn btn-primary mb-3">
                        Load Individual Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {individualWorks.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Work ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Leader ID</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Work Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {individualWorks.map((work) => (
                                    <tr key={work.workId}>
                                        <td>{work.workId}</td>
                                        <td>{work.name || "N/A"}</td>
                                        <td>{work.description}</td>
                                        <td>{work.leaderId}</td>
                                        <td>{work.startDate}</td>
                                        <td>{work.endDate || "N/A"}</td>
                                        <td>{work.workType}</td>
                                        <td>{work.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );
                        
        case 'listAllGroupWork':
            return (
                <div className="mt-4">
                    <h3>All Group Works</h3>
                    <button onClick={fetchAllGroupWorks (setMessage, setLoading, setGroupWorks)} className="btn btn-primary mb-3">
                        Load Group Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {groupWorks.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Work ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Leader ID</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Work Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupWorks.map((work) => (
                                    <tr key={work.workId}>
                                        <td>{work.workId}</td>
                                        <td>{work.name || "N/A"}</td>
                                        <td>{work.description}</td>
                                        <td>{work.leaderId}</td>
                                        <td>{work.startDate}</td>
                                        <td>{work.endDate || "N/A"}</td>
                                        <td>{work.workType}</td>
                                        <td>{work.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );

        case 'listAllPendingWork':
            return (
                <div className="mt-4">
                    <h3>All Pending Works</h3>
                    <button onClick={fetchAllPendingWorks (setLoading, setMessage, setPendingWorks)} className="btn btn-primary mb-3">
                        Load Pending Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {pendingWorks.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Work ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Leader ID</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Work Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingWorks.map((work) => (
                                    <tr key={work.workId}>
                                        <td>{work.workId}</td>
                                        <td>{work.name || "N/A"}</td>
                                        <td>{work.description}</td>
                                        <td>{work.leaderId}</td>
                                        <td>{work.startDate}</td>
                                        <td>{work.endDate || "N/A"}</td>
                                        <td>{work.workType}</td>
                                        <td>{work.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );
            
        case 'listIndividualPendingWork':
            return (
                <div className="mt-4">
                    <h3>All Individual Pending Works</h3>
                    <button onClick={fetchIndividualPendingWorks (setLoading, setMessage, setIndividualPendingWorks)} className="btn btn-primary mb-3">
                        Load Individual Pending Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {individualPendingWorks.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Work ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Leader ID</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Work Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {individualPendingWorks.map((work) => (
                                    <tr key={work.workId}>
                                        <td>{work.workId}</td>
                                        <td>{work.name || "N/A"}</td>
                                        <td>{work.description}</td>
                                        <td>{work.leaderId}</td>
                                        <td>{work.startDate}</td>
                                        <td>{work.endDate || "N/A"}</td>
                                        <td>{work.workType}</td>
                                        <td>{work.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );

        case 'listGroupPendingWork':
            return (
                <div className="mt-4">
                    <h3>All Group Pending Works</h3>
                    <button onClick={fetchGroupPendingWorks (setLoading, setMessage, setGroupPendingWorks)} className="btn btn-primary mb-3">
                        Load Group Pending Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {groupPendingWorks.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Work ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Leader ID</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Work Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupPendingWorks.map((work) => (
                                    <tr key={work.workId}>
                                        <td>{work.workId}</td>
                                        <td>{work.name || "N/A"}</td>
                                        <td>{work.description}</td>
                                        <td>{work.leaderId}</td>
                                        <td>{work.startDate}</td>
                                        <td>{work.endDate || "N/A"}</td>
                                        <td>{work.workType}</td>
                                        <td>{work.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );

        case 'listAllCompletedWork':
            return (
                <div className="mt-4">
                    <h3>All Completed Works</h3>
                    <button onClick={fetchAllCompletedWorks (setLoading, setMessage, setAllCompletedWorks)} className="btn btn-primary mb-3">
                        Load All Completed Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {allCompletedWorks.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Work ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Leader ID</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Work Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allCompletedWorks.map((work) => (
                                    <tr key={work.workId}>
                                        <td>{work.workId}</td>
                                        <td>{work.name || "N/A"}</td>
                                        <td>{work.description}</td>
                                        <td>{work.leaderId}</td>
                                        <td>{work.startDate}</td>
                                        <td>{work.endDate || "N/A"}</td>
                                        <td>{work.workType}</td>
                                        <td>{work.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );
            
        case 'listAllIndividualCompletedWork':
            return (
                <div className="mt-4">
                    <h3>All Individual Completed Works</h3>
                    <button onClick={fetchAllIndividualCompletedWorks (setLoading, setMessage, setAllIndividualCompletedWorks) } className="btn btn-primary mb-3">
                        Load All Individual Completed Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {allIndividualCompletedWorks.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Work ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Leader ID</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Work Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allIndividualCompletedWorks.map((work) => (
                                    <tr key={work.workId}>
                                        <td>{work.workId}</td>
                                        <td>{work.name || "N/A"}</td>
                                        <td>{work.description}</td>
                                        <td>{work.leaderId}</td>
                                        <td>{work.startDate}</td>
                                        <td>{work.endDate || "N/A"}</td>
                                        <td>{work.workType}</td>
                                        <td>{work.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );

        case 'listAllGroupCompletedWork':
            return (
                <div className="mt-4">
                    <h3>All Group Completed Works</h3>
                    <button onClick={fetchAllGroupCompletedWorks (setLoading, setMessage, setAllGroupCompletedWorks) } className="btn btn-primary mb-3">
                        Load All Group Completed Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {allIndividualCompletedWorks.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Work ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Leader ID</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Work Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allGroupCompletedWorks.map((work) => (
                                    <tr key={work.workId}>
                                        <td>{work.workId}</td>
                                        <td>{work.name || "N/A"}</td>
                                        <td>{work.description}</td>
                                        <td>{work.leaderId}</td>
                                        <td>{work.startDate}</td>
                                        <td>{work.endDate || "N/A"}</td>
                                        <td>{work.workType}</td>
                                        <td>{work.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );

        case 'listIndividualsInCompletedWork':
            return (
                <div className="mt-4">
                    <h3>Individual Completed Works</h3>
                    <button onClick={fetchIndividualCompletedWorks (setLoading, setMessage, setIndividualCompletedWorks)} className="btn btn-primary mb-3">
                        Load Individual Completed Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {individualCompletedWorks.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Work ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Leader ID</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Work Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {individualCompletedWorks.map((work) => (
                                    <tr key={work.workId}>
                                        <td>{work.workId}</td>
                                        <td>{work.name || "N/A"}</td>
                                        <td>{work.description}</td>
                                        <td>{work.leaderId}</td>
                                        <td>{work.startDate}</td>
                                        <td>{work.endDate || "N/A"}</td>
                                        <td>{work.workType}</td>
                                        <td>{work.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );

        case 'ListGroupsInCompletedWork':
            return (
                <div className="mt-4">
                    <h3>Group Completed Works</h3>
                    <button onClick={fetchGroupCompletedWorks (setLoading, setMessage, setGroupCompletedWorks)} className="btn btn-primary mb-3">
                        Load Group Completed Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {groupCompletedWorks.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Work ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Leader ID</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Work Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupCompletedWorks.map((work) => (
                                    <tr key={work.workId}>
                                        <td>{work.workId}</td>
                                        <td>{work.name || "N/A"}</td>
                                        <td>{work.description}</td>
                                        <td>{work.leaderId}</td>
                                        <td>{work.startDate}</td>
                                        <td>{work.endDate || "N/A"}</td>
                                        <td>{work.workType}</td>
                                        <td>{work.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );

        case 'salaryDetailsOfEmployee':
            return (
                <div className="mt-4">
                    <h3>Salary Details of Employee</h3>
                    <form onSubmit={(e) => fetchEmployeeSalaryDetails (e, setMessage, setLoading, setSalaryDetails)} className="mb-3">
                        <div className="mb-2">
                            <label htmlFor="employeeId" className="form-label">Employee ID:</label>
                            <input
                                type="number"
                                id="employeeId"
                                name="employeeId"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Get Salary Details</button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {salaryDetails.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Salary ID</th>
                                    <th>Year</th>
                                    <th>Salary</th>
                                    <th>Bonus</th>
                                    <th>Benefit Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salaryDetails.map((salary) => (
                                    <tr key={salary.salaryId}>
                                        <td>{salary.salaryId}</td>
                                        <td>{salary.year}</td>
                                        <td>{salary.salary.toFixed(2)}</td>
                                        <td>{salary.bonusThatYear.toFixed(2)}</td>
                                        <td>{salary.benefitPoints.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );

        case 'equipmentDetailsOfEmployee':
            return (
                <div className="mt-4">
                    <h3>Equipment Details of Employee</h3>
                    <form onSubmit={(e) => fetchEmployeeEquipmentDetails (e, setMessage, setLoading, setEquipmentDetails)} className="mb-3">
                        <div className="mb-2">
                            <label htmlFor="employeeId" className="form-label">Employee ID:</label>
                            <input
                                type="number"
                                id="employeeId"
                                name="employeeId"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Get Equipment Details</button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {equipmentDetails.length > 0 && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Equipment ID</th>
                                    <th>Name</th>
                                    <th>Model</th>
                                    <th>Serial Number</th>
                                    <th>Assigned Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {equipmentDetails.map((equipment) => (
                                    <tr key={equipment.equipmentId}>
                                        <td>{equipment.equipmentId}</td>
                                        <td>{equipment.name}</td>
                                        <td>{equipment.model}</td>
                                        <td>{equipment.serialNumber}</td>
                                        <td>{equipment.assignedDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );

        case 'assignEquipment':
            return (
                <div className="mt-4">
                    <h3>Assign Equipment to Employee</h3>
                    <form onSubmit={(e) => handleAssignEquipment (e, setMessage) } className="mb-3">
                        <div className="mb-2">
                            <label htmlFor="employeeId" className="form-label">Employee ID:</label>
                            <input
                                type="number"
                                id="employeeId"
                                name="employeeId"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">Equipment Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={equipment.name}
                                onChange={(e) => setEquipment({ ...equipment, name: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="model" className="form-label">Equipment Model:</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={equipment.model}
                                onChange={(e) => setEquipment({ ...equipment, model: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="serialNumber" className="form-label">Serial Number:</label>
                            <input
                                type="text"
                                id="serialNumber"
                                name="serialNumber"
                                value={equipment.serialNumber}
                                onChange={(e) => setEquipment({ ...equipment, serialNumber: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="assignedDate" className="form-label">Assigned Date:</label>
                            <input
                                type="date"
                                id="assignedDate"
                                name="assignedDate"
                                value={equipment.assignedDate}
                                onChange={(e) => setEquipment({ ...equipment, assignedDate: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Assign Equipment</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            );

        case 'unassignEquipment':
            return (
                <div className="mt-4">
                    <h3>Unassign Equipment</h3>
                    <form onSubmit={(e) => handleUnassignEquipment (e, setMessage) } className="mb-3">
                        <div className="mb-2">
                            <label htmlFor="equipmentId" className="form-label">Equipment ID:</label>
                            <input
                                type="number"
                                id="equipmentId"
                                name="equipmentId"
                                value={equipmentId}
                                onChange={(e) => setEquipmentId(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-danger">Unassign Equipment</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            );

        case 'createJob':
            return (
                <div className="mt-4">
                    <h3>Create Job Position</h3>
                    <form onSubmit={(e)=> handleCreateJob (e, setMessage, setJob)} className="mb-3">
                        <div className="mb-2">
                            <label htmlFor="position" className="form-label">Position:</label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                value={job.position}
                                onChange={(e) => setJob({ ...job, position: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={job.description}
                                onChange={(e) => setJob({ ...job, description: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="experienceRequired" className="form-label">Experience Required:</label>
                            <input
                                type="text"
                                id="experienceRequired"
                                name="experienceRequired"
                                value={job.experienceRequired}
                                onChange={(e) => setJob({ ...job, experienceRequired: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Create Job</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            );

        case 'listAllJobs':
            return (
                <div className="mt-4">

                    <h3>All Job Positions</h3>
                    <button onClick={ handleGetAllJobs (setMessage, setJobs)} className="btn btn-primary mb-3">
                        Load Individual Completed Works
                    </button>
                    {loading && <p>Loading...</p>}
                    {message && <p>{message}</p>}
                    {jobs.length === 0 ? (
                        <p>No jobs available.</p>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Job ID</th>
                                    <th>Position</th>
                                    <th>Description</th>
                                    <th>Experience Required</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.jobId}>
                                        <td>{job.jobId}</td>
                                        <td>{job.position}</td>
                                        <td>{job.description}</td>
                                        <td>{job.experienceRequired}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );
            

        case 'listJobByID':
            return (
                <div className="mt-4">
                    <h3>Get Job Details by ID</h3>
                    <form onSubmit={(e)=>handleGetJobById (e, setMessage, setJob)} className="mb-3">
                        <div className="mb-2">
                            <label htmlFor="jobId" className="form-label">Job ID:</label>
                            <input
                                type="number"
                                id="jobId"
                                name="jobId"
                                value={jobId}
                                onChange={(e) => setJobId(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Get Job</button>
                    </form>
                    {job && (
                        <div className="mt-3">
                            <h4>Job Details</h4>
                            <p><strong>Job ID:</strong> {job.jobId}</p>
                            <p><strong>Position:</strong> {job.position}</p>
                            <p><strong>Description:</strong> {job.description}</p>
                            <p><strong>Experience Required:</strong> {job.experienceRequired}</p>
                        </div>
                    )}
                    {message && <p>{message}</p>}
                </div>
            );

        case 'deleteJob':
            return (
                <div className="mt-4">
                    <h3>Delete Job Position</h3>
                    <form onSubmit={(e)=>handleDeleteJob (e, setMessage, setJobId)}>
                        <div className="form-group">
                            <label htmlFor="jobId">Job ID</label>
                            <input
                                type="number"
                                className="form-control"
                                id="jobId"
                                value={jobId}
                                onChange={(e) => setJobId(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-danger">Delete Job</button>
                    </form>
                    {message && <p className="mt-3">{message}</p>}
                </div>
            );

        case 'listCandidatesForJob':
            return (
                <div className="mt-4">
                    <h3>Candidates for Job</h3>
                    <div className="form-group">
                        <label htmlFor="jobId">Job ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="jobId"
                            value={jobId}
                            onChange={(e) => setJobId(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleFetchCandidates (setCandidates, setMessage) }
                    >
                        Get Candidates
                    </button>
        
                    {candidates.length > 0 && (
                        <div className="mt-4">
                            <h4>Candidates List</h4>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Candidate ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Phone Number</th>
                                        <th>Date of Birth</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Work Company 1</th>
                                        <th>Work Company 1 Skills</th>
                                        <th>Work Company 1 Description</th>
                                        <th>Work Company 2</th>
                                        <th>Work Company 2 Skills</th>
                                        <th>Work Company 2 Description</th>
                                        <th>Education 1</th>
                                        <th>Education 1 Description</th>
                                        <th>Education 2</th>
                                        <th>Education 2 Description</th>
                                        <th>Status</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidates.map((candidate, index) => (
                                        <tr key={index}>
                                            <td>{candidate.jobCandidateId}</td>
                                            <td>{candidate.firstName}</td>
                                            <td>{candidate.lastName}</td>
                                            <td>{candidate.age}</td>
                                            <td>{candidate.gender}</td>
                                            <td>{candidate.phoneNo}</td>
                                            <td>{candidate.dateOfBirth}</td>
                                            <td>{candidate.email}</td>
                                            <td>{candidate.userName}</td>
                                            <td>{candidate.workCompany1}</td>
                                            <td>{candidate.workCompany1Skills}</td>
                                            <td>{candidate.workCompany1Description}</td>
                                            <td>{candidate.workCompany2}</td>
                                            <td>{candidate.workCompany2Skills}</td>
                                            <td>{candidate.workCompany2Description}</td>
                                            <td>{candidate.education1}</td>
                                            <td>{candidate.education1Description}</td>
                                            <td>{candidate.education2}</td>
                                            <td>{candidate.education2Description}</td>
                                            <td>{candidate.status}</td>
                                            <td>{candidate.address}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
        
                    {message && <p className="mt-3">{message}</p>}
                </div>
            );

        case 'updateCandidateStatus':
            return (
                <div className="mt-4">
                    <h3>Update Candidate Status</h3>
                    <div className="form-group">
                        <label htmlFor="candidateId">Candidate ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="candidateId"
                            value={candidateId}
                            onChange={(e) => setCandidateId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            className="form-control"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="PENDING">PENDING</option>
                            <option value="ACCEPTED">ACCEPTED</option>
                            <option value="REJECTED">REJECTED</option>
                            <option value="INTERVIEWED">INTERVIEWED</option>
                        </select>
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleCandidateUpdateStatus (setUpdatedCandidate, setMessage) }
                    >
                        Update Status
                    </button>
        
                    {updatedCandidate && (
                        <div className="mt-4">
                            <h5>Updated Candidate:</h5>
                            <p>Name: {updatedCandidate.firstName} {updatedCandidate.lastName}</p>
                            <p>Status: {updatedCandidate.status}</p>
                        </div>
                    )}
        
                    {message && <p className="mt-3">{message}</p>}
                </div>
            );

        case 'candidateByID':
            return (
                <div className="mt-4">
                    <h3>Get Candidate By ID</h3>
                    <div className="form-group">
                        <label htmlFor="candidateId">Candidate ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="candidateId"
                            value={candidateId}
                            onChange={(e) => setCandidateId(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleGetCandidateById (setCandidate, setMessage)}
                    >
                        Get Candidate Details
                    </button>
        
                    {candidate && (
                        <div className="mt-4">
                            <h5>Candidate Details:</h5>
                            <p><strong>First Name:</strong> {candidate.firstName}</p>
                            <p><strong>Last Name:</strong> {candidate.lastName}</p>
                            <p><strong>Age:</strong> {candidate.age}</p>
                            <p><strong>Gender:</strong> {candidate.gender}</p>
                            <p><strong>Phone Number:</strong> {candidate.phoneNo}</p>
                            <p><strong>Email:</strong> {candidate.email}</p>
                            <p><strong>Status:</strong> {candidate.status}</p>
                            <p><strong>Address:</strong> {candidate.address}</p>
                        </div>
                    )}
        
                    {message && <p className="mt-3">{message}</p>}
                </div>
            );
            
            
            
            
            
            
            
            
            
            
            

            
            
            
            

            
            
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
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listAllGroupCompletedWork')}>
                List Group's completed work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listIndividualsInCompletedWork')}>
                List Individuals in completed work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('ListGroupsInCompletedWork')}>
                List Groups in completed work
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('salaryDetailsOfEmployee')}>
                Salary details of employee
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('equipmentDetailsOfEmployee')}>
                Equipment details of employee
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('assignEquipment')}>
                Assign Equipment
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('unassignEquipment')}>
                Unassign Equipment
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('createJob')}>
                Create a job
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listAllJobs')}>
                Get All Jobs
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listJobByID')}>
                Get Job by ID
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('deleteJob')}>
                Delete Job
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('listCandidatesForJob')}>
                Get candidates for a job
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('updateCandidateStatus')}>
                Update Status of Candidate
            </button>
            <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => setSelectedFeature('candidateByID')}>
                Get Candidate By ID
            </button>
            {renderForm()}
        {/* </Link> */}
    </div>
  );
}
