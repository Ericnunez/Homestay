import React, { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import logo from "../../images/logo.png";
import "./header.css";
import { signOut } from "../../store/actions/auth.js";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
// import { ExpandMore, Language } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = (props) => {
  const dispatch = useDispatch();

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

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <header className="header">
      {open && (
        <LoginModal
          open={open}
          onClose={handleClose}
          modalversion={modalVersion}
        />
      )}

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
            <React.Fragment>
              <li className="signout-button" onClick={() => handleSignOut()}>
                Sign Out
              </li>
              <li>
                <Link to="/my-profile">
                  <Avatar />
                </Link>
              </li>
            </React.Fragment>
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
        {/* <ExpandMore /> */}
      </div>
    </header>
  );
};

export default Header;
