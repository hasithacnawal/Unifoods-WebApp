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
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import { connect } from "react-redux";
import { updateCard } from "../actions/cardActions";
import { addOrder } from "../actions/orderActions";
import PropTypes from "prop-types";
import { CLEAR_CART } from "../actions/types";
import { toast } from "react-toastify";

function newBalance() {
  var balance = document.getElementById("balance").value;
  var orderAmount = document.getElementById("amount").value;
  let total = parseInt(balance) - parseInt(orderAmount);
  console.log(total);
  return total;
}
function enoughBalance() {
  var balance = document.getElementById("balance").value;
  var orderAmount = document.getElementById("amount").value;
  if (orderAmount <= balance) {
    return true;
  }
}
let total = 0;
function getTotal(cart) {
  total = 0;
  if (cart) {
    for (let item of cart) {
      total = total + item.total;
    }
  }
  return total;
}

toast.configure();

class SetOrder extends Component {
  state = {
    modal: false,
    orderNumber: "",
    amount: "",
    items: [],
    type: "Dine In",
    userId: "",
    userRegNo: "",
    cardNumber: "",
    id: "",
    pin: "",
    nameOnCard: "",
    balance: "",
    msg: null
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    updateCard: PropTypes.func.isRequired
  };

  orderDone = () => {
    toast.success("Order placed successfully", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      msg: null
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateCard = e => {
    e.preventDefault();
    const newCard = {
      id: this.state.id,
      cardNumber: this.state.cardNumber,
      userId: this.state.userRegNo,
      nameOnCard: this.state.nameOnCard,
      pin: this.state.pin,
      balance: newBalance()
    };
    this.props.updateCard(newCard.id, newCard);
  };

  onSubmit = e => {
    e.preventDefault();

    const newOrder = {
      // orderNumber: this.state.orderNumber,

      amount: this.state.amount,
      items: this.state.items,
      type: this.state.type,
      userId: this.state.userId,
      userRegNo: this.state.userRegNo,
      cardNumber: this.state.cardNumber
    };
    //add item via additem action

    if (this.state.amount <= this.state.balance) {
      this.props.addOrder(newOrder);
      this.updateCard(e);
      //close model
      this.toggle();
      this.orderDone();
    } else {
      this.setState({
        msg: "You have not enough balance"
      });
    }
  };
  componentDidMount() {
    if (this.props.auth && this.props.card) {
      const { user } = this.props.auth;
      if (user) {
        if (this.props.card) {
          const { card } = this.props.card;
          if (card) {
            this.setState({
              amount: getTotal(this.props.cart),
              items: this.props.cart,
              userId: user.user.id,
              userRegNo: user.user.regNo,
              cardNumber: card.card.cardNumber,
              id: card.card.id,
              nameOnCard: card.card.nameOnCard,
              pin: card.card.pin,
              balance: card.card.balance
            });
          }
        }
      }
    }
  }

  render() {
    const { adminAuthenticated } = this.props.auth;
    if (this.props.auth && this.props.card) {
      const { card } = this.props.card;

      return (
        <div className="container">
          <div className="row">
            <div className="col-9 col-md-4 col-lg-4 mx-auto justify-content-center"></div>
            <Button
              className="btn-primary"
              style={{ marginBottom: "2rem" }}
              onClick={this.toggle}
            >
              Place Order
            </Button>
          </div>

          <MuiThemeProvider>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader>
                <h5 className="text-capitalize text-center"> Place Order</h5>
              </ModalHeader>
              <ModalBody>
                {this.state.msg ? (
                  <Alert color="danger">{this.state.msg}</Alert>
                ) : null}
                {this.state.cardNumber === "" ? (
                  <Alert color="danger">
                    You Must Log In To Your Card Before Place An Order
                  </Alert>
                ) : null}
                <ListItem primaryText=" Your Card Balance" />
                <Input
                  type="text"
                  name="balance"
                  id="balance"
                  disabled
                  defaultValue={this.state.balance}
                />

                <List className="col-2 col-lg-7">
                  <ListItem
                    primaryText="User Id"
                    secondaryText={this.state.regNo}
                  />
                  <ListItem
                    primaryText="Card Number"
                    secondaryText={this.state.cardNumber}
                  />
                  <ListItem primaryText="Type" />
                  <Input
                    type="select"
                    name="type"
                    id="type"
                    onChange={this.onChange}
                  >
                    <option>Dine In</option>
                    <option>Take Away</option>
                  </Input>
                  <ListItem primaryText="Order Amount" />
                  <Input
                    type="text"
                    name="amount"
                    id="amount"
                    disabled
                    defaultValue={this.state.amount}
                  />
                </List>

                <Button
                  className="btn-primary fa-pull-right"
                  style={{ marginTop: "2rem" }}
                  disabled={this.state.amount === "" ? true : false}
                  onClick={this.onSubmit}
                >
                  Confirm and Pay
                </Button>
              </ModalBody>
            </Modal>
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  card: state.card,
  cart: state.cart,
  auth: state.auth
});

export default connect(mapStateToProps, { addOrder, updateCard })(SetOrder);
