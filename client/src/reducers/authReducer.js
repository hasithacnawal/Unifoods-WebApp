import {
  GET_USERS,
  USER_LOADED,
  USER_LOADING,
  ADMIN_LOADING,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  ADMIN_REGISTERED,
  ADMIN_LOGGED,
  REGISTER_FAIL,
  UPDATE_USER,
  REMOVE_USER
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  adminToken: localStorage.getItem("adminToken"),
  isAuthenticated: null,
  adminAuthenticated: null,
  tempAuthenticated: null,
  isLoading: false,
  users: [],
  user: null,
  admin: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: false
      };
    case USER_LOADING:
      return {
        ...state,
        // user: action.payload,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case ADMIN_LOADING:
      return {
        ...state,
        // user: action.payload,
        isLoading: true
      };
    case ADMIN_LOADED:
      return {
        ...state,
        adminAuthenticated: true,
        isLoading: false,
        admin: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case UPDATE_USER:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: action.payload
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    case ADMIN_LOGGED:
      return {
        ...state,
        adminAuthenticated: true,
        isLoading: false,
        admin: action.payload
      };
    case ADMIN_REGISTERED:
      localStorage.setItem("adminToken", action.payload.adminToken);
      return {
        ...state,
        tempAuthenticated: true,
        isLoading: false,
        admin: action.payload
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:

    case LOGOUT_SUCCESS:

    case REGISTER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");

      return {
        ...state,
        token: null,
        adminToken: null,

        user: null,
        admin: null,
        isAuthenticated: false,
        adminAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
