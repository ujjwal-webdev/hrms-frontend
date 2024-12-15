import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../apiConfig';

export const handleFetchCandidates = async (setCandidates, setMessage) => {
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/candidate/job/${jobId}`, {
            headers: {
                Authorization: token,
            },
        });
        setCandidates(response.data); // Set candidates data in state
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};

export const handleCandidateUpdateStatus = async (setUpdatedCandidate, setMessage) => {
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(
            `${BASE_URL}/candidate/status/${candidateId}?status=${status}`, 
            {},
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        setUpdatedCandidate(response.data); // Set updated candidate details
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};

export const handleGetCandidateById = async (setCandidate, setMessage) => {
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `${BASE_URL}/candidate/getCandidateById/${candidateId}`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        setCandidate(response.data); // Set candidate details
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};