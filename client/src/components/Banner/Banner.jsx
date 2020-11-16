import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./banner.css";
import Search from "../Search/Search";
import { useHistory } from "react-router-dom";

const Banner = () => {
  const history = useHistory();
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
          {showSearch ? "Hide" : "Search"}
        </Button>
        {showSearch && <Search />}
      </div>
      <div className="banner-info">
        <h1>Get out and stretch your imagination!</h1>
        <h5>Plan a different kind of getaway!</h5>
        <Button onClick={() => history.push("/search")} variant="outlined">
          Explore Nearby
        </Button>
      </div>
    </div>
  );
};

export default Banner;
