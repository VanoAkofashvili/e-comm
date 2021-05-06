import axios from "axios";
import moment from "moment";
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_START,
  REGISTER_ERROR_CLEAR,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOG_OUT, LOGIN_ERROR_CLEAR,
} from "../constants";
import jwt from "jsonwebtoken";


// const base_url = "http://localhost:3001";
let expirationTimeout = null;

export const registerUser = (user, callback) => {
  return (dispatch) => {
    dispatch(userRegisterStart());
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/register`, user)
      .then(() => {
        dispatch(registerUserSuccess());
        callback();
      })
      .catch((error) => {
        dispatch(registerUserFail(error));
      })
  };
};

export const loginUser = (user, callback) => {
  return (dispatch) => {
    dispatch(userLoginStart());
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/login`, user)
      .then((response) => {
        const user = jwt.decode(response.data.accessToken);
        dispatch(userLoginSuccess(response.data.accessToken, user));
        // callback()
      })
      .catch((error) => {
        dispatch(userLoginFail(error));
        // callback()
      });
  };
};

export const logOut = () => {
  return (dispatch) => {
    window.localStorage.clear();
    dispatch({
      type: LOG_OUT,
    });
  };
};


const userLoginStart = () => ({
  type: LOGIN_USER_START,
});

const userLoginSuccess = (token, user) => {
  return (dispatch) => {
    const expirationTime = 1000 * 60 * 60; // one hour
    const expirationDate = moment().valueOf() + expirationTime;

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("expirationDate", expirationDate);

    // log out user after one hour
    clearTimeout(expirationTimeout);
    expirationTimeout = setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);

    // send token and expiration date to redux
    dispatch({
      type: LOGIN_USER_SUCCESS,
      token: token,
      expirationDate: expirationDate,
      user
    });
  };
};

const userLoginFail = (error) => ({
  type: LOGIN_USER_FAIL,
  error,
});

export const loginErrorClear = () => ({
  type: LOGIN_ERROR_CLEAR
})

const userRegisterStart = () => ({
  type: REGISTER_USER_START,
});

const registerUserFail = (error) => ({
  type: REGISTER_USER_FAIL,
  error,
});

const registerUserSuccess = () => ({
  type: REGISTER_USER_SUCCESS,
});

export const registerErrorClear = () => ({
  type: REGISTER_ERROR_CLEAR
})

