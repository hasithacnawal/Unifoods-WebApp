import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
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
import { cardLogin } from "../../actions/cardActions";
import { clearErrors } from "../../actions/errorActions";
import AppNavbar from "../navbar/AppNavbar";
import Title from "../Title";
import CardUpdateByUser from "./CardUpdateByUser";

class CardLogin extends Component {
  state = {
    submit: false,
    cardNumber: "",
    pin: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    cardLogged: PropTypes.bool,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    cardLogin: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "CARD_FAILED") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // if (this.state.modal) {
    //   if (isAuthenticated) {
    //     this.toggle();
    //   }
    // }
  }

  toggle = () => {
    //clear errors
    this.props.clearErrors();
    this.setState({
      submit: !this.state.submit
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
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

  render() {
    return (
      <>
        <AppNavbar />
        <div>
          {this.props.isAuthenticated && !this.props.cardLogged ? (
            <>
              <Title name="Submit Your" title="card" />
              <Card className="col-9 mx-auto col-md-4 col-lg-6 my-3">
                <br />
                <CardTitle>
                  <h5>Card Login</h5>
                </CardTitle>
                <CardBody>
                  {this.state.msg ? (
                    <Alert color="danger">{this.state.msg}</Alert>
                  ) : null}
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="cardNumber">Card Number</Label>
                      <Input
                        type="text"
                        name="cardNumber"
                        id="cardNumber"
                        placeholder="Enter Card Number"
                        className="mb-3"
                        onChange={this.onChange}
                      />
                      <Label for="pin">Pin</Label>
                      <Input
                        type="password"
                        name="pin"
                        id="pin"
                        placeholder="pin number"
                        className="mb-3"
                        onChange={this.onChange}
                      />
                      <Button color="dark" style={{ marginTop: "2rem" }}>
                        Submit Card
                      </Button>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </>
          ) : null}
        </div>
        {this.props.cardLogged ? <CardUpdateByUser /> : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  cardLogged: state.card.cardLogged,
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { cardLogin, clearErrors })(CardLogin);
