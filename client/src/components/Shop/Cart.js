import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItems, deleteItem, loadItem } from "../../actions/itemAction";
import ProductListing from "./features/ProductListing";
import Title from "../Title";
import ShoppingCart from "./cart/ShoppingCart";
import CartColumns from "./cart/CartColumns";
import AppNavbar from "../navbar/AppNavbar";

class Cart extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    this.props.getItems();
  }
  render() {
    return (
      <>
        <AppNavbar />
        <br />
        <Title name="Your" title="Cart" />
        <CartColumns />
        <ShoppingCart />
      </>
    );
  }
}
const mapStateToProps = state => ({
  item: state.item,
  cart: state.cart,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, loadItem })(Cart);
