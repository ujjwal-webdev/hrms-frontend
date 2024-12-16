import React, { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { useLocation } from 'react-router-dom';

export default function CandidateHome() {

  const location = useLocation();

  const { sharedState } = location.state || {};

  const [message, setMessage] = useState('');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [jobId, setJobId] = useState('')

  const [candidate, setCandidate] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phoneNo: "",
    dateOfBirth: "",
    email: "",
    userName: "",
    password: "",
    workCompany1: "",
    workCompany1Skills: "",
    workCompany1Description: "",
    workCompany2: "",
    workCompany2Skills: "",
    workCompany2Description: "",
    education1: "",
    education1Description: "",
    education2: "",
    education2Description: "",
    address: ""
  })

  const handleApplyJobChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prevCandidate) => ({
        ...prevCandidate,
        [name]: value,
    }));
  };

  const applyJobHandler = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
            `http://localhost:8896/candidate/apply/${jobId}`,
            candidate,
        );
        setMessage("Application submitted successfully!");
        setCandidate({
            firstName: "",
            lastName: "",
            age: "",
            gender: "",
            phoneNo: "",
            dateOfBirth: "",
            email: "",
            userName: "",
            password: "",
            workCompany1: "",
            workCompany1Skills: "",
            workCompany1Description: "",
            workCompany2: "",
            workCompany2Skills: "",
            workCompany2Description: "",
            education1: "",
            education1Description: "",
            education2: "",
            education2Description: "",
            address: ""
        });
    } catch (error) {
        console.error("Error applying for the job:", error);
        setMessage("Failed to apply for the job. Please try again.");
  }
};

const [email, setEmail] = useState("");
const [applications, setApplications] = useState([]);

const handleGetMyApplications = async () => {
  try {
      const response = await axios.get(
          `${BASE_URL}/candidate/getMyApplications`, 
          { params: { email } }
      );

      // Log the full response data for initial verification
      console.log("Full Response Data:", response.data);

      // Extract sharedState (logged-in candidate ID)
      const loggedInCandidateId = sharedState;
      console.log("Logged In Candidate ID:", loggedInCandidateId);

      // Filter applications for the logged-in candidate
      const filteredApplications = response.data.map((job, index) => {
          // console.log(`Processing Job ${index}:`, job);

          // Log the jobCandidates array for the current job
          // console.log(`Job ${job.jobId} Candidates:`, job.jobCandidates);

          const candidate = job.jobCandidates.find(candidate => {
              // console.log(
              //     `Checking Candidate ID: ${candidate.jobCandidateId}, Matching with Logged-In ID: ${loggedInCandidateId}`
              // );
              return String(candidate.jobCandidateId) === String(loggedInCandidateId);
          });

          // Log whether a matching candidate was found
          if (candidate) {
              // console.log("Match Found:", candidate);
              return {
                  jobId: job.jobId,
                  description: job.description,
                  position: job.position,
                  experienceRequired: job.experienceRequired,
                  status: candidate.status, // Include candidate's status
              };
          } else {
              // console.log("No Match Found for Job:", job.jobId);
          }

          return null; // Exclude jobs where the candidate is not present
      }).filter(job => job !== null); // Remove null values

      console.log("Filtered Applications:", filteredApplications);

      setApplications(filteredApplications);
  } catch (error) {
      console.log("Error fetching applications", error);
      setMessage("Failed to fetch applications. Please check the email and try again.");
  }
};




const [jobs, setJobs] = useState([]);

