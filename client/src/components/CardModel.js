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
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { addCard, getCards } from "../actions/cardActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";

class CardModel extends Component {
  state = {
    modal: false,
    userId: "",
    nameOnCard: "",
    cardNumber: "",
    pin: "",
    balance: 0,
    submit: false,
    msg: null
  };

  static propTypes = {
    adminAuthenticated: PropTypes.bool,
    cardLogged: PropTypes.bool,
    error: PropTypes.object.isRequired,
    addCard: PropTypes.func.isRequired,
    getCards: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, cardLogged } = this.props;
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "CARD_FAILED") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    } else if (this.state.modal) {
      if (this.state.submit) {
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
  getCards = () => {
    //clear errors
    this.props.clearErrors();
    this.props.getCards();
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    //Create an card object
    const newCard = {
      userId: this.state.userId,
      nameOnCard: this.state.nameOnCard,
      cardNumber: this.state.cardNumber,
      pin: this.state.pin,
      balance: this.state.balance
    };
    //add item via addcard action
    this.props.addCard(newCard);
  };

  render() {
    return (
      <div>
        {this.props.adminAuthenticated ? (
          <>
            <Button
              color="dark"
              style={{
                marginBottom: "2rem",
                marginTop: "3rem",
                marginLeft: "1rem"
              }}
              onClick={this.toggle}
            >
              AddCard{" "}
            </Button>
            <Button
              color="dark"
              style={{
                marginBottom: "2rem",
                marginTop: "3rem",
                marginLeft: "1rem"
              }}
              onClick={this.getCards}
            >
              Refresh List{" "}
            </Button>{" "}
          </>
        ) : null}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Card</ModalHeader>
          <ModalBody>
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
                  placeholder="Add Card number"
                  onChange={this.onChange}
                />
                <Label for="pin">Pin Number</Label>
                <Input
                  type="password"
                  name="pin"
                  id="pin"
                  placeholder="Pin Number"
                  onChange={this.onChange}
                />
                <Label for="userId">Card Holder</Label>
                <Input
                  type="text"
                  name="userId"
                  id="userId"
                  placeholder="Enter Registration Number"
                  onChange={this.onChange}
                />
                <Label for="nameOnCard">Card Holder's Name</Label>
                <Input
                  type="text"
                  name="nameOnCard"
                  id="nameOnCard"
                  placeholder="Users Name"
                  onChange={this.onChange}
                />
                <Label for="balance">Balance</Label>
                <Input
                  type="number"
                  name="balance"
                  id="balance"
                  placeholder="Card Balance"
                  onChange={this.onChange}
                />

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Card
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
  card: state.card,
  error: state.error,
  cardLogged: state.card.cardLogged,
  adminAuthenticated: state.auth.adminAuthenticated
});

export default connect(mapStateToProps, { clearErrors, addCard, getCards })(
  CardModel
);
