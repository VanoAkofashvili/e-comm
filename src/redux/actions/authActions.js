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
  UPDATE_USER_DETAILS,
  API_URL
} from "../constants";
import jwt from "jsonwebtoken";

let expirationTimeout = null;

export const registerUser = (user, callback) => {
  return (dispatch) => {
    dispatch(userRegisterStart());
    return axios
      .post(`${API_URL}/register`, user)
      .then(() => {
        dispatch(registerUserSuccess());
        callback();
      })
      .catch((error) => {
        dispatch(registerUserFail(error));
      })
  };
};

export const loginUser = (user) => {
  console.log('user: ', user)
  return async (dispatch) => {
    dispatch(userLoginStart());
    axios
      .post(`${API_URL}/login`, user)
      .then((response) => {
        const user = jwt.decode(response.data.accessToken);
        dispatch(updateUser(user.sub))
        dispatch(userLoginSuccess(response.data.accessToken, user));
      })
      .catch((error) => {
        console.log('error: ', error)
        dispatch(userLoginFail(error));
      });
  };
};

export const getProfileFetch = () => {
  return dispatch => {
    // if right token exists in localstorage get role of the current user
    const token = localStorage.getItem('token')
    const user = jwt.decode(token)
    const expDate = localStorage.getItem('expirationDate')

    if (token  && +expDate > moment().valueOf()) {
      return axios
        .get(`${API_URL}/users`)
        .then(({data}) => {
          const match = data.some(d => d.email === user.email)
          if (match) {
            dispatch(updateUser(user.sub))
          } else {
            dispatch(logOut())
          }
        })
        .catch(error => console.log(error))
    } else {
      dispatch(logOut())
    } 
  }
}

export const logOut = () => {
  return (dispatch) => {
    window.localStorage.clear();
    dispatch({
      type: LOG_OUT,
    });
  };
};


const updateUser = (id) => {
  return dispatch => {
    axios
      .get(`${API_URL}/users/${id}`)
      .then(({data}) => {
        // if an user has a role
        if (data) {
          const {password, id, ...user} = data
          dispatch(updateUserDetails(user))

          if(localStorage.getItem('role') && user.role !== localStorage.getItem('role')) {
            dispatch(logOut())
          } else {
            localStorage.setItem('role', user.role)
          }
        }
      })
      .catch((error) => console.log(error))
  }
}


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

// role
const updateUserDetails = (user) => ({
  type: UPDATE_USER_DETAILS,
  user
})