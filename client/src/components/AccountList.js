import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import uuid from "uuid";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../actions/authActions";
import PropTypes from "prop-types";

class AccountList extends Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    adminAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    this.props.getUsers();
  }
  onDeleteClick = id => {
    this.props.deleteUser(id);
  };
  render() {
    const { users } = this.props.auth;
    // const { adminAuthenticated } = this.props.auth;
    return (
      <Container>
        <Table hover className="mt-4">
          <thead className="thead-dark">
            <th>Name</th>
            <th>Email</th>
            <th>Registration Number</th>
            <th>Phone Number</th>
            <th>Card Number</th>
            <th>{""}</th>
          </thead>
          <tbody>
            {users.map(
              ({
                _id,
                firstName,
                lastName,
                regNo,
                phoneNumber,
                email,
                cardNumber
              }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <tr>
                    <td className="text-capitalize">
                      {firstName} {lastName}
                    </td>
                    <td>{email}</td>
                    <td className="text-capitalize">{regNo}</td>
                    <td className="text-capitalize">{phoneNumber}</td>
                    <td className="text-capitalize">{cardNumber}</td>
                    <td>
                      {this.props.adminAuthenticated ? (
                        <>
                          <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={this.onDeleteClick.bind(this, _id)}
                          >
                            Remove
                          </Button>
                        </>
                      ) : null}
                    </td>
                  </tr>
                </CSSTransition>
              )
            )}
          </tbody>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  adminAuthenticated: state.auth.adminAuthenticated
});

export default connect(mapStateToProps, { getUsers, deleteUser })(AccountList);
