import React, { useState } from "react";
import { login, register } from "../../store/actions/auth.js";
import * as api from "../../api";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import Joi from "joi-browser";

export default function LoginModal(props) {
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validate(loginSchema, { email, password });
    if (errors) {
      setErrors(errors);
      return;
    }
    try {
      const { data } = await api.login({ email, password });
      console.log(data);
      dispatch(login(data));
      props.onClose();
    } catch (error) {
      setErrors({ api: error.response.data.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile = { displayName: displayName };
    const errors = validate(registerSchema, {
      email,
      password,
      displayName,
      profile,
    });
    if (errors) {
      setErrors(errors);
      return;
    }
    try {
      const { data } = await api.register({
        displayName,
        email,
        password,
        profile,
      });
      dispatch(register(data));
      props.onClose();
    } catch (error) {
      setErrors({ api: error.response.data.message });
    }
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
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .label("Email"),
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
    profile: Joi.object().required(),
  };

  return (
    <div>
      <Dialog {...props} aria-labelledby="form-dialog-title">
        <form>
          <DialogTitle id="form-dialog-title">
            {props.modalversion === "register" ? "Register" : "Login"}
          </DialogTitle>
          <DialogContent>
            {errors.api && <Alert severity="error">{errors.api}</Alert>}
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
              onChange={(event) => setEmail(event.target.value)}
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

            {props.modalversion === "login" && (
              <Button
                type="submit"
                onClick={(e) => {
                  handleLogin(e);
                }}
                color="primary"
              >
                Login
              </Button>
            )}
            {props.modalversion === "register" && (
              <Button
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                color="primary"
              >
                Register
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
