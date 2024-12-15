import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../apiConfig';

export const handleViewYourProfile = async (e, setMessage, setEmployeeData, setLoading) => {
    e.preventDefault();

    try {
        setLoading(true);
        setEmployeeData(null);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/viewProfile`, {
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

export const handleRegisterHR = async (e, setMessage, setLoading, hrFormData, setEmployeeData, setHRFormData) => {
    e.preventDefault();

    try
    {
        setLoading(true);
        setEmployeeData(null);
        const token = localStorage.getItem("authToken");
        const response = await axios.post(`${BASE_URL}/admin/registerAdmin`,
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

export const handleUpdatePassword = async (e, setMessage, setLoading, updatePasswordFormData, setEmployeeData, setUpdatePasswordFormData) => {
    e.preventDefault();
    
    try
    {
        setLoading(true);
        setEmployeeData(null);
        const token = localStorage.getItem("authToken");
        const response = await axios.put(`${BASE_URL}/admin/updatePassword`,
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