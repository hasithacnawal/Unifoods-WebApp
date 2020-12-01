import React, { Component } from "react";

import OrderList from "../../components/OrderList";

import AdminNavbar from "../../components/navbar/AdminNavbar";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import mainImg from "../../images/Canteen1.jpg";
import StyledHero from "../../components/StyledHero";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class OrdersManager extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    adminAuthenticated: PropTypes.bool
  };
  render() {
    return (
      <React.Fragment>
        <AdminNavbar />

        <StyledHero img={mainImg}>
          <Banner title="Your Orders" subtitle="manage orders">
            <Link to="/admin/" className="btn-primary">
              Back to Admin Home
            </Link>
          </Banner>
        </StyledHero>
        <div className="container">
          <OrderList />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  adminAuthenticated: state.auth.adminAuthenticated
});
export default connect(mapStateToProps)(OrdersManager);
