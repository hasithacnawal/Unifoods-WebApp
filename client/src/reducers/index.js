import { combineReducers } from "redux";
import itemReducer from "./itemReducer.js";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import cardReducer from "./cardReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  card: cardReducer,
  cart: cartReducer,
  order: orderReducer
});
