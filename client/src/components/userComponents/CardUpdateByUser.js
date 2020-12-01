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
import { updateCard } from "../../actions/cardActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Title from "../Title";

class CardUpdateByUser extends Component {
  state = {
    id: "",
    cardNumber: "",
    userId: "",
    pin: "",
    nameOnCard: "",
    balance: "",
    submit: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    cardLogged: PropTypes.bool,
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
      id: this.state.id,
      userId: this.state.userId,
      nameOnCard: this.state.nameOnCard,
      cardNumber: this.state.cardNumber,
      pin: this.state.pin,
      balance: this.state.balance
    };
    console.log(newCard.id);
    //add item via additem action
    this.props.updateCard(newCard.id, newCard);
    //close model
    this.setState({ submit: true });
  };
  // componentDidMount() {
  //   const { card } = this.props.card;
  //   this.setState({
  //     id: card.id,
  //     userId: card.userId,
  //     nameOnCard: card.nameOnCard,
  //     cardNumber: card.cardNumber,
  //     balance: card.balance
  //   });
  // }

  render() {
    const { card } = this.props.card;
    if (this.state.id != card.card.id) {
      this.setState({
        id: card.card.id,
        userId: card.card.userId,
        nameOnCard: card.card.nameOnCard,
        cardNumber: card.card.cardNumber,
        pin: card.card.pin,
        balance: card.card.balance
      });
    }
    return (
      <>
        {this.props.cardLogged ? (
          <Container>
            <Title name="your Card" title="Details" />
            <Card className="col-9 mx-auto col-md-6 col-lg-8 my-3">
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="cardNumber">Card Number</Label>
                    <Input
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      disabled
                      defaultValue={card.card.cardNumber}
                      placeholder="Add Card number"
                    />
                    <Label for="userId">Card Holder Id</Label>
                    <Input
                      type="text"
                      name="userId"
                      id="userId"
                      placeholder="Enter Registration Number"
                      defaultValue={card.card.userId}
                      onChange={this.onChange}
                    />
                    <Label for="nameOnCard">Card Holder's Name</Label>
                    <Input
                      type="text"
                      name="nameOnCard"
                      id="nameOnCard"
                      placeholder="Users Name"
                      defaultValue={card.card.nameOnCard}
                      onChange={this.onChange}
                    />
                    <Label for="balance">Card Balance</Label>
                    <Input
                      type="text"
                      name="balance"
                      id="balance"
                      disabled
                      placeholder="balance"
                      defaultValue={` Rs. ${card.card.balance}`}
                    />
                    <Button
                      disabled={this.state.submit ? true : false}
                      className="btn-primary ml-3 fa-pull-right"
                      style={{ marginTop: "2rem" }}
                      onClick={this.onSubmit}
                    >
                      Update Card
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Container>
        ) : (
          <h5>Please submit a card to see details</h5>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  card: state.card,
  isAuthenticated: state.auth.isAuthenticated,
  cardLogged: state.card.cardLogged
});

export default connect(mapStateToProps, { updateCard })(CardUpdateByUser);
