import React from "react";
import { useState } from "react";
import { BASE_URL } from "../apiConfig";
import axios from "axios";

export const handleViewProfile = async (setMessage, setEmployee) => {
    setMessage('');
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
            `${BASE_URL}/employee/viewProfile`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        setEmployee(response.data); // Set employee profile data
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};

export const handleUpdateProfile = async (e, setMessage, setUpdatedProfile, updatedProfile) => {
    e.preventDefault();
    setMessage('');

    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(
            `${BASE_URL}/employee/updateProfile`,
            updatedProfile,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        setMessage('Profile updated successfully!');
        setUpdatedProfile(response.data); // Update the form with the updated data
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};

export const handleUpdatePassword = async (e, setMessage, passwordData, setPasswordData) => {
    e.preventDefault();
    setMessage('');

    // Validation: Check if new password matches confirm password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
        setMessage('Passwords do not match.');
        return;
    }

    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(
            `${BASE_URL}/employee/updatePassword`,
            passwordData,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        setMessage(response.data); // Success message from the server
        setPasswordData({ newPassword: '', confirmPassword: '' }); // Clear the form
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};

export const handleAddAddress = async (e, setMessage, addressData, setAddressData ) => {
    e.preventDefault();
    setMessage('');

    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
            `${BASE_URL}/employee/address`,
            addressData,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        setMessage("Address added successfully!");
        setAddressData({
            houseNumber: '',
            colony: '',
            pincode: '',
            city: '',
            state: '',
        }); // Clear the form after success
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};

export const handleUpdateAddress = async (e, setMessage, addressData) => {
    e.preventDefault();
    setMessage('');

    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(
            `${BASE_URL}/employee/address/${addressData.addressId}`,
            {
                houseNumber: addressData.houseNumber,
                colony: addressData.colony,
                pincode: addressData.pincode,
                city: addressData.city,
                state: addressData.state,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        setMessage("Address updated successfully!");
    } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
};

export const fetchAllAddresses = async (setAddresses) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/employee/address`, {
            headers: {
                Authorization: token,
            },
        });
        setAddresses(response.data);
    } catch (error) {
        console.error("Error fetching addresses:", error);
    }
};

export const deleteAddress = async (addressId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(`${BASE_URL}/employee/address/${addressId}`, {
            headers: {
                Authorization: token,
            },
        });
        alert("Address deleted successfully!");
        fetchAllAddresses(); // Refresh the list
    } catch (error) {
        console.error("Error deleting address:", error);
    }
};

