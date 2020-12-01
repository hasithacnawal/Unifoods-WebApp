import React, { Component, Fragment } from "react";
import AppNavbar from "../../components/navbar/AppNavbar";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Hero from "../../components/Hero";
import { Button } from "reactstrap";

class Homepage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render() {
    return (
      <>
        <AppNavbar />

        <Hero>
          <Banner
            title="Order your food before check-Inn"
            subtitle="login to order online"
          >
            {!this.props.isAuthenticated ? (
              <Link to="/signup">
                <Button className="btn-primary ml-3">Sign Up</Button>
              </Link>
            ) : (
              ""
            )}
          </Banner>
        </Hero>
      </>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Homepage);
