import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../apiConfig';

export const fetchPendingLeaves = async (setMessage, setLoading, setPendingLeaves) => {    //need to test
    try {
        setLoading(true);
        setMessage('');
        setPendingLeaves([]);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allPendingLeaves`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });

        setPendingLeaves(response.data);
        setMessage("Pending leaves fetched successfully.");
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchLeavesOfEmployee = async (e, setMessage, setLoading, setLeaves) => {    //need to test
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');
        setLeaves([]);

        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token is missing. Please log in again.");
        }

        const response = await axios.get(`${BASE_URL}/admin/allLeaves/${employeeId}`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });

        setLeaves(response.data);
        setMessage("Leaves fetched successfully.");
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const handleLeaveResponse = async (e, setMessage, setLoading, leaveResponse, setResponseLeave) => {  //need to test
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');
        setResponseLeave(null);

        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token is missing. Please log in again.");
        }

        const { leaveId, status } = leaveResponse;

        const response = await axios.patch(
            `${BASE_URL}/admin/response/${leaveId}/${status}`,
            {},
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setResponseLeave(response.data);
        setMessage("Response submitted successfully.");
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchAllLeaves = async (e, setMessage, setLoading, setLeaves) => {    //Need to test
    try {
        setLoading(true);
        setMessage('');
        setLeaves([]);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allLeaves`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });

        setLeaves(response.data);
        setMessage("Leave history fetched successfully.");
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

