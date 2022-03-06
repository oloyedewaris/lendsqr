import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  CHANGE_SETTINGS,
  SAVE_USER
} from "./types";
import axios from "axios";
import { getErrors, clearErrors } from "./errorActions";

export const saveUser = (user) => (dispatch) => {
  dispatch({
    type: SAVE_USER,
    payload: user
  });
};

//Log user in
export const login = (user) => (dispatch, state) => {
  axios
    .post("/api/auth/login", user, tokenConfig(state))
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch(
          getErrors(err.response.data, err.response.status, "LOGIN_FAILED")
        );
        dispatch({
          type: LOGIN_FAILED
        });
      }
    });
};

//Register User
export const register = (newUser) => dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };

  axios
    .post("/api/auth/register", newUser, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      if (err.response) {
        dispatch(getErrors(err.response.data, err.response.status, "REGISTER_FAILED"));
      }
      dispatch({ type: REGISTER_FAILED });
    });
};

// Change settings
export const changeSettings = ({
  userId,
  bio,
  email,
  name,
  password,
  newPassword,
  type
}) => (dispatch, getState) => {
  const body = JSON.stringify({
    bio,
    email,
    name,
    password,
    newPassword
  });
  axios
    .post(
      `/api/users/settings/${userId}?type=${type}`,
      body,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: CHANGE_SETTINGS,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch(
          getErrors(
            err.response.data,
            err.response.status,
            "CHANGE_SETTINGS_FAILED"
          )
        );
      }
    });
};

//Check token and load user
export const tokenConfig = getState => {
  //Get token from localstorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
};
