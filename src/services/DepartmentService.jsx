import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../apiConfig';

export const handleAddDepartment = async (e, setMessage) => {
    e.preventDefault();

    try {
        const response = await axios.post(
        `${BASE_URL}/admin/departments`,
        { departmentName },
        {
            headers: {
            Authorization: localStorage.getItem('authToken'),
            "Content-Type": "application/json",
            },
        }
        );
        setMessage(`Department added successfully: ${response.data.departmentName}`);
    } catch (error) {
        setMessage(
        error.response?.data?.message || "An error occurred while adding the department."
        );
    }
};

export const handleUpdateDepartmentName = async (e, setMessage) => {
    e.preventDefault();
    try {
        setLoading(true);

        const token = localStorage.getItem("authToken");
        const response = await axios.put(
            `${BASE_URL}/${updateDept.deptId}`,
            {
                departmentName: updateDept.newDeptName, 
            },
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setUpdateDept({
            deptId: '',
            newDeptName: '',
        });

        setMessage(`Department updated successfully`);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
};

export const handleDeleteDepartment = async (e, setMessage) => {
    e.preventDefault();
    try {
        setLoading(true);

        const token = localStorage.getItem("authToken");
        const response = await axios.delete(
            `${BASE_URL}/${deleteDept.deptId}`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDeleteDept({
            deptId: '',
        });

        setMessage(`Department deleted successfully`);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
};

export const handleGetDepartmentById = async (e, setMessage) => {
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');
        setDepartment(null);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `${BASE_URL}/admin/departments/${departmentId}`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDepartment(response.data);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
};

export const handleGetAllDepartments = async () => {
    try {
        setLoading(true);
        setMessage('');
        setDepartments([]);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `${BASE_URL}/admin/departments`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDepartments(response.data);
    } catch (error) {
        setMessage(
            `Error: ${error.response?.data?.message || error.message}`
        );
    } finally {
        setLoading(false);
    }
};

export const handleGetDepartmentByName = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');
        setDepartment(null);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `${BASE_URL}/admin/departments/name/${departmentName}`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDepartment(response.data);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
};

export const fetchDepartmentsSortedByName = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');
        setDepartment(null);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `${BASE_URL}/admin/departments/sortByNameAsc`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDepartments(response.data);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
}

export const fetchDepartmentsSortedByNameDesc = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');
        setDepartment(null);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `${BASE_URL}/admin/departments/sortByNameDesc`,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        setDepartments(response.data);
    } catch (error) {
        setMessage(
            `Error`
        );
    } finally {
        setLoading(false);
    }
}
