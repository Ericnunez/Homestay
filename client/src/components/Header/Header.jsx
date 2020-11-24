import React, { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import logo from "../../images/logo.png";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { ExpandMore, Language } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = (props) => {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [modalVersion, setModalVersion] = useState("");

  const handleClickOpen = (version) => {
    setModalVersion(version);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header className="header">
      <LoginModal
        open={open}
        onClose={handleClose}
        modalversion={modalVersion}
      />
      <Link to="/">
        <img className="header-icon" src={logo} alt="logo" />
      </Link>
      <div className="header-center">
        <input type="text" />
        <SearchIcon />
      </div>
      <div className="header-right">
        <ul>
          {user ? (
            <li>Sign Out</li>
          ) : (
            <React.Fragment>
              {" "}
              <li
                className="login-button"
                onClick={() => {
                  handleClickOpen("login");
                }}
              >
                Login
              </li>
              <li
                className="login-button"
                onClick={() => {
                  handleClickOpen("register");
                }}
              >
                Register
              </li>
            </React.Fragment>
          )}
        </ul>
        {/* <Language /> */}
        <ExpandMore />
        <Avatar />
      </div>
    </header>
  );
};

export default Header;
