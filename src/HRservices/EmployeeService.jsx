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

export const handleDeleteEmployee = async (e, setMessage, employeeId, setEmployeeId) => {
    e.preventDefault();

    if (!employeeId) {
        alert("Please enter an Employee ID.");
        return;
    }

    if (window.confirm(`Are you sure you want to delete employee with ID ${employeeId}?`)) {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.delete(
                `${BASE_URL}/admin/employees/${employeeId}`,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );
            setMessage(`Employee deleted successfully`);
            setEmployeeId(""); // Clear the form field
        } catch (error) {
            setMessage(
                error.response?.data?.message || "An error occurred while adding the employee."
            );
        }
    }
};

export const handleGetEmployeeById = async (e, setMessage, employeeId, setEmployeeData, setLoading) => {    
    e.preventDefault();

    try {
        setLoading(true);
        setEmployeeData(null);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/employees/byEmployeeId/${employeeId}`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            }
        });

        // console.log(response)

        setEmployeeData(response.data);
        setLoading(false);
        // setMessage(`Employee fetched successfully: ${JSON.stringify(response.data)}`);
    }
    catch (error) {
        console.log(error.response.data.message)
        setEmployeeData(null);
        setLoading(false);
        setMessage(error.response.data.message);
    }
};

export const handleGetEmployeeByUsername = async (e, setMessage, username, setEmployeeData, setLoading) => { 
    e.preventDefault();

    try {
        setLoading(true);
        setEmployeeData(null);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/employees/byUserName/${username}`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });

        setEmployeeData(response.data);
        setLoading(false);
        // setMessage(`Employee fetched successfully: ${JSON.stringify(response.data)}`);
    } 
    catch (error) {
        setEmployeeData(null);
        setLoading(false);
        setMessage(`Error fetching employee: ${error.response?.data?.message || error.message}`);
    }
};

export const handleGetAllEmployees = async (e, setMessage, setLoading, setAllEmployees) => {
    e.preventDefault();
    try
    {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/employees`,
            {
                headers:{
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            }
        )
        setAllEmployees(response.data)
    }
    catch(error)
    {
        setMessage(`Error getting all employees`);
    }
}

export const handleEmployeeChangeRole = async (e, setMessage, setLoading, changeRole) => {
    e.preventDefault();
    try
    {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.patch(`${BASE_URL}/admin/employees/setNewRole/${changeRole.employeeId}/${changeRole.newRole}`,
            {},{
                headers:{
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            }
        );
        // setChangeRole(null);
        setMessage("Successful");
    }
    catch(error)
    {
        setMessage(`error: ${error.message}`);
    }
}

export const handleEmployeeChangeSalary = async (e, setMessage, setLoading, changeSalary) => {
    e.preventDefault();
    try
    {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.patch(`${BASE_URL}/admin/employees/setNewSalary/${changeSalary.employeeId}/${changeSalary.employeeSalary}/${changeSalary.bonusThatYear}/${changeSalary.benefitPoints}`,
            {},{
                headers:{
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            }
        );
        // setChangeRole(null);
        setMessage("Successful");
    }
    catch(error)
    {
        setMessage(`error: ${error.message}`);
    }
}

export const handleEmployeeChangeDepartment = async (e, setMessage, setLoading, changeDepartment) => {
    e.preventDefault();

    try
    {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.patch(`${BASE_URL}/admin/employees/setNewDepartment/${changeDepartment.employeeId}/${changeDepartment.departmentId}`,
            {},{
                headers:{
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            }
        );
        // setChangeRole(null);
        setMessage("Successful");
    }
    catch(error)
    {
        setMessage(`error: ${error.message}`);
    }
}

export const fetchEmployeeSalaryDetails = async (e, setMessage, setLoading, setSalaryDetails) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSalaryDetails([]);
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/employees/salaryInfo/${employeeId}`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setSalaryDetails(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const fetchEmployeeEquipmentDetails = async (e, setMessage, setLoading, setEquipmentDetails) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setEquipmentDetails([]);
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/admin/employees/equipmentInfo/${employeeId}`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        setEquipmentDetails(response.data);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};

export const handleAssignEquipment = async (e, setMessage) => {
    e.preventDefault();
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
            `${BASE_URL}/admin/equipments/${employeeId}`,
            equipment,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            }
        );
        setMessage(`Success: ${response.data}`);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};

export const handleUnassignEquipment = async (e, setMessage) => {
    e.preventDefault();
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(
            `${BASE_URL}/admin/equipments/${equipmentId}`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            }
        );
        setMessage(`Success: Equipment unassigned successfully!`);
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};
