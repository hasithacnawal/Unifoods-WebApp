import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Hero from "../../components/Hero";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import { Button } from "reactstrap";

class AdminHome extends Component {
  static propTypes = {
    adminAuthenticated: PropTypes.bool
  };

  render() {
    return (
      <>
        <AdminNavbar />

        <Hero>
          <Banner
            title="Admin panel"
            subtitle={
              !this.props.adminAuthenticated ? (
                <h5>You must Login to proceed</h5>
              ) : null
            }
          >
            <Link to="/about">
              <Button className="btn-primary ml-3">About</Button>
            </Link>
          </Banner>
        </Hero>
      </>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  adminAuthenticated: state.auth.adminAuthenticated
});

export default connect(mapStateToProps)(AdminHome);
