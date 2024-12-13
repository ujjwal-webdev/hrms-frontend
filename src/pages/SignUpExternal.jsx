import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { Link, useNavigate } from 'react-router-dom';

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
            setMessage('Sign up successful! Welcome ' + response.data.firstName);
            navigate('/sign-in-external');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Sign up failed. Please try again.');
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={candidate.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={candidate.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={candidate.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={candidate.gender}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNo"
                        value={candidate.phoneNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={candidate.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={candidate.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="userName"
                        value={candidate.userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={candidate.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Work Company 1:</label>
                    <input
                        type="text"
                        name="workCompany1"
                        value={candidate.workCompany1}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Work Company 1 Skills:</label>
                    <input
                        type="text"
                        name="workCompany1Skills"
                        value={candidate.workCompany1Skills}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Work Company 1 Description:</label>
                    <textarea
                        name="workCompany1Description"
                        value={candidate.workCompany1Description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label>Work Company 2:</label>
                    <input
                        type="text"
                        name="workCompany2"
                        value={candidate.workCompany2}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Work Company 2 Skills:</label>
                    <input
                        type="text"
                        name="workCompany2Skills"
                        value={candidate.workCompany2Skills}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Work Company 2 Description:</label>
                    <textarea
                        name="workCompany2Description"
                        value={candidate.workCompany2Description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label>Education 1:</label>
                    <input
                        type="text"
                        name="education1"
                        value={candidate.education1}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Education 1 Description:</label>
                    <textarea
                        name="education1Description"
                        value={candidate.education1Description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label>Education 2:</label>
                    <input
                        type="text"
                        name="education2"
                        value={candidate.education2}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Education 2 Description:</label>
                    <textarea
                        name="education2Description"
                        value={candidate.education2Description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label>Address:</label>
                    <textarea
                        name="address"
                        value={candidate.address}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <div>{message}</div>
        </div>
    );
}
