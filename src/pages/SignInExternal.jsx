import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { Link, useNavigate } from 'react-router-dom';

export default function SignInExternal() {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        userName: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [candidateData, setCandidateData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/candidate/signin`, credentials, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setMessage('Sign in successful!');
            setCandidateData(response.data);
            navigate("/candidate-home")
        } catch (error) {
            setMessage(
                error
            );
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="userName"
                        value={credentials.userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
            <div>{message}</div>
        </div>
    );
}
