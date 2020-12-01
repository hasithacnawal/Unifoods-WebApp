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
import { updateItem } from "../actions/itemAction";
import PropTypes from "prop-types";
import AdminNavbar from "./navbar/AdminNavbar";
import { Link } from "react-router-dom";
import ImgDrop from "./dragndrop/ImgDrop";
import Title from "./Title";

class ItemEdit extends Component {
  state = {
    _id: "",
    img: "",
    title: "",
    img: "",
    price: "",
    qty: "",
    info: "",
    vegi: "",
    submit: false
  };

  static propTypes = {
    adminAuthenticated: PropTypes.bool,
    item: PropTypes.object.isRequired
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

    const newItem = {
      id: this.state._id,
      title: this.state.title,
      img: this.state.img,
      price: this.state.price,
      qty: this.state.qty,
      info: this.state.info,
      vegi: this.state.vegi
    };
    console.log(newItem.id);
    //add item via additem action
    this.props.updateItem(newItem.id, newItem);
    //close model
    this.setState({ submit: true });
  };
  componentDidMount() {
    const { item } = this.props.item;

    this.setState({
      _id: item._id,
      title: item.title,
      img: item.img,
      price: item.price,
      qty: item.qty,
      info: item.info,
      vegi: item.vegi
    });
  }

  render() {
    const { item } = this.props.item;

    if (this.state._id != item._id) {
      this.setState({
        _id: item._id,
        title: item.title,
        img: item.img,
        price: item.price,
        qty: item.qty,
        info: item.info,
        vegi: item.vegi
      });
    }

    return (
      <>
        <AdminNavbar />
        <Title name="Edit" title="item details" />
        <Container>
          <Card className="col-9 mx-auto col-md-6 col-lg-8 my-3">
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="item">Item Name</Label>
                  <Input
                    type="text"
                    name="title"
                    id="item"
                    placeholder="Add shopping Item"
                    defaultValue={this.state.title}
                    onChange={this.onChange}
                  />
                  <FormGroup>
                    <Label for="img">Image</Label>
                    <Input
                      type="text"
                      name="img"
                      id="img"
                      placeholder="image title"
                      defaultValue={this.state.img}
                      onChange={this.onChange}
                    />
                    {/* <ImgDrop image={image} /> */}
                  </FormGroup>
                  <Label for="item">Price</Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Add Price"
                    defaultValue={this.state.price}
                    onChange={this.onChange}
                  />
                  <Label for="qty">Quantitty</Label>
                  <Input
                    type="number"
                    name="qty"
                    id="qty"
                    placeholder="Add quantity"
                    defaultValue={this.state.qty}
                    onChange={this.onChange}
                  />
                  <Label for="info">Info</Label>
                  <Input
                    type="text"
                    name="info"
                    id="info"
                    placeholder="Add Info"
                    defaultValue={this.state.info}
                    onChange={this.onChange}
                  />

                  <Label check for="vegi">
                    <Input
                      type="checkbox"
                      name="vegi"
                      checked={this.state.vegi ? true : false}
                      onChange={this.onChange}
                      defaultValue={item.vegi}
                      id="vegi"
                    />{" "}
                    vegitarian
                  </Label>

                  <Button
                    color="dark"
                    style={{ marginTop: "2rem" }}
                    className="ml-3"
                  >
                    <Link to="/admin/foodstore" className="btn-dark">
                      Back
                    </Link>
                  </Button>
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
  item: state.item,
  adminAuthenticated: state.auth.adminAuthenticated
});

export default connect(mapStateToProps, { updateItem })(ItemEdit);
