import {
  UPDATE,
  DELETE,
  LOGIN,
  REGISTER,
  SET_USER,
  SIGN_OUT,
} from "../constants/actionTypes";

import * as api from "../../api";

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await api.login(user);
    console.log(data);
    localStorage.setItem("token", data);
    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const register = (user) => async (dispatch) => {
  try {
    const { data } = await api.register(user);

    dispatch({ type: REGISTER, payload: data });
  } catch (error) {
    console.log(error.message, error);
  }
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: SIGN_OUT, payload: null });
};

export const setUser = () => (dispatch) => {
  let token = null;
  if (localStorage.key("token")) {
    token = localStorage.getItem("token");
  }
  dispatch({ type: SET_USER, payload: token });
};
