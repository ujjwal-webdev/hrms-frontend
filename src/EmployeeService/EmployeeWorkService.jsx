import React from "react";
import { useState } from "react";
import { BASE_URL } from "../apiConfig";
import axios from "axios";

export const getAllWorksHandler = async (setMessage, setWorkList) => {    //need to test
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/employee/works`, {
            headers: {
                Authorization: token,
            },
        });
        setWorkList(response.data);
        setMessage("All works fetched successfully!");
    } catch (error) {
        console.error("Error fetching all works:", error);
        setMessage("Failed to fetch all works.");
    }
};

export const changeWorkStatusHandler = async (setMessage, workId) => {   //need to test
    if (!workId) {
        alert('Please enter a valid work ID.');
        return;
    }

    try {
        const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
        const response = await axios.put(`${BASE_URL}/employee/changeStatus/${workId}`, {}, {
            headers: {
                Authorization: token,
            },
        });

        // Show success message
        setMessage(response.data); // Assuming the response contains a success message
    } catch (error) {
        console.error('Error changing work status:', error);
        setMessage('Failed to change work status.');
    }
};

export const addEducationHandler = async (e, setMessage, education, setEducation) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
            `${BASE_URL}/employee/education`, 
            education, 
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        setMessage("Education added successfully!");
        setEducation({
            instituteName: "",
            qualification: "",
            major: "",
        });
    } catch (error) {
        console.error("Error adding education:", error);
        setMessage("Failed to add education.");
    }
};

export const addWorkExperienceHandler = async (e, workExperience, setWorkExperience) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
            `${BASE_URL}/employee/work-experience`, 
            workExperience, 
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        setMessage("Work Experience added successfully!");
        setWorkExperience({
            companyName: "",
            designation: "",
            startDate: "",
            endDate: "",
            description: "",
            skillsUsed: "",
        });
    } catch (error) {
        console.error("Error adding work experience:", error);
        setMessage("Failed to add work experience.");
    }
};

export const addSkillHandler = async (e, setMessage,setSkill) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
            `${BASE_URL}/employee/skills`, 
            skill, 
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        setMessage("Skill added successfully!");
        setSkill({
            name: "",
            proficiency: "",
            yearsOfExperience: "",
        });
    } catch (error) {
        console.error("Error adding skill:", error);
        setMessage("Failed to add skill.");
    }
};

