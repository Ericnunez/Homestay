import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { login, register } from "../../store/actions/auth.js";
import { useDispatch } from "react-redux";
import Joi from "joi-browser";

export default function LoginModal(props) {
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = validate(loginSchema, { email, password });
    if (errors) {
      setErrors(errors);
      return;
    }
    dispatch(login({ email, password }));
    props.onClose();
  };

  const handleSubmit = (e) => {
    const errors = validate(registerSchema, { email, password });
    if (errors) {
      setErrors(errors);
      return;
    }
    e.preventDefault();
    dispatch(register({ displayName, email, password }));
  };

  const validate = (schema, userDetails) => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(userDetails, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const loginSchema = {
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(5).max(20).required().label("Password"),
  };

  const registerSchema = {
    displayName: Joi.string().min(2).max(25).required().label("Name"),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .label("Email"),
    password: Joi.string().min(5).max(20).required(),
  };

  return (
    <div>
      <Dialog {...props} aria-labelledby="form-dialog-title">
        <form>
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText> */}
            {props.modalversion === "register" && (
              <TextField
                onChange={(event) => setDisplayName(event.target.value)}
                autoFocus
                margin="dense"
                id="displayName"
                label="Name"
                type="text"
                fullWidth
                error={errors.displayName ? true : false}
                helperText={errors.displayName}
              />
            )}
            <TextField
              onChange={(event) => setEmail(event.target.email)}
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              autoComplete="email"
              fullWidth
              error={errors.email ? true : false}
              helperText={errors.email}
            />
            <TextField
              onChange={(event) => setPassword(event.target.value)}
              margin="dense"
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              fullWidth
              error={errors.password ? true : false}
              helperText={errors.password}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setErrors({});
                props.onClose();
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                handleLogin(e);
              }}
              color="primary"
            >
              Login
            </Button>
            <Button
              onClick={(e) => {
                handleSubmit(e);
              }}
              color="primary"
            >
              Register
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
