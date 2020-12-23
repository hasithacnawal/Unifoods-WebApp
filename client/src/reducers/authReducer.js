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
  REMOVE_USER,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  adminToken: localStorage.getItem("adminToken"),
  isLoading: false,
  isAuthenticated: localStorage.getItem("userInfo") ? true : false,
  users: [],
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  adminInfo: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case USER_LOADING:
      return {
        ...state,

        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        userInfo: action.payload,
      };
    case ADMIN_LOADING:
      return {
        ...state,
        // user: action.payload,
        isLoading: true,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        adminAuthenticated: true,
        isLoading: false,
        admin: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return {
        isAuthenticated: true,
        isLoading: false,
        userInfo: action.payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        userInfo: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case ADMIN_LOGGED:
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
      return {
        ...state,
        adminAuthenticated: true,
        isLoading: false,
        admin: action.payload,
      };
    case ADMIN_REGISTERED:
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
      return {
        ...state,
        tempAuthenticated: true,
        isLoading: false,
        admin: action.payload,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:

    case LOGOUT_SUCCESS:
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("userInfo");
    case REGISTER_FAIL:
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("userInfo");

      return {
        ...state,
        token: null,
        adminToken: null,

        user: null,
        admin: null,
        isAuthenticated: false,
        adminAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
