import React from "react";
import "./MyProfile.css";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
          centered
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

const MyProfile = () => {
  const user = useSelector((state) => state.user);
  const classes = useStyles();

  useEffect(() => {
    document.title = `${document.title} - My Profile`;
  }, []);
  return (
    <Container maxWidth="lg">
      <div className="profile-grid">
        <div>
          <img
            src="https://images.generated.photos/OqwVUrpxLkilztMbpAcB8EyBtynia4yL7I9J1ZH-0lI/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1MzQ5MTQuanBn.jpg"
            style={{
              borderRadius: "50%",
              height: "200px",
              display: "block",
              margin: "auto",
            }}
            alt="profile picture"
          />
          <Typography variant="h4">{user && user.displayName}</Typography>
          <Typography variant="h6" gutterBottom>
            Member Since 2020
          </Typography>
          <Typography variant="body1" gutterBottom>
            User Bio should be here. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Corporis ipsam ullam, ducimus quaerat vero totam
            provident nesciunt ad laboriosam illo voluptatem adipisci eaque?
            Tenetur, explicabo? Perferendis qui molestias incidunt nobis.
          </Typography>
          <div />
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
        </div>
        <div>
          <SimpleTabs />
          <Typography variant="body1" gutterBottom>
            User Bio should be here. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Corporis ipsam ullam, ducimus quaerat vero totam
            provident nesciunt ad laboriosam illo voluptatem adipisci eaque?
            Tenetur, explicabo? Perferendis qui molestias incidunt nobis.
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default MyProfile;
