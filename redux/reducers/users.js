import {
  CLEAR_DATA,
  USER_FOLLOWING_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_STATE_CHANGE,
} from "../constants";

const initialState = {
  currentUser: null,
  posts: [],
  following: [],
};

export const user = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: action.following,
      };
    case CLEAR_DATA:
      return {
        currentUser: null,
        posts: [],
        following: [],
      };
    default:
      return state;
  }
};
