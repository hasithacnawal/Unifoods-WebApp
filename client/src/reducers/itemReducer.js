import {
  GET_ITEMS,
  Load_Item,
  UPDATE_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  LOAD_ITEM
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case LOAD_ITEM:
      return {
        ...state,
        item: action.payload,
        loading: false
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };

    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
