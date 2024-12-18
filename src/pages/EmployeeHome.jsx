import React from "react";
import { useState } from "react";
import { BASE_URL } from "../apiConfig";
import axios from "axios";
import { handleViewProfile } from "../EmployeeService/EmployeeProfileService";
import { handleUpdateProfile } from "../EmployeeService/EmployeeProfileService";
import { handleUpdatePassword } from "../EmployeeService/EmployeeProfileService";
import { handleAddAddress } from "../EmployeeService/EmployeeProfileService";
import { handleUpdateAddress } from "../EmployeeService/EmployeeProfileService";
import { fetchAllAddresses } from "../EmployeeService/EmployeeProfileService";
import { deleteAddress } from "../EmployeeService/EmployeeProfileService";
import { submitLeaveRequest } from "../EmployeeService/EmployeeLeaveService";
import { submitUpdatedLeave } from "../EmployeeService/EmployeeLeaveService";
import { deletePendingLeaveHandler } from "../EmployeeService/EmployeeLeaveService";
import { checkLeaveStatusHandler } from "../EmployeeService/EmployeeLeaveService";
import { getAllLeavesHandler } from "../EmployeeService/EmployeeLeaveService";
import { getAllWorksHandler } from "../EmployeeService/EmployeeWorkService";
import { changeWorkStatusHandler } from "../EmployeeService/EmployeeWorkService";
import { addEducationHandler } from "../EmployeeService/EmployeeWorkService";
import { addWorkExperienceHandler } from "../EmployeeService/EmployeeWorkService";
import { addSkillHandler } from "../EmployeeService/EmployeeWorkService";

 
export default function EmployeeHome() {

    const [selectedFeature, setSelectedFeature] = useState(null);

    const [employee, setEmployee] = useState(null);
    const [message, setMessage] = useState('');
    
    // const handleViewProfile = async () => {
    //     setMessage('');
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.get(
    //             `${BASE_URL}/employee/viewProfile`,
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             }
    //         );
    //         setEmployee(response.data); // Set employee profile data
    //     } catch (error) {
    //         setMessage(`Error: ${error.response?.data?.message || error.message}`);
    //     }
    // };

    const [updatedProfile, setUpdatedProfile] = useState({
        name: '',
        email: '',
        gender: '',
        dateOfBirth: '',
    });

    const handleUpdateProfileChange = (field, value) => {
        setUpdatedProfile({ ...updatedProfile, [field]: value });
    };

    // const handleUpdateProfile = async (e) => {
    //     e.preventDefault();
    //     setMessage('');
    
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.put(
    //             "http://localhost:8896/employee/updateProfile",
    //             updatedProfile,
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             }
    //         );
    //         setMessage('Profile updated successfully!');
    //         setUpdatedProfile(response.data); // Update the form with the updated data
    //     } catch (error) {
    //         setMessage(`Error: ${error.response?.data?.message || error.message}`);
    //     }
    // };

    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const handlePasswordChange = (field, value) => {
        setPasswordData({ ...passwordData, [field]: value });
    };

    // const handleUpdatePassword = async (e) => {
    //     e.preventDefault();
    //     setMessage('');
    
    //     // Validation: Check if new password matches confirm password
    //     if (passwordData.newPassword !== passwordData.confirmPassword) {
    //         setMessage('Passwords do not match.');
    //         return;
    //     }
    
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.put(
    //             "http://localhost:8896/employee/updatePassword",
    //             passwordData,
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             }
    //         );
    //         setMessage(response.data); // Success message from the server
    //         setPasswordData({ newPassword: '', confirmPassword: '' }); // Clear the form
    //     } catch (error) {
    //         setMessage(`Error: ${error.response?.data?.message || error.message}`);
    //     }
    // };

    const [addressData, setAddressData] = useState({
        houseNumber: '',
        colony: '',
        pincode: '',
        city: '',
        state: '',
    });

    const handleAddressChange = (field, value) => {
        setAddressData({ ...addressData, [field]: value });
    };

    // const handleAddAddress = async (e) => {
    //     e.preventDefault();
    //     setMessage('');
    
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.post(
    //             "http://localhost:8896/employee/address",
    //             addressData,
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             }
    //         );
    //         setMessage("Address added successfully!");
    //         setAddressData({
    //             houseNumber: '',
    //             colony: '',
    //             pincode: '',
    //             city: '',
    //             state: '',
    //         }); // Clear the form after success
    //     } catch (error) {
    //         setMessage(`Error: ${error.response?.data?.message || error.message}`);
    //     }
    // };

    // const handleUpdateAddress = async (e) => {
    //     e.preventDefault();
    //     setMessage('');
    
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.put(
    //             `http://localhost:8896/employee/address/${addressData.addressId}`,
    //             {
    //                 houseNumber: addressData.houseNumber,
    //                 colony: addressData.colony,
    //                 pincode: addressData.pincode,
    //                 city: addressData.city,
    //                 state: addressData.state,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             }
    //         );
    //         setMessage("Address updated successfully!");
    //     } catch (error) {
    //         setMessage(`Error: ${error.response?.data?.message || error.message}`);
    //     }
    // };

    const [addresses, setAddresses] = useState([]);

    // const fetchAllAddresses = async () => {
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.get("http://localhost:8896/employee/address", {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });
    //         setAddresses(response.data);
    //     } catch (error) {
    //         console.error("Error fetching addresses:", error);
    //     }
    // };

    // const deleteAddress = async (addressId) => {
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.delete(`http://localhost:8896/employee/address/${addressId}`, {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });
    //         alert("Address deleted successfully!");
    //         fetchAllAddresses(); // Refresh the list
    //     } catch (error) {
    //         console.error("Error deleting address:", error);
    //     }
    // };

    const [leaveData, setLeaveData] = useState({
        reason: "",
        leaveStartDate: "",
        leaveEndDate: "",
    });

    // const submitLeaveRequest = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.post("http://localhost:8896/employee/leave", leaveData, {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });
    //         setMessage("Leave request submitted successfully!");
    //         setLeaveData({
    //             reason: "",
    //             leaveStartDate: "",
    //             leaveEndDate: "",
    //         });
    //     } catch (error) {
    //         console.error("Error submitting leave request:", error);
    //         setMessage("Failed to submit leave request.");
    //     }
    // };

    // const submitUpdatedLeave = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.put("http://localhost:8896/employee/leave", leaveData, {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });
    //         setMessage("Leave updated successfully!");
    //         setLeaveData({
    //             reason: "",
    //             leaveStartDate: "",
    //             leaveEndDate: "",
    //         });
    //     } catch (error) {
    //         console.error("Error updating leave:", error);
    //         setMessage("Failed to update leave.");
    //     }
    // };

    // const deletePendingLeaveHandler = async () => {
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.delete("http://localhost:8896/employee/leave", {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });
    //         setMessage("Pending leave deleted successfully!");
    //         console.log("Deleted Leave Details:", response.data);
    //     } catch (error) {
    //         console.error("Error deleting pending leave:", error);
    //         setMessage("Failed to delete pending leave.");
    //     }
    // };

    const [leaveStatus, setLeaveStatus] = useState(null);

    // const checkLeaveStatusHandler = async () => {
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.get("http://localhost:8896/employee/leave", {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });
    //         setLeaveStatus(response.data);
    //         setMessage("Leave status fetched successfully!");
    //     } catch (error) {
    //         console.error("Error fetching leave status:", error);
    //         setMessage(error.response.data.message);
    //     }
    // };

    const [leaveList, setLeaveList] = useState([]);

    // const getAllLeavesHandler = async () => {
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.get("http://localhost:8896/employee/allLeaves", {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });
    //         setLeaveList(response.data);
    //         setMessage("All leaves fetched successfully!");
    //     } catch (error) {
    //         console.error("Error fetching all leaves:", error);
    //         setMessage("Failed to fetch all leaves.");
    //     }
    // };

    const [workList, setWorkList] = useState([]);

    // const getAllWorksHandler = async () => {    //need to test
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.get("http://localhost:8896/employee/works", {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });
    //         setWorkList(response.data);
    //         setMessage("All works fetched successfully!");
    //     } catch (error) {
    //         console.error("Error fetching all works:", error);
    //         setMessage("Failed to fetch all works.");
    //     }
    // };

    const [workId, setWorkId] = useState('');

    // const changeWorkStatusHandler = async () => {   //need to test
    //     if (!workId) {
    //         alert('Please enter a valid work ID.');
    //         return;
    //     }

    //     try {
    //         const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
    //         const response = await axios.put(`http://localhost:8896/employee/changeStatus/${workId}`, {}, {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });

    //         // Show success message
    //         setMessage(response.data); // Assuming the response contains a success message
    //     } catch (error) {
    //         console.error('Error changing work status:', error);
    //         setMessage('Failed to change work status.');
    //     }
    // };

    const [education, setEducation] = useState({
        instituteName: "",
        qualification: "",
        major: ""
    })

    // const addEducationHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.post(
    //             "http://localhost:8896/employee/education", 
    //             education, 
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             }
    //         );
    //         setMessage("Education added successfully!");
    //         setEducation({
    //             instituteName: "",
    //             qualification: "",
    //             major: "",
    //         });
    //     } catch (error) {
    //         console.error("Error adding education:", error);
    //         setMessage("Failed to add education.");
    //     }
    // };

    const [workExperience, setWorkExperience] = useState({
        companyName: "",
        designation: "",
        startDate: "",
        endDate: "",
        description: "",
        skillsUsed: "",
    })

    const handleAddWorkExperienceChange = (e) => {
        const { name, value } = e.target;
        setWorkExperience((prevWorkExperience) => ({
            ...prevWorkExperience,
            [name]: value,
        }));
    };

    // const addWorkExperienceHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.post(
    //             "http://localhost:8896/employee/work-experience", 
    //             workExperience, 
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             }
    //         );
    //         setMessage("Work Experience added successfully!");
    //         setWorkExperience({
    //             companyName: "",
    //             designation: "",
    //             startDate: "",
    //             endDate: "",
    //             description: "",
    //             skillsUsed: "",
    //         });
    //     } catch (error) {
    //         console.error("Error adding work experience:", error);
    //         setMessage("Failed to add work experience.");
    //     }
    // };

    const [skill, setSkill] = useState({
        name: "",
        proficiency: "",
        yearsOfExperience: "",
    })

    const handleAddSkillsChange = (e) => {
        const { name, value } = e.target;
        setSkill((prevSkill) => ({
            ...prevSkill,
            [name]: value,
        }));
    };

    // const addSkillHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await axios.post(
    //             "http://localhost:8896/employee/skills", 
    //             skill, 
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                 },
    //             }
    //         );
    //         setMessage("Skill added successfully!");
    //         setSkill({
    //             name: "",
    //             proficiency: "",
    //             yearsOfExperience: "",
    //         });
    //     } catch (error) {
    //         console.error("Error adding skill:", error);
    //         setMessage("Failed to add skill.");
    //     }
    // };
    

    const renderForm = () => {
        switch (selectedFeature) {
            case 'viewProfile':  
                return (
                    <div className="mt-4">
                        <h3>Employee Profile</h3>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={(e) => handleViewProfile (e, setMessage, setEmployee)}
                        >
                            View Profile
                        </button>
            
                        {employee && (
                            <div className="mt-4">
                                <h5>Profile Details:</h5>
                                <p><strong>Employee ID:</strong> {employee.employeeId}</p>
                                <p><strong>Name:</strong> {employee.name}</p>
                                <p><strong>Email:</strong> {employee.email}</p>
                                <p><strong>Department ID:</strong> {employee.departmentId}</p>
                                <p><strong>Department Name:</strong> {employee.departmentName}</p>
                                <p><strong>Username:</strong> {employee.userName}</p>
                                <p><strong>Role:</strong> {employee.role}</p>
                                <p><strong>Gender:</strong> {employee.gender}</p>
                                <p><strong>Salary:</strong> {employee.salary}</p>
                                <p><strong>Date of Birth:</strong> {employee.dateOfBirth}</p>
                                <p><strong>Joining Date:</strong> {employee.joiningDate}</p>
                            </div>
                        )}
            
                        {message && <p className="mt-3">{message}</p>}
                    </div>
                );

            case 'updateProfile':
                return (
                    <div className="mt-4">
                        <h3>Update Profile</h3>
                        <form onSubmit={(e)=> handleUpdateProfile (e, setMessage, setUpdatedProfile, updatedProfile)} className="mt-3">
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={updatedProfile.name}
                                    onChange={(e) => handleUpdateProfileChange('name', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={updatedProfile.email}
                                    onChange={(e) => handleUpdateProfileChange('email', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender:</label>
                                <select
                                    className="form-control"
                                    value={updatedProfile.gender}
                                    onChange={(e) => handleUpdateProfileChange('gender', e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date of Birth:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={updatedProfile.dateOfBirth}
                                    onChange={(e) => handleUpdateProfileChange('dateOfBirth', e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Update Profile
                            </button>
                        </form>
            
                        {message && <p className="mt-3">{message}</p>}
                    </div>
                );

            case 'updatePassword':
                return (
                    <div className="mt-4">
                        <h3>Update Password</h3>
                        <form onSubmit={(e)=> handleUpdatePassword (e, setMessage, passwordData, setPasswordData)} className="mt-3">
                            <div className="form-group">
                                <label>New Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={passwordData.newPassword}
                                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Update Password
                            </button>
                        </form>
            
                        {message && <p className="mt-3">{message}</p>}
                    </div>
                );

            case 'addAddress':
                return (
                    <div className="mt-4">
                        <h3>Add Address</h3>
                        <form onSubmit={(e) => handleAddAddress (e, setMessage, addressData, setAddressData )} className="mt-3">
                            <div className="form-group">
                                <label>House Number:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={addressData.houseNumber}
                                    onChange={(e) => handleAddressChange('houseNumber', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Colony:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={addressData.colony}
                                    onChange={(e) => handleAddressChange('colony', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Pincode:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={addressData.pincode}
                                    onChange={(e) => handleAddressChange('pincode', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>City:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={addressData.city}
                                    onChange={(e) => handleAddressChange('city', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>State:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={addressData.state}
                                    onChange={(e) => handleAddressChange('state', e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Add Address
                            </button>
                        </form>
            
                        {message && <p className="mt-3">{message}</p>}
                    </div>
                );

            case 'updateAddress':
                return (
                    <div className="mt-4">
                        <h3>Update Address</h3>
                        <form onSubmit={(e)=>handleUpdateAddress (e, setMessage, addressData)} className="mt-3">
                            <div className="form-group">
                                <label>Address ID:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={addressData.addressId}
                                    onChange={(e) => handleAddressChange('addressId', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>House Number:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={addressData.houseNumber}
                                    onChange={(e) => handleAddressChange('houseNumber', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Colony:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={addressData.colony}
                                    onChange={(e) => handleAddressChange('colony', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Pincode:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={addressData.pincode}
                                    onChange={(e) => handleAddressChange('pincode', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>City:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={addressData.city}
                                    onChange={(e) => handleAddressChange('city', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>State:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={addressData.state}
                                    onChange={(e) => handleAddressChange('state', e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Update Address
                            </button>
                        </form>
            
                        {message && <p className="mt-3">{message}</p>}
                    </div>
                );

            case 'listAllAddresses':
                return (
                    <div className="mt-4">
                        <h3>All Addresses</h3>
                        <button className="btn btn-primary mb-3" onClick={(e) => fetchAllAddresses (e, setAddresses)}>
                            Load Addresses
                        </button>
                        {addresses.length > 0 ? (
                            <table className="table table-bordered table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th>Address ID</th>
                                        <th>House Number</th>
                                        <th>Colony</th>
                                        <th>Pincode</th>
                                        <th>City</th>
                                        <th>State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addresses.map((address) => (
                                        <tr key={address.addressId}>
                                            <td>{address.addressId}</td>
                                            <td>{address.houseNumber}</td>
                                            <td>{address.colony}</td>
                                            <td>{address.pincode}</td>
                                            <td>{address.city}</td>
                                            <td>{address.state}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No addresses found.</p>
                        )}
                    </div>
                );
                

            case 'deleteAddress':
                return (
                    <div className="mt-4">
                        <h3>All Addresses</h3>
                        <button className="btn btn-primary mb-3" onClick={(e) => fetchAllAddresses (e, setAddresses)}>
                            Load Addresses
                        </button>
                        {addresses.length > 0 ? (
                            <table className="table table-bordered table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th>Address ID</th>
                                        <th>House Number</th>
                                        <th>Colony</th>
                                        <th>Pincode</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addresses.map((address) => (
                                        <tr key={address.addressId}>
                                            <td>{address.addressId}</td>
                                            <td>{address.houseNumber}</td>
                                            <td>{address.colony}</td>
                                            <td>{address.pincode}</td>
                                            <td>{address.city}</td>
                                            <td>{address.state}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={(e) => deleteAddress(e, address.addressId, setAddresses)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No addresses found.</p>
                        )}
                    </div>
                );

            case 'addLeave':
                return (
                    <div className="mt-4">
                        <h3>Request a Leave</h3>
                        <form onSubmit={(e) => submitLeaveRequest (e, setMessage, setLeaveData, leaveData)}>
                            <div className="form-group">
                                <label htmlFor="reason">Reason:</label>
                                <textarea
                                    id="reason"
                                    className="form-control"
                                    value={leaveData.reason}
                                    onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="leaveStartDate">Start Date:</label>
                                <input
                                    type="date"
                                    id="leaveStartDate"
                                    className="form-control"
                                    value={leaveData.leaveStartDate}
                                    onChange={(e) => setLeaveData({ ...leaveData, leaveStartDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="leaveEndDate">End Date:</label>
                                <input
                                    type="date"
                                    id="leaveEndDate"
                                    className="form-control"
                                    value={leaveData.leaveEndDate}
                                    onChange={(e) => setLeaveData({ ...leaveData, leaveEndDate: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Submit Leave Request
                            </button>
                        </form>
                        <p>{message}</p>
                    </div>
                );

            case 'updateLeave':
                return (
                    <div className="mt-4">
                        <h3>Update Leave</h3>
                        <form onSubmit={(e) => submitUpdatedLeave (e, setMessage, setLeaveData, leaveData)}>
                            <div className="form-group">
                                <label htmlFor="reason">Reason:</label>
                                <textarea
                                    id="reason"
                                    className="form-control"
                                    value={leaveData.reason}
                                    onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="leaveStartDate">Start Date:</label>
                                <input
                                    type="date"
                                    id="leaveStartDate"
                                    className="form-control"
                                    value={leaveData.leaveStartDate}
                                    onChange={(e) => setLeaveData({ ...leaveData, leaveStartDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="leaveEndDate">End Date:</label>
                                <input
                                    type="date"
                                    id="leaveEndDate"
                                    className="form-control"
                                    value={leaveData.leaveEndDate}
                                    onChange={(e) => setLeaveData({ ...leaveData, leaveEndDate: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Update Leave
                            </button>
                        </form>
                        <p>{message}</p>
                    </div>
                );

            case 'deletePendingLeave':
                return (
                    <div className="mt-4">
                        <h3>Delete Pending Leave</h3>
                        <button className="btn btn-danger" onClick={(e) => deletePendingLeaveHandler(setMessage)}>
                            Delete Pending Leave
                        </button>
                        <p>{message}</p>
                    </div>
                );

            case 'checkLeaveStatus':
                return (
                    <div className="mt-4">
                        <h3>Check Leave Status</h3>
                        <button className="btn btn-primary" onClick={(e) => checkLeaveStatusHandler (setMessage, setLeaveStatus)}>
                            Check Latest Leave Status
                        </button>
                        {leaveStatus && (
                            <div className="mt-3">
                                <h5>Latest Leave Status:</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Leave ID</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{leaveStatus.leaveId}</td>
                                            <td>{leaveStatus.reason}</td>
                                            <td>{leaveStatus.status}</td>
                                            <td>{leaveStatus.leaveStartDate}</td>
                                            <td>{leaveStatus.leaveEndDate}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <p>{message}</p>
                    </div>
                );

            case 'getAllLeaves':
                return (
                    <div className="mt-4">
                        <h3>All Leave Records</h3>
                        <button className="btn btn-primary" onClick={(e)=>getAllLeavesHandler (setLeaveList, setMessage)}>
                            Get All Leaves
                        </button>
                        {leaveList.length > 0 ? (
                            <div className="mt-3">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Leave ID</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaveList.map((leave) => (
                                            <tr key={leave.leaveId}>
                                                <td>{leave.leaveId}</td>
                                                <td>{leave.reason}</td>
                                                <td>{leave.status}</td>
                                                <td>{leave.leaveStartDate}</td>
                                                <td>{leave.leaveEndDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No leaves found</p>
                        )}
                    </div>
                );

            case 'checkWork':
                return (
                    <div className="mt-4">
                        <h3>All Work Records</h3>
                        <button className="btn btn-primary" onClick={(e)=>getAllWorksHandler (setMessage, setWorkList)}>
                            Get All Works
                        </button>
                        {workList.length > 0 ? (
                            <div className="mt-3">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Work ID</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Leader ID</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Work Type</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workList.map((work) => (
                                            <tr key={work.workId}>
                                                <td>{work.workId}</td>
                                                <td>{work.name}</td>
                                                <td>{work.description}</td>
                                                <td>{work.leaderId}</td>
                                                <td>{work.startDate}</td>
                                                <td>{work.endDate}</td>
                                                <td>{work.workType}</td>
                                                <td>{work.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No work records found</p>
                        )}
                    </div>
                );
                
            case 'changeWorkStatus':
                return (
                    <div className="mt-4">
                        <h3>Change Work Status</h3>
                        <div>
                            <label htmlFor="workId">Work ID: </label>
                            <input
                                type="number"
                                id="workId"
                                value={workId}
                                onChange={(e) => setWorkId(e.target.value)} // Update the workId state
                                required
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={(e)=>changeWorkStatusHandler(e, setMessage, workId)} // Call the handler when the button is clicked
                        >
                            Mark Work as Completed
                        </button>
                        {message}
                    </div>
                );
                
            case 'addEducation':
                return (
                    <div className="mt-4">
                        <h3>Add Education</h3>
                        <form onSubmit={(e) => addEducationHandler (e, setMessage, education, setEducation)}>
                            <div className="form-group">
                                <label htmlFor="instituteName">Institute Name</label>
                                <input
                                    type="text"
                                    id="instituteName"
                                    className="form-control"
                                    value={education.instituteName}
                                    onChange={(e) => setEducation({...education, instituteName: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="qualification">Qualification</label>
                                <input
                                    type="text"
                                    id="qualification"
                                    className="form-control"
                                    value={education.qualification}
                                    onChange={(e) => setEducation({...education, qualification: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="major">Major</label>
                                <input
                                    type="text"
                                    id="major"
                                    className="form-control"
                                    value={education.major}
                                    onChange={(e) => setEducation({...education, major: e.target.value})}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Education</button>
                        </form>
                        <p>{message}</p>
                    </div>
                );

            case 'addWorkExperience':
                return (
                    <div className="mt-4">
                        <h3>Add Work Experience</h3>
                        <form onSubmit={(e)=> addWorkExperienceHandler (e, setMessage, workExperience, setWorkExperience)}>
                            <div className="form-group">
                                <label htmlFor="companyName">Company Name</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    className="form-control"
                                    value={workExperience.companyName}
                                    onChange={handleAddWorkExperienceChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="designation">Designation</label>
                                <input
                                    type="text"
                                    id="designation"
                                    name="designation"
                                    className="form-control"
                                    value={workExperience.designation}
                                    onChange={handleAddWorkExperienceChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    className="form-control"
                                    value={workExperience.startDate}
                                    onChange={handleAddWorkExperienceChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">End Date</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    className="form-control"
                                    value={workExperience.endDate}
                                    onChange={handleAddWorkExperienceChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    value={workExperience.description}
                                    onChange={handleAddWorkExperienceChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="skillsUsed">Skills Used</label>
                                <input
                                    type="text"
                                    id="skillsUsed"
                                    name="skillsUsed"
                                    className="form-control"
                                    value={workExperience.skillsUsed}
                                    onChange={handleAddWorkExperienceChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Work Experience</button>
                        </form>
                        <p>{message}</p>
                    </div>
                );

            case 'addSkills':
                return (
                    <div className="mt-4">
                        <h3>Add Skill</h3>
                        <form onSubmit={(e) => addSkillHandler (e, setMessage, skill, setSkill)}>
                            <div className="form-group">
                                <label htmlFor="name">Skill Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={skill.name}
                                    onChange={handleAddSkillsChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="proficiency">Proficiency</label>
                                <input
                                    type="text"
                                    id="proficiency"
                                    name="proficiency"
                                    className="form-control"
                                    value={skill.proficiency}
                                    onChange={handleAddSkillsChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="yearsOfExperience">Years of Experience</label>
                                <input
                                    type="number"
                                    id="yearsOfExperience"
                                    name="yearsOfExperience"
                                    className="form-control"
                                    value={skill.yearsOfExperience}
                                    onChange={handleAddSkillsChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Skill</button>
                        </form>
                        <p>{message}</p>
                    </div>
                );
                
            default:
                return null
        }
    }

  return (
    <div className="container mt-5">
        <h1 className="text-center mb-4">Employee Home</h1>
        <div className="row gy-4">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Profile Management</h5>
                        <p className="card-text">Manage your profile and related information.</p>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => setSelectedFeature('viewProfile')}>View Profile</button>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => setSelectedFeature('updateProfile')}>Update Profile</button>
                        <button className="btn btn-primary btn-sm" onClick={() => setSelectedFeature('updatePassword')}>Update Password</button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Address Management</h5>
                        <p className="card-text">Manage your addresses effectively.</p>
                        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={() => setSelectedFeature('addAddress')}>Add Address</button>
                        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={() => setSelectedFeature('updateAddress')}>Update Address</button>
                        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={() => setSelectedFeature('listAllAddresses')}>Get All Addresses</button>
                        <button className="btn btn-danger btn-sm mb-2 me-2" onClick={() => setSelectedFeature('deleteAddress')}>Delete Address</button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Leave Management</h5>
                        <p className="card-text">Track and manage your leaves.</p>
                        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={() => setSelectedFeature('addLeave')}>Add Leave</button>
                        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={() => setSelectedFeature('updateLeave')}>Update Leave</button>
                        <button className="btn btn-danger btn-sm mb-2 me-2" onClick={() => setSelectedFeature('deletePendingLeave')}>Delete Pending Leave</button>
                        <button className="btn btn-info btn-sm mb-2 me-2" onClick={() => setSelectedFeature('checkLeaveStatus')}>Check Latest Leave Status</button>
                        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={() => setSelectedFeature('getAllLeaves')}>Get All Leaves</button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Work Management</h5>
                        <p className="card-text">Monitor and update your work status.</p>
                        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={() => setSelectedFeature('checkWork')}>Check Work</button>
                        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={() => setSelectedFeature('changeWorkStatus')}>Change Work Status</button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Education Management</h5>
                        <p className="card-text">Manage your Education and related information.</p>
                        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={() => setSelectedFeature('addEducation')}>Add Education</button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Work Experience Management</h5>
                        <p className="card-text">Manage your Work Experience and related information.</p>
                        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={() => setSelectedFeature('addWorkExperience')}>Add Work Experience</button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Skills Management</h5>
                        <p className="card-text">Manage your Skills and related information.</p>
                        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={() => setSelectedFeature('addSkills')}>Add Skills</button>
                    </div>
                </div>
            </div>
        </div>
        {renderForm()}
    </div>
  );
}
 