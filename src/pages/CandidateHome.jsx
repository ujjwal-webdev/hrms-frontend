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
                <h5 className="text-primary">Apply for Job</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={candidate.firstName}
                            onChange={handleApplyJobChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={candidate.lastName}
                            onChange={handleApplyJobChange}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
                <div className="row g-3 mt-3">
                    <div className="col-md-4">
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={candidate.age}
                            onChange={handleApplyJobChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Gender</label>
                        <select
                            name="gender"
                            value={candidate.gender}
                            onChange={handleApplyJobChange}
                            className="form-select"
                            required
                        >
                            <option value="" disabled>
                                 Select Gender
                            </option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNo"
                            value={candidate.phoneNo}
                            onChange={handleApplyJobChange}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={candidate.dateOfBirth}
                        onChange={handleApplyJobChange}
                        className="form-control"
                        required
                    />
                </div>
                <h5 className="text-primary mt-4">Account Information</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={candidate.email}
                            onChange={handleApplyJobChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={candidate.userName}
                            onChange={handleApplyJobChange}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={candidate.password}
                        onChange={handleApplyJobChange}
                        className="form-control"
                        required
                    />
                </div>
                <h5 className="text-primary mt-4">Work Experience</h5>
                <div className="mb-3">
                    <label className="form-label">Work Company 1</label>
                    <input
                        type="text"
                        name="workCompany1"
                        value={candidate.workCompany1}
                        onChange={handleApplyJobChange}
                        placeholder="Company name"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Work Company 1 Skills</label>
                    <input
                        type="text"
                        name="workCompany1Skills"
                        value={candidate.workCompany1Skills}
                        onChange={handleApplyJobChange}
                        placeholder="Skills used"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Work Company 1 Description</label>
                    <textarea
                        name="workCompany1Description"
                        value={candidate.workCompany1Description}
                        onChange={handleApplyJobChange}
                        placeholder="Describe your role"
                        className="form-control"
                        rows="3"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Work Company 2</label>
                    <input
                        type="text"
                        name="workCompany2"
                        value={candidate.workCompany2}
                        onChange={handleApplyJobChange}
                        placeholder="Company name"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Work Company 2 Skills</label>
                    <input
                        type="text"
                        name="workCompany2Skills"
                        value={candidate.workCompany2Skills}
                        onChange={handleApplyJobChange}
                        placeholder="Skills used"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Work Company 2 Description</label>
                    <textarea
                        name="workCompany2Description"
                        value={candidate.workCompany2Description}
                        onChange={handleApplyJobChange}
                        placeholder="Describe your role"
                        className="form-control"
                        rows="3"
                    ></textarea>
                </div>
                <h5 className="text-primary mt-4">Education</h5>
                <div className="mb-3">
                    <label className="form-label">Education 1</label>
                    <input
                        type="text"
                        name="education1"
                        value={candidate.education1}
                        onChange={handleApplyJobChange}
                        placeholder="Institution name"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Education 1 Description</label>
                    <textarea
                        name="education1Description"
                        value={candidate.education1Description}
                        onChange={handleApplyJobChange}
                        placeholder="Describe your education"
                        className="form-control"
                        rows="3"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Education 2</label>
                    <input
                        type="text"
                        name="education2"
                        value={candidate.education2}
                        onChange={handleApplyJobChange}
                        placeholder="Institution name"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Education 2 Description</label>
                    <textarea
                        name="education2Description"
                        value={candidate.education2Description}
                        onChange={handleApplyJobChange}
                        placeholder="Describe your education"
                        className="form-control"
                        rows="3"
                    ></textarea>
                </div>
                <h5 className="text-primary mt-4">Address</h5>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea
                            name="address"
                            value={candidate.address}
                            onChange={handleApplyJobChange}
                            placeholder="Enter your address"
                            className="form-control"
                            rows="3"
                        ></textarea>
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
