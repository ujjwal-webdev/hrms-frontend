import React from "react";
import { useState } from "react";
import { BASE_URL } from "../apiConfig";
import axios from "axios";

export const submitLeaveRequest = async (e, setMessage, setLeaveData, leaveData) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(`${BASE_URL}/employee/leave`, leaveData, {
            headers: {
                Authorization: token,
            },
        });
        setMessage("Leave request submitted successfully!");
        setLeaveData({
            reason: "",
            leaveStartDate: "",
            leaveEndDate: "",
        });
    } catch (error) {
        console.log(error);
        console.error("Error submitting leave request:", error);
        setMessage("Failed to submit leave request.");
    }
};

export const submitUpdatedLeave = async (e, setMessage, setLeaveData, leaveData) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(`${BASE_URL}/employee/leave`, leaveData, {
            headers: {
                Authorization: token,
            },
        });
        setMessage("Leave updated successfully!");
        setLeaveData({
            reason: "",
            leaveStartDate: "",
            leaveEndDate: "",
        });
    } catch (error) {
        console.error("Error updating leave:", error);
        setMessage("Failed to update leave.");
    }
};

export const deletePendingLeaveHandler = async (setMessage) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(`${BASE_URL}/employee/leave`, {
            headers: {
                Authorization: token,
            },
        });
        setMessage("Pending leave deleted successfully!");
        console.log("Deleted Leave Details:", response.data);
    } catch (error) {
        console.error("Error deleting pending leave:", error);
        setMessage("Failed to delete pending leave.");
    }
};

export const checkLeaveStatusHandler = async (setMessage, setLeaveStatus) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/employee/leave`, {
            headers: {
                Authorization: token,
            },
        });
        setLeaveStatus(response.data);
        setMessage("Leave status fetched successfully!");
    } catch (error) {
        console.error("Error fetching leave status:", error);
        setMessage(error.response.data.message);
    }
};

export const getAllLeavesHandler = async (setLeaveList, setMessage) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/employee/allLeaves`, {
            headers: {
                Authorization: token,
            },
        });
        setLeaveList(response.data);
        setMessage("All leaves fetched successfully!");
    } catch (error) {
        console.error("Error fetching all leaves:", error);
        setMessage("Failed to fetch all leaves.");
    }
};


