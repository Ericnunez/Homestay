import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { auth } from "../../firebase/firebase";

export default function LoginModal(props) {
  const [state, setState] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.id]: value,
    });
  };

  const login = () => {
    const { email, password } = state;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const register = () => {
    const { email, password } = state;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Dialog {...props} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            onChange={(event) => handleChange(event)}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            onChange={(event) => handleChange(event)}
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              login();
            }}
            color="primary"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              register();
            }}
            color="primary"
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
