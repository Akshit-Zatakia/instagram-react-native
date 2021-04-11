import { combineReducers } from "redux";
import { allUsers } from "./allUsers";
import { user } from "./users";

const Reducers = combineReducers({
  userState: user,
  usersState: allUsers,
});

export default Reducers;
