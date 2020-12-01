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
import { registerAdmin } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    msg: null
  };

  static propTypes = {
    tempAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    registerAdmin: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, tempAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    if (this.state.modal) {
      if (tempAuthenticated) {
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
    const { name, email, password, phoneNumber, address } = this.state;

    //Create an user object
    const newAdmin = {
      name,
      email,
      password,
      phoneNumber,
      address
    };
    //Attemp to register
    this.props.registerAdmin(newAdmin);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Add Admin
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register Admin</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter name"
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
  tempAuthenticated: state.auth.tempAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { registerAdmin, clearErrors })(
  RegisterModal
);
