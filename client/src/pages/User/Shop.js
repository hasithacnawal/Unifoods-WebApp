import React, { Component } from "react";
import { AppNavbar } from "../../components/navbar/AppNavbar";
import ShoppingList from "../../components/Shop/ShoppingList";

export class Shop extends Component {
  render() {
    return (
      <>
        <div className="container">
          <ShoppingList />
        </div>
      </>
    );
  }
}

export default Shop;
