import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { useNavigate } from 'react-router-dom';

export default function SignUpExternal() {
    const navigate = useNavigate();

    const [candidate, setCandidate] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        phoneNo: '',
        dateOfBirth: '',
        email: '',
        userName: '',
        password: '',
        workCompany1: '',
        workCompany1Skills: '',
        workCompany1Description: '',
        workCompany2: '',
        workCompany2Skills: '',
        workCompany2Description: '',
        education1: '',
        education1Description: '',
        education2: '',
        education2Description: '',
        address: '',
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidate((prevCandidate) => ({
            ...prevCandidate,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/candidate/signup`, candidate, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessage(`Sign up successful! Welcome ${response.data.firstName}.`);
            setMessageType('success');
            navigate('/sign-in-external');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Sign up failed. Please try again.');
            setMessageType('danger');
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white">
                            <h3 className="text-center mb-0">Sign Up</h3>
                        </div>
                        <div className="card-body">
                            {message && (
                                <div className={`alert alert-${messageType}`} role="alert">
                                    {message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                {/* Personal Information */}
                                <h5 className="text-primary">Personal Information</h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={candidate.firstName}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={candidate.lastName}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row g-3 mt-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Age</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={candidate.age}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Gender</label>
                                        <select
                                            name="gender"
                                            value={candidate.gender}
                                            onChange={handleChange}
                                            className="form-select"
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Gender
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="text"
                                            name="phoneNo"
                                            value={candidate.phoneNo}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label className="form-label">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={candidate.dateOfBirth}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>

                                {/* Account Information */}
                                <h5 className="text-primary mt-4">Account Information</h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={candidate.email}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            name="userName"
                                            value={candidate.userName}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={candidate.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>

                                {/* Work Experience */}
                                <h5 className="text-primary mt-4">Work Experience</h5>
                                <div className="mb-3">
                                    <label className="form-label">Work Company 1</label>
                                    <input
                                        type="text"
                                        name="workCompany1"
                                        value={candidate.workCompany1}
                                        onChange={handleChange}
                                        placeholder="Company name"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Work Company 2</label>
                                    <input
                                        type="text"
                                        name="workCompany2"
                                        value={candidate.workCompany2}
                                        onChange={handleChange}
                                        placeholder="Company name"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Work Company 1 Skills</label>
                                    <input
                                        type="text"
                                        name="workCompany1Skills"
                                        value={candidate.workCompany1Skills}
                                        onChange={handleChange}
                                        placeholder="Skills used"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Work Company 2 Skills</label>
                                    <input
                                        type="text"
                                        name="workCompany2Skills"
                                        value={candidate.workCompany2Skills}
                                        onChange={handleChange}
                                        placeholder="Skills used"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Work Company 1 Description</label>
                                    <textarea
                                        name="workCompany1Description"
                                        value={candidate.workCompany1Description}
                                        onChange={handleChange}
                                        placeholder="Describe your role"
                                        className="form-control"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Work Company 2 Description</label>
                                    <textarea
                                        name="workCompany2Description"
                                        value={candidate.workCompany2Description}
                                        onChange={handleChange}
                                        placeholder="Describe your role"
                                        className="form-control"
                                        rows="3"
                                    ></textarea>
                                </div>
                                {/* Education */}
                                <h5 className="text-primary mt-4">Education</h5>
                                <div className="mb-3">
                                    <label className="form-label">Education 1</label>
                                    <input
                                        type="text"
                                        name="education1"
                                        value={candidate.education1}
                                        onChange={handleChange}
                                        placeholder="Institution name"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Education 2</label>
                                    <input
                                        type="text"
                                        name="education2"
                                        value={candidate.education2}
                                        onChange={handleChange}
                                        placeholder="Institution name"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Education 1 Description</label>
                                    <textarea
                                        name="education1Description"
                                        value={candidate.education1Description}
                                        onChange={handleChange}
                                        placeholder="Describe your education"
                                        className="form-control"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Education 2 Description</label>
                                    <textarea
                                        name="education2Description"
                                        value={candidate.education2Description}
                                        onChange={handleChange}
                                        placeholder="Describe your education"
                                        className="form-control"
                                        rows="3"
                                    ></textarea>
                                </div>
                                {/* Address */}
                                <h5 className="text-primary mt-4">Address</h5>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <textarea
                                        name="address"
                                        value={candidate.address}
                                        onChange={handleChange}
                                        placeholder="Enter your address"
                                        className="form-control"
                                        rows="3"
                                    ></textarea>
                                </div>
                                {/* Submit Button */}
                                <button type="submit" className="btn btn-primary w-100 mt-4">
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
