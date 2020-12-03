import React, { useEffect } from "react";
import "./MyProfile.css";
import { getUserProfile } from "../../api";
import { Button, Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";

import moment from "moment";

import { useSelector } from "react-redux";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  infoShared: {
    padding: "1rem",
  },
  profileBox: {
    padding: "1rem",
  },
}));

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab label="Current Reservations" {...a11yProps(0)} />
          <Tab label="My listings" {...a11yProps(1)} />
          <Tab label="Future Reservations" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        Current Reservations
      </TabPanel>
      <TabPanel value={value} index={1}>
        My listings
      </TabPanel>
      <TabPanel value={value} index={2}>
        Future Reservations
      </TabPanel>
    </div>
  );
}

export default function MyProfile() {
  const user = useSelector((state) => state.user);
  const classes = useStyles();

  const [showEditForm, setShowEditForm] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const handleEditProfile = (event) => {
    event.preventDefault();
    setShowEditForm(!showEditForm);
  };

  useEffect(() => {
    document.title = `${document.title} - My Profile`;

    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = { id: user._id };
        const profile = await getUserProfile(data, token);
        setUserProfile(profile.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);
  return (
    <Container maxWidth="lg">
      <div className="profile-grid">
        <aside>
          <div className="profile-about">
            <img
              src="https://images.generated.photos/OqwVUrpxLkilztMbpAcB8EyBtynia4yL7I9J1ZH-0lI/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1MzQ5MTQuanBn.jpg"
              style={{
                borderRadius: "50%",
                height: "150px",
                display: "block",
                margin: "auto",
              }}
              alt="profile"
            />
            <Typography variant="h5">
              {userProfile && userProfile.displayName}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {/* TODO: add the created date here */}
              Host Since {moment.unix(user.iat).fromNow()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userProfile && userProfile.bio}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userProfile && userProfile.location}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userProfile && userProfile.somthing}
            </Typography>

            {showEditForm ? (
              <div className="profile-form">
                <form>
                  <TextField
                    id="bio"
                    label="Bio"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    id="displayName"
                    label="Display Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    id="location"
                    label="Location"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="dense"
                  />
                  <div className="profile-form-buttons">
                    {" "}
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowEditForm(!showEditForm);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <Button
                variant="contained"
                fullWidth={true}
                onClick={(e) => handleEditProfile(e)}
              >
                Edit Profile
              </Button>
            )}
            <Typography variant="caption" gutterBottom>
              {/* Add the last updated time here */}
              Last Updated: {moment.unix(user.iat).fromNow()}
            </Typography>
          </div>
          <div>
            <Paper className={classes.infoShared} variant="outlined" square>
              <AccountBoxIcon style={{ fontSize: 30 }} />
              <Typography variant="h6" gutterBottom>
                What info is shared with others?
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Homestay only releases contact information for hosts and guests
                after a reservation is confirmed.
              </Typography>
            </Paper>
          </div>
        </aside>
        <div>
          <SimpleTabs />
        </div>
      </div>
    </Container>
  );
}
