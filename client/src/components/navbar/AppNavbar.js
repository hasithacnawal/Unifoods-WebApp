import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
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
  NavLink,
  NavbarText
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginModal from "../auth/LoginModal";
import Logout from "../auth/Logout";
import UserModal from "../auth/UserModal";

export class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="nav-text mr-3">
            <strong>
              {this.props.isAuthenticated
                ? `Welcome ${user.user.firstName}`
                : ""}
            </strong>
          </span>
        </NavItem>
        <Link
          to={
            this.props.isAuthenticated
              ? `/user/${user.user.regNo}/mycart`
              : null
          }
          className="ml-auto nav-links"
        >
          My Cart
          <span>
            <i className="fas fa-cart-plus" />
          </span>
        </Link>

        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );
    return (
      <>
        <NavWrapper className="navbar navbar-expand-sm px-sm-5">
          {/* https://www.iconfinder.com/icons/1243689/call_phone_icon
Creative Commons (Attribution 3.0 Unported);
https://www.iconfinder.com/Makoto_msk  */}
          {/* <Link to="/">
          <img src={logo} alt="store" className="navbar-brand" />
        </Link> */}
          <nav className="navbar">
            <div className="nav-brand">
              <Link to="/">
                <img src={"/logo.png"} alt="unifoods" />
              </Link>
            </div>

            <ul className="navbar-nav align-items-center">
              {this.props.isAuthenticated ? (
                <>
                  <li className="nav-links ml-2">
                    <Link
                      to={`/user/${user.user.regNo}/shop`}
                      className="nav-link"
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-links ml-2">
                    <Link
                      to={`/user/${user.user.regNo}/myaccount`}
                      className="nav-link"
                    >
                      MyAccount
                    </Link>
                  </li>
                  <li className="nav-links ml-2">
                    <Link
                      to={`/user/${user.user.regNo}/cardprofile`}
                      className="nav-link"
                    >
                      Card Profile
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            {/* <NavbarToggler onClick={this.toggle} /> */}
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto nav-links" navbar>
                {this.props.isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </nav>
        </NavWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(AppNavbar);

const NavWrapper = styled.nav`
  background: var(--darkGrey);
  .nav-link {
    color: var(--mainDark);
    font-size: 1.1rem;
    text-transform: capitalize !important;
  }
`;
