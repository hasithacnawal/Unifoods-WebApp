import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Card,
  CardBody
} from "reactstrap";
import { connect } from "react-redux";
import { editCard } from "../actions/cardActions";
import PropTypes from "prop-types";
import AdminNavbar from "./navbar/AdminNavbar";
import { Link } from "react-router-dom";
import Title from "./Title";

class CardEdit extends Component {
  state = {
    _id: "",
    userId: "",
    nameOnCard: "",
    cardNumber: "",
    pin: "",
    balance: "",
    submit: false
  };

  static propTypes = {
    adminAuthenticated: PropTypes.bool,
    card: PropTypes.object.isRequired
  };
  // onClick={() => {
  //   value.addToCart(id);
  //   value.openModal(id);
  // }}

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newCard = {
      id: this.state._id,
      userId: this.state.userId,
      nameOnCard: this.state.nameOnCard,
      cardNumber: this.state.cardNumber,
      pin: this.state.pin,
      balance: this.state.balance
    };
    console.log(newCard.id);
    //add item via additem action
    this.props.editCard(newCard.id, newCard);
    //close model
    this.setState({ submit: true });
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
        <AdminNavbar />
        <Title name="edit" title="card details" />
        <Container>
          <Card className="col-9 mx-auto col-md-6 col-lg-8 my-auto">
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="cardNumber">Card Number</Label>
                  <Input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    placeholder="Add Card number"
                    defaultValue={this.state.cardNumber}
                    disabled
                  />

                  <Label for="userId">Card Holder</Label>
                  <Input
                    type="text"
                    name="userId"
                    id="userId"
                    placeholder="Enter Registration Number"
                    defaultValue={this.state.userId}
                    onChange={this.onChange}
                  />
                  <Label for="nameOnCard">Card Holder's Name</Label>
                  <Input
                    type="text"
                    name="nameOnCard"
                    id="nameOnCard"
                    placeholder="Users Name"
                    defaultValue={this.state.nameOnCard}
                    onChange={this.onChange}
                  />
                  <Label for="balance">Balance</Label>
                  <Input
                    type="number"
                    name="balance"
                    id="balance"
                    placeholder="Card Balance"
                    defaultValue={this.state.balance}
                    onChange={this.onChange}
                  />

                  <Link to="/admin/cardmanager">
                    <Button
                      className="btn-dark ml-3"
                      style={{ marginTop: "2rem" }}
                    >
                      Back
                    </Button>
                  </Link>

                  <Button
                    disabled={this.state.submit ? true : false}
                    className="ml-3"
                    color="dark"
                    style={{ marginTop: "2rem" }}
                    onClick={this.onSubmit}
                  >
                    Save
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  card: state.card,
  adminAuthenticated: state.auth.adminAuthenticated
});

export default connect(mapStateToProps, { editCard })(CardEdit);
