import {
  CLEAR_DATA,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_STATE_CHANGE,
} from "../constants";

const initialState = {
  users: [],
  usersLoaded: 0,
};

export const allUsers = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        usersLoaded: state.usersLoaded + 1,
        users: state.users.map((user) =>
          user.uid === action.uid ? { ...user, posts: action.posts } : user
        ),
      };
    case CLEAR_DATA:
      return {
        users: [],
        usersLoaded: 0,
      };
    default:
      return state;
  }
};
