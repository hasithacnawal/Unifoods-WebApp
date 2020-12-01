import {
  GET_ORDERS,
  ADD_ORDER,
  DELETE_ORDER,
  ORDERS_LOADING,
  ORDER_FAILED,
  ORDER_COMPLETE,
  UPDATE_ORDER
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getOrders = () => dispatch => {
  dispatch(orderLoading());
  axios
    .get("/api/orders")
    .then(res =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// export const addOrder = order => (dispatch, getState) => {
//   axios
//     .post("/api/orders", order, tokenConfig(getState))
//     .then(res =>
//       dispatch({
//         type: ADD_ORDER,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

export const addOrder = ({
  amount,
  items,
  type,
  userId,
  userRegNo,
  cardNumber
}) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({
    amount,
    items,
    type,
    userId,
    userRegNo,
    cardNumber
  });

  axios
    .post("/api/orders", body, config)
    .then(res =>
      dispatch({
        type: ADD_ORDER,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ORDER_FAILED")
      );
      dispatch({
        type: ORDER_FAILED
      });
    });
  return config;
};

export const deleteOrder = id => (dispatch, getState) => {
  axios
    .delete(`/api/orders/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ORDER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const updateOrder = (id, order) => (dispatch, getState) => {
  axios
    .put(`/api/orders/update/${id}`, order, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_ORDER,
        payload: res.id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const orderLoading = () => {
  return {
    type: ORDERS_LOADING
  };
};
