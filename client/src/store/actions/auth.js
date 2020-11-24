import {
  CREATE,
  UPDATE,
  DELETE,
  LOGIN,
  REGISTER,
  SET_USER,
} from "../constants/actionTypes";

import * as api from "../../api";

export const register = (user) => async (dispatch) => {
  try {
    const { data } = await api.register(user);

    dispatch({ type: REGISTER, payload: data });
  } catch (error) {
    console.log(error.message, error);
  }
};

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await api.login(user);

    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
