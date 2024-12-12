import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../apiConfig';

export const handleAddEmployee = async (e, setMessage) => {
    e.preventDefault();

    const employeeData = {
        name: document.getElementById("employeeName").value,
        role: document.getElementById("role").value,
        gender: document.getElementById("gender").value,
        salary: parseFloat(document.getElementById("salary").value),
        phoneNo: document.getElementById("phoneNo").value,
        dateOfBirth: document.getElementById("dateOfBirth").value,
        email: document.getElementById("email").value
    };

    const departmentId = document.getElementById("departmentId").value;

    try {
        const token = localStorage.getItem("authToken"); // Retrieve stored token

        const response = await axios.post(
            `${BASE_URL}/admin/employees/${departmentId}`,
            employeeData,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );
        setMessage(`Employee added successfully`);
        document.getElementById("addEmployeeForm").reset();
    } catch (error) {
        setMessage(
            error.response?.data?.message || "An error occurred while adding the employee."
        );
    }
};