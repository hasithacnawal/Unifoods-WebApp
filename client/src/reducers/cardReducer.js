import {
  GET_CARDS,
  ADD_CARD,
  CARD_FAILED,
  UPDATE_CARD,
  LOAD_CARD,
  DELETE_CARD,
  CARDS_LOADING,
  CARD_LOGGED,
  CARD_EDIT
} from "../actions/types";

const initialState = {
  cardToken: localStorage.getItem("cardToken"),
  cardLogged: false,
  cards: [],
  card: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
        loading: false
      };
    case LOAD_CARD:
      return {
        ...state,
        card: action.payload,
        loading: false
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter(card => card._id !== action.payload)
      };
    case CARD_LOGGED:
      return {
        cardLogged: true,
        isLoading: false,
        card: action.payload
      };

    case ADD_CARD:
      localStorage.setItem("cardToken", action.payload.cardToken);
      console.log("card add");
      return {
        ...state,
        cardlogged: true,
        isLoading: false,
        card: action.payload
      };

    case CARD_FAILED:
      localStorage.removeItem("cardToken");
      return {
        ...state,
        cardToken: null,
        card: null,
        cardlogged: false,
        isLoading: false
      };
    case UPDATE_CARD:
      return {
        ...state,
        cardLogged: false,
        isLoading: false,
        card: action.payload
      };
    case CARD_EDIT:
      return {
        ...state,

        cards: state.cards.filter(card => card._id !== action.payload)
      };
    case CARDS_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
