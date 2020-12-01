import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItems, deleteItem, loadItem } from "../../actions/itemAction";
import ProductListing from "./features/ProductListing";
import Title from "../Title";
import AppNavbar from "../navbar/AppNavbar";

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    this.props.getItems();
  }
  render() {
    const { items } = this.props.item;
    const { user } = this.props.auth;

    return (
      <>
        <AppNavbar />
        <Title name="our" title="products" />

        <ProductListing items={items} user={user} />
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

export default connect(mapStateToProps, { getItems, loadItem })(ShoppingList);
