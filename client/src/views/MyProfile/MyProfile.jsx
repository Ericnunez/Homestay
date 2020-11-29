import React from "react";
import "./MyProfile.css";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const MyProfile = () => {
  return (
    <Container maxWidth="lg">
      <div className="profile-grid">
        <div>
          <Typography variant="h3" gutterBottom>
            Image here 1
          </Typography>
          <Typography variant="h4" gutterBottom>
            Eric Nunez
          </Typography>
          <Typography variant="body1" gutterBottom>
            User Bio should be here. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Corporis ipsam ullam, ducimus quaerat vero totam
            provident nesciunt ad laboriosam illo voluptatem adipisci eaque?
            Tenetur, explicabo? Perferendis qui molestias incidunt nobis.
          </Typography>
        </div>
        <div>
          <Typography variant="h3" gutterBottom>
            Image here
          </Typography>
          <Typography variant="h4" gutterBottom>
            Eric Nunez
          </Typography>
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
