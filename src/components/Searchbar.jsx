import React, { useState } from "react";
import "../styles/searchbar.css";
import { Link } from "react-router-dom";
import search from "../assets/desktop/icon-search.svg";
import searchBlue from "../assets/desktop/icon-search-blue.svg";
import data from "../data/data.js";

const Searchbar = () => {
  const [searchParams, setSearchParams] = useState({
    search: "",
    fullTime: false,
    location: "",
  });
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (event) => {
    setSearchParams({
      ...searchParams,
      search: event.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    setSearchParams({
      ...searchParams,
      fullTime: event.target.checked,
    });
  };

  const handleLocationChange = (event) => {
    setSearchParams({
      ...searchParams,
      location: event.target.value,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();

    // Filter the data based on the search parameters
    const filteredData = data.filter((item) => {
      const { search, fullTime, location } = searchParams;

      // Check if the item's position contains the search keyword
      if (
        search &&
        !item.position.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      // Check if the item's location matches the search location
      if (
        location &&
        !item.location.toLowerCase().includes(location.toLowerCase())
      ) {
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
      search: "",
      fullTime: false,
      location: "",
    });
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSearch} className="search-form-container">
      { /** Mobile-searchbar bar stays hidden if its not in mobile view */ }
        <div className="mobile-searchbar">
          <input
            className="title-filter-input"
            type="text"
            placeholder="Filter by title..."
            value={searchParams.search}
            onChange={handleInputChange}
          />
          <button type="submit" onSubmit={handleSearch}>
            <img src={search} alt="" />
          </button>
        </div>
        <div className="desktop-searchbar">
          <button type="submit" onSubmit={handleSearch}>
            <img src={searchBlue} alt="" />
          </button>
          <input
            className="title-filter-input"
            type="text"
            placeholder="Filter by title..."
            value={searchParams.search}
            onChange={handleInputChange}
          />

          <input
            className="location-form"
            type="text"
            placeholder="Filter by location"
            value={searchParams.location}
            onChange={handleLocationChange}
          />

          <input
            className="checkbox-form"
            type="checkbox"
            id="fullTime"
            checked={searchParams.fullTime}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="fullTime">Full-Time</label>

          <button type="submit" className="desktop-tablet-button">
            Search
          </button>
        </div>
      </form>

      <div className="data-container">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Link key={item.id} to={`/job/${item.id}`} className="data-item">
              <div
                className="logo-container"
                style={{ backgroundColor: `${item.logoBackground}` }}
              >
                <img src={item.logo} alt="" />
              </div>
              <div className="job-info">
                <span>{item.postedAt}</span>
                <h2>{item.position}</h2>
                <span>{item.company}</span>
              </div>
              <p className="location-title">{item.location}</p>
            </Link>
          ))
        ) : (
          <div className="data-container">
            {data.map((item) => (
              <Link key={item.id} to={`/job/${item.id}`} className="data-item">
                <div
                  className="logo-container"
                  style={{ backgroundColor: `${item.logoBackground}` }}
                >
                  <img src={item.logo} alt="" />
                </div>
                <div className="job-info">
                  <span>{item.postedAt}</span>
                  <h2>{item.position}</h2>
                  <span>{item.company}</span>
                </div>
                <p className="location-title">{item.location}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
