import {
  CREATE,
  UPDATE,
  DELETE,
  LOGIN,
  REGISTER,
} from "../constants/actionTypes";

export default (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case REGISTER:
      return [...state, action.payload];
    default:
      return state;
  }
};
