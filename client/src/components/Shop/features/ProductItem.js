import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

class ProductItem extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <>
        <ProductWrapper className="col-9 mx-auto col-md-4 col-lg-3 my-3">
          <div className="card">
            <div className="img-container p-5">
              <img
                src={`/products/${this.props.product.img}`}
                alt="product"
                className="card-img-top"
                onClick={this.toggle}
              />

              <button
                className="cart-btn"
                onClick={() => this.props.addToCart(this.props.product)}
              >
                <p className=" text-capitalize mb-0" disabled>
                  Add to cart (
                  {(this.props.cartItem && this.props.cartItem.count) || 0})
                </p>
              </button>
            </div>

            {/* card footer */}
            <div className="card-footer d-flex justify-content-between">
              <h5 className="align-self-center mb=0 text-capitalize">
                {this.props.product.title}
              </h5>
              <div>
                <h5 className="text-blue font-italic mb=0">
                  <span> Rs: </span>
                  {this.props.product.price}.00
                </h5>

                {this.props.cartItem ? (
                  <button
                    className="remove-btn ml-1"
                    size="sm"
                    onClick={() =>
                      this.props.removeFromCart(this.props.cartItem)
                    }
                  >
                    <p className=" text-capitalize mb-0" disabled>
                      Remove
                    </p>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </ProductWrapper>

        <Modal
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          className="col-12 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-4 bg-top"
        >
          <ModalBody>
            {" "}
            <h5>Item Details</h5>
            <img
              src={`/products/${this.props.product.img}`}
              style={{ width: "20rem", height: "15rem" }}
              className="img-fluid"
              alt="product"
            />
            <h5>{this.props.product.title}</h5>
            <p className="text-capitalize">{this.props.product.info}</p>
            <h5 className="text-muted">
              price : Rs: {this.props.product.price}
            </h5>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-red" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ProductItem;

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0 4rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: var(--darkGrey);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }

  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--primaryColor);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4 rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s linear;
  }
  .incart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4 rem;
    border-radius: 0.5rem 0 0 0;
    //transform: translate(0, 0);
    transition: all 1s linear;
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainDark);
    cursor: pointer;
  }
`;
