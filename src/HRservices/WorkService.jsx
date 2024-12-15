import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../apiConfig';

export const handleAssignWork = async (e, setMessage, setLoading, workDetails, setWorkDetails) => {
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');

        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token is missing. Please log in again.");
        }

        const { empId, name, description, endDate } = workDetails;

        const response = await axios.post(
            `${BASE_URL}/admin/work/${empId}`,
            { name, description, endDate },
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setMessage(response.data || "Work assigned successfully.");
        setWorkDetails({ empId: '', name: '', description: '', endDate: '' });
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const handleDeleteWork = async (e, setMessage, setLoading, workId, setWorkId) => {
    e.preventDefault();
    try {
        setLoading(true);
        // setError(false);
        setMessage('');

        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token is missing. Please log in again.");
        }

        const response = await axios.delete(`${BASE_URL}/admin/work/${workId}`, {
            headers: {
                Authorization: token,
            },
        });

        setMessage("Work deleted successfully.");
        setWorkId('');
    } catch (error) {
        // setError(true);
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const handleUpdateWork = async (e, setMessage, setLoading, updateWorkDetails, setUpdateWorkDetails) => {
    e.preventDefault();
    try {
        setLoading(true);
        // setError(false);
        setMessage('');

        const { workId, ...workData } = updateWorkDetails;

        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token is missing. Please log in again.");
        }

        const response = await axios.put(`${BASE_URL}/admin/work/${workId}`, workData, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });

        setMessage("Work updated successfully.");
        setUpdateWorkDetails({
            workId: '',
            name: '',
            description: '',
            endDate: ''
        });
    } catch (error) {
        // setError(true);
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const handleAssignGroupWork = async (e, setLoading, setMessage, groupWorkDetails, setGroupWorkDetails) => {
    e.preventDefault();
    try {
        setLoading(true);
        // setError(false);
        setMessage('');

        const { leaderId, employeesId, workName, workDescription, endDate } = groupWorkDetails;

        // Prepare the payload
        const payload = {
            leaderId: parseInt(leaderId),
            employeesId: employeesId.split(',').map((id) => parseInt(id.trim())),
            work: {
                name: workName,
                description: workDescription,
                endDate,
            },
        };

        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authentication token is missing. Please log in again.");
        }

        const response = await axios.post(`${BASE_URL}/admin/work`, payload, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });

        setMessage("Work assigned successfully.");
        setGroupWorkDetails({
            leaderId: '',
            employeesId: '',
            workName: '',
            workDescription: '',
            endDate: '',
        });
    } catch (error) {
        // setError(true);
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchAllWorks = async (setLoading, setMessage, setWorks) => {
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allWorks`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        console.log(response.data)
        setWorks(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchAllIndividualWorks = async (setLoading, setMessage, setIndividualWorks) => {
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allIndividualWorks`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setIndividualWorks(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchAllGroupWorks = async (setMessage, setLoading, setGroupWorks) => {
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allGroupWorks`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setGroupWorks(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchAllPendingWorks = async (setLoading, setMessage, setPendingWorks) => {
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allPendingWorks`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setPendingWorks(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchIndividualPendingWorks = async (setLoading, setMessage, setIndividualPendingWorks) => {
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allIndividualPendingWorks`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setIndividualPendingWorks(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchGroupPendingWorks = async (setLoading, setMessage, setGroupPendingWorks) => {
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allGroupPendingWorks`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setGroupPendingWorks(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchAllCompletedWorks = async (setLoading, setMessage, setAllCompletedWorks) => {    //need to test
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allCompletedWorks`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setAllCompletedWorks(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchAllIndividualCompletedWorks = async (setLoading, setMessage, setAllIndividualCompletedWorks) => {    //need to test
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allIndividualCompletedWorks`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setAllIndividualCompletedWorks(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchAllGroupCompletedWorks = async (setLoading, setMessage, setAllGroupCompletedWorks) => {    //need to test
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allGroupCompletedWorks`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setAllGroupCompletedWorks(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchIndividualCompletedWorks = async (setLoading, setMessage, setIndividualCompletedWorks) => { //Need to test
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allIndividualInCompletedWorks`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setIndividualCompletedWorks(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchGroupCompletedWorks = async (setLoading, setMessage, setGroupCompletedWorks) => {
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/allGroupInCompletedWorks`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setGroupCompletedWorks(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

