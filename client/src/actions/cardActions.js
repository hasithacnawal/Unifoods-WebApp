import {
  GET_CARDS,
  ADD_CARD,
  DELETE_CARD,
  UPDATE_CARD,
  CARDS_LOADING,
  LOAD_CARD,
  CARD_LOGGED,
  CARD_FAILED,
  CARD_EDIT
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getCards = () => dispatch => {
  dispatch(setCardsLoading());
  axios
    .get("/api/cards")
    .then(res =>
      dispatch({
        type: GET_CARDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const loadCard = id => dispatch => {
  axios
    .get(`/api/cards/${id}`)
    .then(res =>
      dispatch({
        type: LOAD_CARD,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// export const addCard = card => (dispatch, getState) => {
//   axios
//     .post("/api/cards", card, tokenConfig(getState))
//     .then(res =>
//       dispatch({
//         type: ADD_CARD,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };
export const addCard = ({
  userId,
  nameOnCard,
  cardNumber,
  pin,
  balance
}) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({
    userId,
    nameOnCard,
    cardNumber,
    pin,
    balance
  });
  axios
    .post("/api/cards", body, config)
    .then(res =>
      dispatch({
        type: ADD_CARD,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "CARD_FAILED")
      );
      dispatch({
        type: CARD_FAILED
      });
    });
  return config;
};

export const cardLogin = ({ cardNumber, pin }) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({ cardNumber, pin });

  axios
    .post("/api/cardsAuth", body, config)
    .then(res =>
      dispatch({
        type: CARD_LOGGED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "CARD_FAILED")
      );
      dispatch({
        type: CARD_FAILED
      });
    });
  return config;
};

export const updateCard = (id, card) => (dispatch, getState) => {
  axios
    .post(`/api/cards/update/${id}`, card, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_CARD,
        payload: res.id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const editCard = (id, card) => (dispatch, getState) => {
  axios
    .post(`/api/cards/update/${id}`, card, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: CARD_EDIT,
        payload: res.id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteCard = id => (dispatch, getState) => {
  axios
    .delete(`/api/cards/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_CARD,
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

export const setCardsLoading = () => {
  console.log("cards loaded");
  return {
    type: CARDS_LOADING
  };
};
