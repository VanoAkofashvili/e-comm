import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_START
} from "../constants";

// const initState = {
//   isLoggedIn: !!localStorage.token,
//   token: localStorage.token,
//   expirationDate: localStorage.expirationDate,
//   idToken: null,
//   loginError: false,
//   loginLoading: true,
//   user: null,
//   userLoading: true
// }

const initState = {
  isLoggedIn: false,
  token: "",
  expirationDate: 0,
  loginError: false,
  loginLoading: true,
  user: null,
  userLoading: true,
  userRegisterLoading: false,
  userRegisterError: null,
}

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginError: false,
        loginLoading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        isLoggedIn: true,
        expirationDate: action.expirationDate,
        token: action.token
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.error,
        loginLoading: false
      }
    case LOGOUT:
      return {
        ...state,
        loginLoading: false,
        isLoggedIn: false
      }
    case REGISTER_USER_START:
      return {
        ...state, 
        userRegisterLoading: true,
        userRegisterError: null
      }
    case REGISTER_USER_SUCCESS: 
      return {
        ...state, 
        userRegisterLoading: false,
        userRegisterError: null
      }
    case REGISTER_USER_FAIL:
      return {
        ...state,
        userRegisterError: action.error,
        userRegisterLoading: false
      }
    default:
      return state;
  }

};