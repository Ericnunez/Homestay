import { combineReducers } from "redux";
import listings from "./Listings";
import user from "./user";

export default combineReducers({ listings, user });
