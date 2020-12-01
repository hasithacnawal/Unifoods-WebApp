import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormCardDetails from "./FormCardDetails";
import Confirm from "./Confirm";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { cardLogin } from "../../actions/cardActions";

export class UserForm extends Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    regNo: "",
    email: "",
    faculty: "Science Faculty",
    password: "",
    phoneNumber: "",
    address: "",
    cardNumber: "",
    pin: ""
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    cardLogged: PropTypes.bool
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  toggle = () => {
    //clear errors
    this.props.clearErrors();
  };
  onLogin = e => {
    e.preventDefault();

    const { cardNumber, pin } = this.state;

    const card = {
      cardNumber,
      pin
    };
    //Attemp to login
    this.props.cardLogin(card);
    this.toggle();
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
      cardNumber,
      pin,
      address
    } = this.state;

    //Create an user object
    const newUser = {
      firstName,
      lastName,
      regNo,
      email,
      password,
      phoneNumber,
      faculty,
      cardNumber,
      pin,
      address
    };
    //Attemp to register
    this.props.register(newUser);
  };

  //proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };
  //proceed to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };
  //handle field change
  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };
  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      regNo,
      email,
      password,
      phoneNumber,
      faculty,
      cardNumber,
      pin,
      address
    } = this.state;
    const values = {
      firstName,
      lastName,
      regNo,
      email,
      password,
      phoneNumber,
      faculty,
      cardNumber,
      pin,
      address
    };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormCardDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            onLogin={this.onLogin}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            onSubmit={this.onSubmit}
            values={values}
            toggle={this.toggle}
            msg={this.state.msg}
            isAuthenticated={this.props.isAuthenticated}
          />
        );
    }
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  card: state.card,
  cardLogged: state.card.cardLogged,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, cardLogin, clearErrors })(
  UserForm
);
