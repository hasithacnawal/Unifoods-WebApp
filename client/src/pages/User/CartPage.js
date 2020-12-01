import React, { Component } from "react";
import { AppNavbar } from "../../components/navbar/AppNavbar";
import Cart from "../../components/Shop/Cart";

export class CartPage extends Component {
  render() {
    return (
      <>
        <div className="container">
          <Cart />
        </div>
      </>
    );
  }
}

export default CartPage;
