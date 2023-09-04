import { useState } from "react";
import "../styles/searchbar.css";
import { Link } from "react-router-dom";
import search from "../assets/desktop/icon-search.svg";
import searchBlue from "../assets/desktop/icon-search-blue.svg";
import data from "../data/data.js";

const Searchbar = () => {
  const [searchParams, setSearchParams] = useState("");
  const [fullTime, setFullTime] = useState(false);
  const [location, setLocation] = useState("");
  const [filteredData, setFilteredData] = useState([]);


  const handleSearchChange = (event) => {
    setSearchParams(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setFullTime(event.target.checked);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    // Filter the data based on the search parameters
    const filteredData = data.filter((item) => {
      // Check if the item's position contains the search keyword
      if (
        searchParams &&
        !item.position.toLowerCase().includes(searchParams.toLowerCase())
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
      if (fullTime && !item.contract.toLowerCase().includes("Full Time")) {
        return true;
      }

      setSearchParams("");
      setFullTime(false);
      setLocation("");

      return true;
    });

    console.log(filteredData);

    setFilteredData(filteredData);
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSearch} className="search-form-container">
        {/* Mobile-searchbar stays hidden if it's not in mobile view */}
        <div className="mobile-searchbar">
          <input
            className="title-filter-input"
            type="text"
            placeholder="Filter by title..."
            value={searchParams}
            onChange={handleSearchChange}
          />
          <button type="submit">
            <img src={search} alt="" />
          </button>
        </div>
        <div className="desktop-searchbar">
          <button type="submit">
            <img src={searchBlue} alt="search" />
          </button>
          <input
            className="title-filter-input"
            type="text"
            placeholder="Filter by title..."
            value={searchParams}
            onChange={handleSearchChange}
          />
          <input
            className="location-form"
            type="text"
            placeholder="Filter by location"
            value={location}
            onChange={handleLocationChange}
          />
          <input
            className="checkbox-form"
            type="checkbox"
            id="fullTime"
            checked={fullTime}
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
