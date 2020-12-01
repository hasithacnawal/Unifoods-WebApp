import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { ButtonContainer } from "../Button";
import styled from "styled-components";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "../auth/RegisterModal";
import LoginModal from "../auth/LoginModal";
import AdminLoginModal from "../auth/AdminLoginModal";
import Logout from "../auth/Logout";

export class AdminNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const {
      isAuthenticated,
      adminAuthenticated,
      user,
      admin
    } = this.props.auth;

    const adminLinks = (
      <Fragment>
        <NavItem>
          <span className="nav-text mr-3">
            <strong>
              {adminAuthenticated ? `Welcome ${admin.admin.name}` : ""}
            </strong>
          </span>
        </NavItem>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <NavItem>
          <AdminLoginModal />
        </NavItem>
      </Fragment>
    );
    return (
      <>
        <NavWrapper className=" navbar-expand-sm px-sm-5">
          {/* https://www.iconfinder.com/icons/1243689/call_phone_icon
Creative Commons (Attribution 3.0 Unported);
https://www.iconfinder.com/Makoto_msk  */}
          {/* <Link to="/">
          <img src={logo} alt="store" className="navbar-brand" />
        </Link> */}
          <nav className="navbar">
            <div className="nav-brand">
              <Link to="/admin">
                <img src={"/logo.png"} alt="unifoods" />
              </Link>
            </div>

            <ul className="navbar-nav align-items-center">
              {adminAuthenticated ? (
                <li className="nav-links ml-3">
                  <Link to="/admin/foodStore" className="nav-link">
                    Item List
                  </Link>
                </li>
              ) : (
                ""
              )}
              {adminAuthenticated ? (
                <li className="nav-links ml-2">
                  <Link to="/admin/cardManager" className="nav-link">
                    Card Manager
                  </Link>
                </li>
              ) : (
                ""
              )}
              {adminAuthenticated ? (
                <li className="nav-links ml-2">
                  <Link to="/admin/accountManager" className="nav-link">
                    Account Manager
                  </Link>
                </li>
              ) : (
                ""
              )}
              {adminAuthenticated ? (
                <li className="nav-links ml-2">
                  <Link to="/admin/ordersManager" className="nav-link">
                    View Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {/* <NavbarToggler onClick={this.toggle} /> */}

            <Nav className="ml-auto nav-links" navbar>
              {adminAuthenticated ? adminLinks : guestLinks}
            </Nav>
          </nav>
        </NavWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(AdminNavbar);

const NavWrapper = styled.nav`
  background: var(--mainDark);
  color: var(--mainDark);
  .nav-link {
    color: var(--mainDark);
    font-size: 1.1rem;
    text-transform: capitalize !important;
  }
`;
