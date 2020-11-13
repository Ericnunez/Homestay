import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./banner.css";
const Banner = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="banner">
      <div className="banner-search">
        <Button
          onClick={() => {
            setShowSearch(!showSearch);
          }}
          className="banner-search-button"
          variant="outlined"
        >
          Search Dates
        </Button>
      </div>
      {showSearch && <h1>Date picker</h1>}
      <div className="banner-info">
        <h1>Get out and stretch your imagination!</h1>
        <h5>Plan a different kind of getaway!</h5>
        <Button variant="outlined">Explore</Button>
      </div>
    </div>
  );
};

export default Banner;
