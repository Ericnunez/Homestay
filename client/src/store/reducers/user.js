import {
  CREATE,
  UPDATE,
  LOGIN,
  REGISTER,
  SIGN_OUT,
  SET_USER,
} from "../constants/actionTypes";

export default (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case REGISTER:
      return [...state, action.payload];
    case SIGN_OUT:
      return action.payload;
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};
