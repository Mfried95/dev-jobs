import React, { useState } from 'react';
import "../styles/searchbar.css";

import logo from "/public/assets/logos/blogr.svg"

import data from '../utils/data.js';


const Searchbar = () => {
  const [searchParams, setSearchParams] = useState({
    search: '',
    fullTime: false,
    location: ''
  });
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (event) => {
    setSearchParams({
      ...searchParams,
      search: event.target.value
    });
  };

  const handleCheckboxChange = (event) => {
    setSearchParams({
      ...searchParams,
      fullTime: event.target.checked
    });
  };

  const handleLocationChange = (event) => {
    setSearchParams({
      ...searchParams,
      location: event.target.value
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();

    // Filter the data based on the search parameters
    const filteredData = data.filter((item) => {
      const { search, fullTime, location } = searchParams;

      // Check if the item's position contains the search keyword
      if (search && !item.position.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      // Check if the item's location matches the search location
      if (location && !item.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      // Check if full-time filter is enabled and the item is not full-time
      if (fullTime && !item.isFullTime) {
        return false;
      }


      return true;
    });

    console.log(filteredData);

    setFilteredData(filteredData);

    setSearchParams({
      search: '',
      fullTime: false,
      location: ''
    });
  };

  return (
    <div>
      <form onSubmit={handleSearch} className='search-form-container'>
        <input
          type="text"
          placeholder="Filter by title"
          value={searchParams.search}
          onChange={handleInputChange}
        />

        <input
          className='location-form'
          type="text"
          placeholder="Filter by location"
          value={searchParams.location}
          onChange={handleLocationChange}
        />

        <input
          className='checkbox-form'
          type="checkbox"
          id="fullTime"
          checked={searchParams.fullTime}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="fullTime">Full-time</label>

        <button type="submit">Search</button>
      </form>

      <div className="data-container">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id} className="data-item">
              <div className="logo-container" style={{backgroundColor: `${item.logoBackground}`}}>
            <img src={item.logo} alt="" />
            </div>
              <p>{item.position}</p>
            </div>
          ))
        ) : (
          <div className="data-container">
        {data.map((item) => (
          <div key={item.id} className="data-item">
            <div className="logo-container" style={{backgroundColor: `${item.logoBackground}`}}>
            <img src={item.logo} alt="" />
            </div>
              <p>{item.position}</p>
            
          </div>
        ))}
      </div>
      
        )}
      </div>
    </div>
  );
};

export default Searchbar;