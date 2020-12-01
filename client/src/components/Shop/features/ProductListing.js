import React from "react";
import ProductItem from "./ProductItem";
import { ADDTOCART, REMOVE_FROM_CART } from "../../../actions/types";
import { connect } from "react-redux";

function ProductListing(props) {
  return (
    <div className="product-listing ">
      {props.items.map(product => (
        <ProductItem
          user={props.user}
          product={product}
          addToCart={props.addToCart}
          removeFromCart={props.removeFromCart}
          // cart={cartItemsWithQty(props.cart.cart)}
          cartItem={
            props.cart.filter(cartItem => cartItem._id === product._id)[0]
          }
        />
      ))}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addToCart: item => {
      dispatch({ type: ADDTOCART, payload: item });
    },
    removeFromCart: item => {
      dispatch({ type: REMOVE_FROM_CART, payload: item });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
