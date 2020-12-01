import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editCard, getCards } from "../actions/cardActions";
import { clearErrors } from "../actions/errorActions";
import Title from "./Title";

function newBalance() {
  var balance = document.getElementById("balance").value;
  var rechargeAmount = document.getElementById("rechargeAmount").value;
  let total = parseInt(balance) + parseInt(rechargeAmount);
  console.log(total);
  return total;
}

class CardRecharge extends Component {
  state = {
    _id: "",
    userId: "",
    nameOnCard: "",
    cardNumber: "",
    pin: "",
    balance: "",
    rechargeAmount: "0",
    msg: null
  };

  static propTypes = {
    cardLogged: PropTypes.bool,
    card: PropTypes.object.isRequired,
    updateCard: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { card } = this.props.card;
    this.setState({
      _id: card._id,
      userId: card.userId,
      nameOnCard: card.nameOnCard,
      cardNumber: card.cardNumber,
      pin: card.pin,
      balance: card.balance
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { balance, rechargeAmount } = this.state;
    e.preventDefault();

    const newCard = {
      id: this.state._id,
      userId: this.state.userId,
      nameOnCard: this.state.nameOnCard,
      cardNumber: this.state.cardNumber,
      pin: this.state.pin,

      balance: newBalance()
    };
    console.log(newCard.id);
    //add item via additem action
    this.props.editCard(newCard.id, newCard);
    //close model
    this.props.toggle(e);
    this.props.getCards();
  };

  render() {
    const { card } = this.props.card;
    if (this.state._id != card._id) {
      this.setState({
        _id: card._id,
        userId: card.userId,
        nameOnCard: card.nameOnCard,
        cardNumber: card.cardNumber,
        pin: card.pin,
        balance: card.balance
      });
    }
    return (
      <>
        <div>
          <>
            <Title name="Submit Your" title="card" />
            <Card className="col-9 mx-auto col-md-4 col-lg-4 my-3">
              <br />
              <CardTitle>
                <h5>Recharge Card</h5>
              </CardTitle>
              <CardBody>
                {this.state.msg ? (
                  <Alert color="danger">{this.state.msg}</Alert>
                ) : null}
                <Form>
                  <FormGroup className="row">
                    <Label for="cardNumber">Card Number</Label>
                    <Input
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      disabled
                      placeholder="Enter Amount"
                      defaultValue={this.state.cardNumber}
                      className="mb-3"
                    />
                    <Label for="balance">Current Balance</Label>
                    <Input
                      type="number"
                      name="balance"
                      id="balance"
                      disabled
                      placeholder="Enter Amount"
                      defaultValue={this.state.balance}
                      className="mb-3"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="rechargeAmount">Recharge Amount</Label>
                    <Input
                      type="number"
                      name="rechargeAmount"
                      id="rechargeAmount"
                      placeholder="Enter Amount"
                      className="mb-3"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Form>
                <Button
                  onClick={this.onSubmit}
                  disabled={this.state.rechargeAmount === "0" ? true : false}
                >
                  Recharge
                </Button>
              </CardBody>
            </Card>
          </>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  cardLogged: state.card.cardLogged,
  card: state.card,
  error: state.error
});

export default connect(mapStateToProps, { editCard, getCards, clearErrors })(
  CardRecharge
);
