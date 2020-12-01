import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  LOAD_ITEM,
  UPDATE_ITEM
} from "../actions/types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const loadItem = id => dispatch => {
  console.log("item load");
  axios
    .get(`/api/items/${id}`)
    .then(res =>
      dispatch({
        type: LOAD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addItem = item => (dispatch, getState) => {
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const updateItem = (id, item) => (dispatch, getState) => {
  axios
    .post(`/api/items/update/${id}`, item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_ITEM,
        payload: res.id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
// export const addItem = item => {
//   return {
//     type: ADD_ITEM,
//     payload: item
//   };
// };

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
