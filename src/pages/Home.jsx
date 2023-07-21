import React from "react";

import Header from "../components/Header";
import Searchbar from "../components/Searchbar";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="home-search">
      <Searchbar />
      </div>
    </div>
  );
};

export default Home;
