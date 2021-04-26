import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  USER_FETCH_SUCCESS,
  LOGOUT,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  START_REGISTER_USER
} from "../constants";

const base_url = "http://localhost:3001"

export const registerUser = (user) => {
  return dispatch => {
    dispatch(userRegisterStart())
    axios
      .post(`http://localhost:3001/register`, user)
      .then(({data}) => {
        dispatch(registerUserSuccess())
      })
      .catch(error => dispatch(registerUserFail(error)))
  }
}

export const loginUser = (user) => {
  return dispatch => {
    axios
      .post(`${base_url}/login`, user)
      .then(({data}) => console.log(data))
      .catch(err => console.log(err))
  }
}

const userRegisterStart = () => ({
  type: START_REGISTER_USER
})

const registerUserFail = (error) => ({
  type: REGISTER_USER_FAIL,
  error
})

const registerUserSuccess = () => ({
  type: REGISTER_USER_SUCCESS
})

export const loginRequest = () => ({
  type: LOGIN_REQUEST
})

export const loginUserSuccess = () => ({
  type: LOGIN_SUCCESS
})

export const loginUserError = (error) => ({
  type: LOGIN_ERROR,
  error
})

export const logout = () => ({
  type: LOGOUT
})