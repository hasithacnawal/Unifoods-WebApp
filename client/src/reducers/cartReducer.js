import {
  ADDTOCART,
  REMOVE_FROM_CART,
  REMOVEALL,
  CLEAR_CART
} from "../actions/types";
import {
  addToCart,
  removeFromCart,
  removeAll
} from "../components/Shop/cart/index";

export default function(state = [], action) {
  switch (action.type) {
    case ADDTOCART:
      return addToCart(state, action.payload);

    case REMOVE_FROM_CART:
      return removeFromCart(state, action.payload);

    case REMOVEALL:
      return removeAll(state, action.payload);

    case CLEAR_CART:
      return (state = null);
    //   const firstMatchIndex = state.indexOf(action.payload);
    //   return state.filter((item, index) => index !== firstMatchIndex);
    default:
      return state;
  }
}
