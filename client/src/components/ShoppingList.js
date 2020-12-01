import React, { Component, Fragment } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import uuid from "uuid";
import { connect } from "react-redux";
import { getItems, deleteItem, loadItem } from "../actions/itemAction";
import { Link } from "react-router-dom";
import ItemModel from "./ItemModel";

import PropTypes from "prop-types";

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    adminAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  itemEdit = id => {
    this.props.loadItem(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <>
        <div className="col-10 mx-auto my-auto">
          <Table hover>
            <thead className="thead-dark">
              <th>Product Icon</th>
              <th>Food Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Info</th>

              <th></th>
              <th>
                {" "}
                <Button
                  className="btn-lite ml-2 mt-2"
                  onClick={this.props.getItems}
                >
                  {" "}
                  Refresh List
                </Button>{" "}
              </th>
            </thead>
            <tbody>
              {items.map(({ _id, title, img, price, qty, info, vegi }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <tr>
                    <td>
                      <img
                        src={`/products/${img}`}
                        style={{ width: "5rem", height: "5rem" }}
                        className="img-fluid"
                        alt="product"
                      />
                    </td>
                    <td className="text-capitalize">{title}</td>
                    <td className="text-capitalize">Rs:{price}</td>
                    <td className="text-capitalize">{qty} items</td>
                    <td className="text-capitalize">{info}</td>

                    {this.props.adminAuthenticated ? (
                      <>
                        <td>
                          <Button
                            className="btn-dark"
                            size="sm"
                            onClick={this.itemEdit.bind(this, _id)}
                          >
                            <Link
                              to="/admin/foodstore/itemedit"
                              className="btn-dark"
                            >
                              Edit
                            </Link>
                          </Button>
                        </td>
                        <td>
                          <Button
                            className="remove-btn"
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
              ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  adminAuthenticated: state.auth.adminAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem, loadItem })(
  ShoppingList
);
