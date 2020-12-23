import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Collapse, Nav, NavItem } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginModal from "../auth/LoginModal";
import Logout from "../auth/Logout";

export class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { userInfo } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="nav-text mr-3">
            <strong>
              {this.props.isAuthenticated
                ? `Welcome ${userInfo.user.firstName}`
                : ""}
            </strong>
          </span>
        </NavItem>
        <Link
          to={this.props.isAuthenticated ? `/mycart` : null}
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
                    <Link to={`/shop`} className="nav-link">
                      Products
                    </Link>
                  </li>
                  <li className="nav-links ml-2">
                    <Link to={`/myaccount`} className="nav-link">
                      MyAccount
                    </Link>
                  </li>
                  <li className="nav-links ml-2">
                    <Link to={`/cardprofile`} className="nav-link">
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
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
