import { combineReducers } from "redux";
import { user } from "./users";

const Reducers = combineReducers({
  userState: user,
});

export default Reducers;
