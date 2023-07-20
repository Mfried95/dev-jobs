// JobDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import data from "../utils/data.js";

import Header from "../components/Header.jsx";
import Searchbar from "../components/Searchbar.jsx";

const JobDetails = () => {
  const { id } = useParams();
  const job = data.find((item) => item.id === parseInt(id));

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      {/* Display the job details here */}
      <h2>{job.position}</h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      {/* Add other job details you want to display */}
    </div>
  );
};

export default JobDetails;