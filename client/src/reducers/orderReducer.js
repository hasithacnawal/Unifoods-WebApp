import {
  GET_ORDERS,
  ADD_ORDER,
  DELETE_ORDER,
  ORDERS_LOADING,
  ORDER_FAILED,
  ORDER_COMPLETE,
  UPDATE_ORDER
} from "../actions/types";

const initialState = {
  orders: [],
  order: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        orders: action.payload,
        loading: false
      };

    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.payload)
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    case ORDER_COMPLETE:

    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.payload)
      };
    case ORDERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case ORDER_FAILED:
      return {
        loading: false,
        orders: null,
        order: null
      };
    default:
      return state;
  }
}
