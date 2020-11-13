import React from "react";
import "./header.css";
import logo from "../../images/logo.png";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { ExpandMore, Language } from "@material-ui/icons";

const Header = () => {
  return (
    <div className="header">
      <img className="header-icon" src={logo} alt="logo" />
      <div className="header-center">
        <input type="text" />
        <SearchIcon />
      </div>
      <div className="header-right">
        <p>Become a Host</p>
        <Language />
        <ExpandMore />
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
