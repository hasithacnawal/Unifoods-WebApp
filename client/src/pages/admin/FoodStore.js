import React, { Component } from "react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import ShoppingList from "../../components/ShoppingList";
import ItemModel from "../../components/ItemModel";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import mainImg from "../../images/Canteen2.jpg";
import StyledHero from "../../components/StyledHero";

export default class FoodStore extends Component {
  render() {
    return (
      <React.Fragment>
        <AdminNavbar />
        <StyledHero img={mainImg}>
          <Banner title="My Store" subtitle="Manage food items">
            <Link to="/admin/" className="btn-primary">
              Back to Admin Home
            </Link>
          </Banner>
        </StyledHero>

        <ItemModel />
        <ShoppingList />
      </React.Fragment>
    );
  }
}
