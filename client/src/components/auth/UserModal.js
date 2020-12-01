import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class UserModal extends Component {
  state = {
    modal: false,
    firstName: "",
    lastName: "",
    regNo: "",
    email: "",
    faculty: "Science Faculty",
    password: "",
    canteenCardNo: "088561",
    nameOnCard: "chansan",
    pinNumber: "4400",
    phoneNumber: "074855",
    address: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    //clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      regNo,
      email,
      password,
      phoneNumber,
      faculty,
      canteenCardNo,
      nameOnCard,
      pinNumber,
      address
    } = this.state;

    //Create an user object
    const newAdmin = {
      firstName,
      lastName,
      regNo,
      email,
      password,
      phoneNumber,
      faculty,
      canteenCardNo,
      nameOnCard,
      pinNumber,
      address
    };
    //Attemp to register
    this.props.register(newAdmin);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          UserAdd
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register User</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="firstName">fName</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter firstName"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="lastName">lName</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter lastName"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="regNo">RegNo</Label>
                <Input
                  type="text"
                  name="regNo"
                  id="regNo"
                  placeholder="regNo"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="email">email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="phoneNumber">Phone Number</Label>
                <Input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="address">Address</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter address"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(UserModal);
