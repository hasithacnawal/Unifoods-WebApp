import React, { Component } from "react";
import AccountList from "../../components/AccountList";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import StyledHero from "../../components/StyledHero";

import Banner from "../../components/Banner";
import { Link } from "react-router-dom";
import mainImg from "../../images/Canteen2.jpg";

export class AccountManager extends Component {
  render() {
    return (
      <React.Fragment>
        <AdminNavbar />
        <StyledHero img={mainImg}>
          <Banner title="Account Manager" subtitle="Manage User accounts">
            <Link to="/admin/" className="btn-primary">
              Back to Admin Home
            </Link>
          </Banner>
        </StyledHero>
        <div className="container">
          <AccountList />
        </div>
      </React.Fragment>
    );
  }
}

export default AccountManager;
