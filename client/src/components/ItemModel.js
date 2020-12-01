import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemAction";
import PropTypes from "prop-types";
import ImgDrop from "./dragndrop/ImgDrop";

class ItemModel extends Component {
  state = {
    modal: false,
    img: "",
    title: "",
    img: "",
    price: "",
    qty: 0,
    info: "",
    vegi: false,
    inCart: false,
    count: 0,
    total: 0
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      title: this.state.title,
      img: this.state.img,
      price: this.state.price,
      qty: this.state.qty,
      info: this.state.info,
      vegi: this.state.vegi,
      inCart: this.state.inCart,
      count: this.state.count,
      total: this.state.total
    };
    //add item via additem action
    this.props.addItem(newItem);
    //close model
    this.toggle();
  };

  render() {
    const { adminAuthenticated } = this.props.auth;
    const { img } = this.state;
    const image = img;

    return (
      <div className="col-10 mx-auto my-auto">
        {adminAuthenticated ? (
          <Button className="btn-dark ml-2 mt-2 mb-2" onClick={this.toggle}>
            AddItem{" "}
          </Button>
        ) : (
          <h4 className="mb-3 ml-4"></h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item Name</Label>
                <Input
                  type="text"
                  name="title"
                  id="item"
                  placeholder="Add shopping Item"
                  onChange={this.onChange}
                />
                <FormGroup>
                  <Label for="img">Image</Label>
                  <Input
                    type="text"
                    name="img"
                    id="img"
                    placeholder="image title"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Label for="item">Price</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Add Price"
                  onChange={this.onChange}
                />
                <Label for="qty">Quantitty</Label>
                <Input
                  type="number"
                  name="qty"
                  id="qty"
                  placeholder="Add quantity"
                  onChange={this.onChange}
                />
                <Label for="info">Info</Label>
                <Input
                  type="text"
                  name="info"
                  id="info"
                  placeholder="Add Info"
                  onChange={this.onChange}
                />

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  AddItem
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
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { addItem })(ItemModel);