const handleGetAllJobs = async () => {
  try {
      const response = await axios.get(`${BASE_URL}/candidate/getAllJobs`);
      setJobs(response.data);
  } catch (error) {
      console.log("Error fetching jobs", error);
      setMessage("Failed to fetch jobs. Please try again later.");
  }
};

  const renderForm = () => {
    switch(selectedFeature)
    {
      case 'applyJob':
        return (
            <div className="mt-4">
                <h3>Apply for Job</h3>
                <form onSubmit={applyJobHandler}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            value={candidate.firstName}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control"
                            value={candidate.lastName}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            className="form-control"
                            value={candidate.age}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            className="form-control"
                            value={candidate.gender}
                            onChange={handleApplyJobChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNo">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNo"
                            name="phoneNo"
                            className="form-control"
                            value={candidate.phoneNo}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input
                            type="Date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            className="form-control"
                            value={candidate.dateOfBirth}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={candidate.email}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            className="form-control"
                            value={candidate.userName}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={candidate.password}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workCompany1">Work Company 1 Name</label>
                        <input
                            type="text"
                            id="workCompany1"
                            name="workCompany1"
                            className="form-control"
                            value={candidate.workCompany1}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workCompany1Skills">Work Company 1 Skills</label>
                        <input
                            type="text"
                            id="workCompany1Skills"
                            name="workCompany1Skills"
                            className="form-control"
                            value={candidate.workCompany1Skills}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workCompany1Description">Work Company 1 Description</label>
                        <input
                            type="text"
                            id="workCompany1Description"
                            name="workCompany1Description"
                            className="form-control"
                            value={candidate.workCompany1Description}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workCompany2">Work Company 2 Name</label>
                        <input
                            type="text"
                            id="workCompany2"
                            name="workCompany2"
                            className="form-control"
                            value={candidate.workCompany2}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workCompany2Skills">Work Company 2 Skills</label>
                        <input
                            type="text"
                            id="workCompany2Skills"
                            name="workCompany2Skills"
                            className="form-control"
                            value={candidate.workCompany2Skills}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workCompany2Description">Work Company 2 Description</label>
                        <input
                            type="text"
                            id="workCompany2Description"
                            name="workCompany2Description"
                            className="form-control"
                            value={candidate.workCompany2Description}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="education1">Education 1 Institute Name</label>
                        <input
                            type="text"
                            id="education1"
                            name="education1"
                            className="form-control"
                            value={candidate.education1}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="education1Description">Education 1 Description</label>
                        <input
                            type="text"
                            id="education1Description"
                            name="education1Description"
                            className="form-control"
                            value={candidate.education1Description}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="education2">Education 2 Institute Name</label>
                        <input
                            type="text"
                            id="education2"
                            name="education2"
                            className="form-control"
                            value={candidate.education2}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="education2Description">Education 2 Description</label>
                        <input
                            type="text"
                            id="education2Description"
                            name="education2Description"
                            className="form-control"
                            value={candidate.education2Description}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="form-control"
                            value={candidate.address}
                            onChange={handleApplyJobChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                      <label htmlFor="jobId">Job ID</label>
                      <input
                          type="number"
                          id="jobId"
                          name="jobId"
                          className="form-control"
                          value={jobId}
                          onChange={(e) => setJobId(e.target.value)}
                          required
                      />
                  </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        Apply for Job
                    </button>
                </form>
                <p>{message}</p>
            </div>
        );
      
      case 'getMyApplications':
        return (
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    className="btn btn-primary mt-3"
                    onClick={handleGetMyApplications}
                >
                    Get My Applications
                </button>
    
                <div className="mt-4">
                    {applications.length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Job ID</th>
                                    <th>Position</th>
                                    <th>Description</th>
                                    <th>Experience Required</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((job) => (
                                    <tr key={job.jobId}>
                                        <td>{job.jobId}</td>
                                        <td>{job.position}</td>
                                        <td>{job.description}</td>
                                        <td>{job.experienceRequired}</td>
                                        <td>{job.status}</td>
                                    </tr>
                                ))}

{/* {applications.map(application => (
                                  <div key={application.jobId}>
                                      <p>{application.jobid}</p>
                                      <p>{application.position}</p>
                                      <p>{application.description}</p>
                                      <p>{application.experienceRequired}</p>
                                      <p>{application.status}</p>
                                  </div> */}
                              {/* ))} */}
                            </tbody>
                        </table>
                    ) : (
                        <p>No applications found</p>
                    )}
                </div>
            </div>
        );

      case 'getAllJobs':
        return (
            <div>
                <button
                    className="btn btn-primary mt-3"
                    onClick={handleGetAllJobs}
                >
                    Fetch All Jobs
                </button>
    
                <div className="mt-4">
                    {jobs.length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Job ID</th>
                                    <th>Position</th>
                                    <th>Description</th>
                                    <th>Experience Required</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.jobId}>
                                        <td>{job.jobId}</td>
                                        <td>{job.position}</td>
                                        <td>{job.description}</td>
                                        <td>{job.experienceRequired}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No jobs available</p>
                    )}
                </div>
            </div>
        );
      
      
      
    

      default:
        return null
    }
  }
  return (
    <div className="container mt-5">
        <h1 className="text-center mb-4">Candidate Home</h1>
        <div className="row gy-4">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Apply for a Job</h5>
                        <p className="card-text">Job Application</p>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => setSelectedFeature('applyJob')}>Apply</button>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => setSelectedFeature('getMyApplications')}>Get My Applications</button>
                        <button className="btn btn-primary btn-sm" onClick={() => setSelectedFeature('getAllJobs')}>Get All Jobs</button>
                    </div>
                </div>
            </div>
            
        </div>
        {renderForm()}
    </div>
  )
}
