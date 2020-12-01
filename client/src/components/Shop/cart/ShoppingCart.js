import React from "react";
import { ADDTOCART, REMOVE_FROM_CART, REMOVEALL } from "../../../actions/types";
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";
import SetOrder from "../../SetOrder";
import Axios from "axios";

let total = 0;

function sort(items) {
  return items.sort((a, b) => a._id < b._id);
}

// function getTotal(cart) {
//   if (cart) {
//     for (let item of cart) {
//       total = total + item.total;
//     }
//   }
//   return total;
// }
function getTotal(cart) {
  total = 0;
  if (cart) {
    for (let item of cart) {
      total = total + item.total;
    }
  }
  return total;
}
function ShoppingCart(props) {
  return (
    <>
      {sort(props.cart).map(item => (
        <div>
          <Table hover>
            <tbody>
              <tr>
                <div className="row my-2 text-capitalize text-center">
                  <div className="col-10 mx-auto col-lg-2">
                    <img
                      src={`/products/${item.img}`}
                      style={{ width: "5rem", height: "5rem" }}
                      className="img-fluid"
                      alt="product"
                    />
                  </div>
                  <div className="col-10 mx-auto col-lg-2">
                    <span className="d-lg-none">product :</span>
                    {item.title}
                  </div>
                  <div className="col-10 mx-auto col-lg-2">
                    <span className="d-lg-none">price :</span>
                    {item.price}
                  </div>
                  <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0 ">
                    <div className="d-flex justify-content-center">
                      <div>
                        <span
                          className="btn btn-black mx-1"
                          onClick={() => props.removeFromCart(item)}
                        >
                          <i className="fas fa-minus" />
                        </span>
                        <span className="btn btn-count mx-1">{item.count}</span>
                        <span
                          className="btn btn-black mx-1"
                          onClick={() => props.addToCart(item)}
                        >
                          <i className="fas fa-plus" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-10 mx-auto col-lg-2">
                    <div
                      className="cart-icon"
                      onClick={() => props.removeAll(item)}
                    >
                      <i className="fas fa-trash" />
                    </div>
                  </div>
                  <div className="col-10 mx-auto col-lg-2">
                    <strong className="d-lg-none"> item total : </strong>
                    {item.total}
                  </div>
                </div>
              </tr>
            </tbody>
          </Table>
        </div>
      ))}
      <div className="fa-pull-right">
        <h3>Total : {getTotal(props.cart)}.00</h3>

        <SetOrder cart={props.cart} />
      </div>
    </>
  );
}
const mapStateToProps = state => {
  return {
    cart: state.cart,
    card: state.card
      ? state.card.card
        ? state.card.card
        : undefined
      : undefined
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    addToCart: item => {
      dispatch({ type: ADDTOCART, payload: item });
    },
    removeFromCart: item => {
      dispatch({ type: REMOVE_FROM_CART, payload: item });
    },
    removeAll: item => {
      dispatch({ type: REMOVEALL, payload: item });
    }
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(ShoppingCart);
