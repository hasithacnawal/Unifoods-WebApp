import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  GET_USERS,
  ADMIN_LOADING,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  ADMIN_REGISTERED,
  REGISTER_FAIL,
  ADMIN_LOGGED,
  UPDATE_USER,
  REMOVE_USER
} from "./types";
import { cardLogin } from "./cardActions";

// Setup config/headers and token
export const tokenConfig = getState => {
  //get token from localStorage
  const token = getState().auth.token;
  const adminToken = getState().auth.adminToken;

  //header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  //if token, add to headers
  if (adminToken) {
    config.headers["x-adminAuth-token"] = adminToken;
  } else if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

//get all users////
export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
// set user loading for all users
export const setUsersLoading = () => {
  return {
    type: USER_LOADING
  };
};

//Register user
export const register = ({
  firstName,
  lastName,
  regNo,
  email,
  password,
  phoneNumber,
  faculty,
  cardNumber,
  pin,
  address
}) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({
    firstName,
    lastName,
    regNo,
    email,
    password,
    phoneNumber,
    faculty,
    cardNumber,
    pin,
    address
  });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
  return config;
};
//Update user
export const updateUser = (id, user) => (dispatch, getState) => {
  axios
    .post(`/api/users/update/${id}`, user, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_USER,
        payload: res.id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
//delete user
export const deleteUser = id => (dispatch, getState) => {
  axios
    .delete(`/api/users/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: REMOVE_USER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
//Register admin
export const registerAdmin = ({
  name,
  email,
  password,
  phoneNumber,
  address
}) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({
    name,
    email,
    password,
    phoneNumber,
    address
  });

  axios
    .post("/api/admins", body, config)
    .then(res =>
      dispatch({
        type: ADMIN_REGISTERED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
  return config;
};

//Login User
export const login = ({ email, password }) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then(res => {
      const userData = res.data.user;
      if (userData.pin.length > 0 && userData.cardNumber.length > 0) {
        const pin = userData.pin;
        const cardNumber = userData.cardNumber;

        dispatch(cardLogin({ cardNumber, pin }));
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
  return config;
};

//lohin as admin
export const loginAdmin = ({ email, password }) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/adminAuth", body, config)
    .then(res =>
      dispatch({
        type: ADMIN_LOGGED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
  return config;
};

//Logout
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
