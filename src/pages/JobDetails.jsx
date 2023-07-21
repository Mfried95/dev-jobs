// JobDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import data from "../utils/data.js";

import Header from "../components/Header.jsx";

import "../styles/jobdetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const job = data.find((item) => item.id === parseInt(id));

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="job-detail-header">
        <div
          className="logo-container"
          style={{ backgroundColor: `${job.logoBackground}` }}
        >
          <img src={job.logo} alt="" />
        </div>

        <div className="job-header-info">
          <span>{job.company}</span>
          <p>{job.website}</p>
          <a
            href={job.website}
            target="_blank"
            rel="noopener noreferrer"
            className="company-button"
          >
            Company Site
          </a>
        </div>
      </div>
      
      <div className="all-job-info">
        <header>
          <p>{job.postedAt}</p>
          <h2>{job.position}</h2>
          <span>{job.location}</span>
            <a href={job.apply}>Apply Now</a>
        </header>

      <div className="job-content">
        {job.description}
        <h2>Requirements</h2>
        {job.requirements.content}
        {job.requirements.items}
          <h2>What You Will Do</h2>
          {job.role.content}
          {job.role.items}
      </div>
      <a href={job.apply}>Apply Now</a>
      </div>
    </div>
  );
};

export default JobDetails;
