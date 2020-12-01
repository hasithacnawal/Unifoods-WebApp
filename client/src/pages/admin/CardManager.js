import React, { Component } from "react";
import AppNavbar from "../../components/navbar/AppNavbar";
import CardList from "../../components/CardList";
import CardModel from "../../components/CardModel";
import CardRecharge from "../../components/CardRecharge";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import mainImg from "../../images/Canteen1.jpg";
import StyledHero from "../../components/StyledHero";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CardManager extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    adminAuthenticated: PropTypes.bool
  };
  render() {
    return (
      <React.Fragment>
        <AdminNavbar />

        <StyledHero img={mainImg}>
          <Banner title="Card Manager" subtitle="Add or remove Cards">
            <Link to="/admin/" className="btn-primary">
              Back to Admin Home
            </Link>
          </Banner>
        </StyledHero>
        <div className="container">
          <CardModel />
          <CardList />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  adminAuthenticated: state.auth.adminAuthenticated
});
export default connect(mapStateToProps)(CardManager);
