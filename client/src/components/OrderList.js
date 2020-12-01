import React, { Component, Fragment } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Table,
  Badge,
  Modal,
  ModalBody,
  FormGroup,
  Label
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import uuid from "uuid";
import { connect } from "react-redux";
import { getOrders, deleteOrder, updateOrder } from "../actions/orderActions";
import { toast } from "react-toastify";

import PropTypes from "prop-types";

toast.configure();

class OrderList extends Component {
  state = {
    isOpen: false
  };
  static propTypes = {
    getOrders: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    adminAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getOrders();
  }
  onDeleteClick = id => {
    this.props.deleteOrder(id);
  };
  onDoneClick = id => {
    const { orders } = this.props.order;
    this.props.loadOrder(id);
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  orderDone = () => {
    toast.success("Order Complete notification just sent", {
      position: toast.POSITION.TOP_RIGHT
    });
  };
  render() {
    const { orders } = this.props.order;
    return (
      <React.Fragment>
        <Container>
          <Table hover className="mt-3">
            <thead className="thead-dark">
              <th>Order Id</th>
              <th>User Id</th>
              <th>Card Number</th>
              <th>Items</th>
              <th>Type</th>
              <th>Amount</th>

              <th></th>
            </thead>
            <tbody>
              {orders.map(
                ({
                  _id,
                  amount,
                  type,
                  done,
                  items,
                  userId,
                  userRegNo,
                  cardNumber
                }) => (
                  <>
                    <Modal
                      isOpen={this.state.isOpen}
                      toggle={this.toggle}
                      className="col-9 col-lg-6 mx-auto my-2"
                    >
                      <ModalBody>
                        <Table>
                          <thead>
                            <th>Icon</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                          </thead>

                          <tbody>
                            {items.map(({ title, count, img }) => (
                              <tr>
                                <td>
                                  <img
                                    src={`/products/${img}`}
                                    style={{ width: "3rem", height: "3rem" }}
                                    className="img-fluid"
                                    alt="product"
                                  />
                                </td>
                                <td>{title}</td>
                                <td>{count}</td>
                              </tr>
                            ))}{" "}
                          </tbody>
                        </Table>
                      </ModalBody>
                    </Modal>
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <tr>
                        <td className="text-capitalize">
                          {_id}
                          {!done ? (
                            <Badge pill color="warning">
                              New
                            </Badge>
                          ) : null}
                        </td>
                        <td className="text-capitalize">{userRegNo}</td>
                        <td className="text-capitalize">{cardNumber}</td>
                        <td className="text-capitalize">
                          <Button
                            className="btn-dark "
                            size="sm"
                            onClick={this.toggle}
                          >
                            view order
                          </Button>
                        </td>
                        <td className="text-capitalize"> {type} </td>
                        <td className="text-capitalize">{amount}</td>
                        {this.props.adminAuthenticated ? (
                          <>
                            <td>
                              <Button
                                className="btn-success ml-1"
                                size="sm"
                                onClick={this.orderDone}
                              >
                                Done
                              </Button>

                              <Button
                                className="remove-btn ml-2"
                                color="danger"
                                size="sm"
                                onClick={this.onDeleteClick.bind(this, _id)}
                              >
                                Remove
                              </Button>
                            </td>
                          </>
                        ) : null}
                      </tr>
                    </CSSTransition>
                  </>
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
  order: state.order,
  adminAuthenticated: state.auth.adminAuthenticated
});

export default connect(mapStateToProps, {
  getOrders,
  deleteOrder,
  updateOrder
})(OrderList);
