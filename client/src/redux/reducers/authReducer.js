import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  CHANGE_SETTINGS,
  SAVE_USER
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.payload
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user
      };
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false
      };
    case CHANGE_SETTINGS:
      alert("Settings Updated Succesfully");
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
