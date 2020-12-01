import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import uuid from "uuid";
import { connect } from "react-redux";
import { getCards, deleteCard, loadCard } from "../actions/cardActions";
import { Link } from "react-router-dom";
import CardModel from "./CardModel";

import PropTypes from "prop-types";
import CardRecharge from "./CardRecharge";

class CardList extends Component {
  state = {
    rechargeModal: false
  };
  static propTypes = {
    getCards: PropTypes.func.isRequired,
    loadCard: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    adminAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    this.props.getCards();
  }
  onDeleteClick = id => {
    this.props.deleteCard(id);
  };
  onEditCard = id => {
    this.props.loadCard(id);
  };
  onRechargeCard = id => {
    this.props.loadCard(id);
    this.setState({ rechargeModal: true });
  };
  toggle = () => {
    this.setState({
      rechargeModal: !this.state.rechargeModal
    });
  };
  render() {
    const { cards, card } = this.props.card;

    return (
      <React.Fragment>
        <Container>
          {this.state.rechargeModal ? (
            <CardRecharge toggle={this.toggle} />
          ) : (
            ""
          )}
          <Table hover className="mt-3">
            <thead className="thead-dark">
              <tr>
                <th>Card Number</th>
                <th>Name on card</th>
                <th>UserId</th>

                <th>Card Balance</th>
                <th>{""}</th>
              </tr>
            </thead>
            <tbody>
              {cards.map(
                ({ _id, cardNumber, nameOnCard, userId, pin, balance }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <tr>
                      <td className="text-capitalize">{cardNumber}</td>
                      <td className="text-capitalize">{nameOnCard}</td>
                      <td className="text-capitalize">{userId}</td>
                      <td>Rs: {balance}</td>
                      <td>
                        {this.props.adminAuthenticated ? (
                          <>
                            <Button
                              className="btn-dark ml-2"
                              size="sm"
                              onClick={this.onRechargeCard.bind(this, _id)}
                            >
                              Recharge Card
                            </Button>
                            <Button
                              className="btn-dark ml-2"
                              size="sm"
                              onClick={this.onEditCard.bind(this, _id)}
                            >
                              <Link
                                to="/admin/cardmanager/editcard"
                                className="btn-dark"
                                size="sm"
                              >
                                Edit Card
                              </Link>
                            </Button>
                            <Button
                              className="remove-btn ml-2"
                              color="danger"
                              size="sm"
                              onClick={this.onDeleteClick.bind(this, _id)}
                            >
                              Delete Card
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  card: state.card,
  auth: state.auth,
  adminAuthenticated: state.auth.adminAuthenticated
});

export default connect(mapStateToProps, { getCards, loadCard, deleteCard })(
  CardList
);
