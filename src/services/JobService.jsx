import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../apiConfig';

export const handleCreateJob = async (e, setMessage, setJob) => {
    e.preventDefault();
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
            `${BASE_URL}/admin/jobs/createJob`,
            job,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                },
            }
        );
        setMessage(`Success: Job created successfully with ID ${response.data.jobId}`);
        setJob({ position: '', description: '', experienceRequired: '' });
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};

export const handleGetJobById = async (e, setMessage, setJob) => {
    e.preventDefault();
    setMessage('');
    setJob(null);
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/jobs/getJobById/${jobId}`, {
            headers: {
                Authorization: token,
            },
        });
        setJob(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};

export const handleGetAllJobs = async (setMessage, setJobs) => {
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/jobs/getAllJobs`, {
            headers: {
                Authorization: token,
            },
        });
        setJobs(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};

export const handleDeleteJob = async (e, setMessage, setJobId) => {
    e.preventDefault();
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`${BASE_URL}/admin/jobs/deleteJob/${jobId}`, {
            headers: {
                Authorization: token,
            },
        });
        setMessage('Job deleted successfully!');
        setJobId(''); // Clear input field after success
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};


