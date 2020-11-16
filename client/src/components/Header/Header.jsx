import React, { useState } from "react";
import "./header.css";
import logo from "../../images/logo.png";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { ExpandMore, Language } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import LoginModal from "../LoginModal/LoginModal";

const Header = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      <LoginModal open={open} onClose={handleClose} />
      <Link to="/">
        <img className="header-icon" src={logo} alt="logo" />
      </Link>
      <div className="header-center">
        <input type="text" />
        <SearchIcon />
      </div>
      <div className="header-right">
        {user ? (
          user
        ) : (
          <p
            onClick={() => {
              handleClickOpen();
            }}
          >
            Login / Register
          </p>
        )}
        <Language />
        <ExpandMore />
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
