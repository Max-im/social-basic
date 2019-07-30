import { combineReducers } from "redux";
import general from "./general";
import posts from "./posts";
import users from "./users";
import auth from "./auth";

export default combineReducers({ general, posts, users, auth });
