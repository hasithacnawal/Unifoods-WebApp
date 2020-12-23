import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  Label,
  Input,
} from "reactstrap";
import { updateUser } from "../../actions/authActions";
import AppNavbar from "../../components/navbar/AppNavbar";
import Title from "../../components/Title";
import { withRouter } from "react-router-dom";

export class MyAccount extends Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    regNo: "",
    faculty: "",
    phoneNumber: "",
    address: "",
    cardNumber: "",
    pin: "",
    submit: false,
  };
  static propTypes = {
    card: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    if (this.props.auth) {
      const { userInfo } = this.props.auth;
      if (userInfo) {
        const { user } = this.props.auth.userInfo;
        this.setState({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          regNo: user.regNo,
          faculty: user.faculty,
          phoneNumber: user.phoneNumber,
          address: user.address,
          cardNumber: user.cardNumber,
          pin: user.pin,
        });
      } else {
        this.props.history.push("/shop");
      }
    }
  }
  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      regNo: this.state.regNo,
      faculty: this.state.faculty,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      cardNumber: this.state.cardNumber,
      pin: this.state.pin,
    };

    //add item via additem action
    this.props.updateUser(newUser.id, newUser);
    //close model
    this.setState({ submit: true });
  };

  render() {
    const styles = {
      button: {
        margine: 15,
      },
    };

    return (
      <>
        <AppNavbar />
        <Title name="My" title="Account" className="mt-3 mb-3" />
        <div className="container">
          <div className="row">
            <Card className="col-12 col-md-8">
              <CardTitle> </CardTitle>
              <CardBody>
                <Form className="container ">
                  <div className="row">
                    <div className="col-6 mx-auto">
                      <Label for="firstName">First Name</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter First Name"
                        onChange={this.onChange}
                        defaultValue={this.state.firstName}
                      />
                    </div>
                    <div className="col-6 mx-auto">
                      <Label for="lastName">Last Name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter last name"
                        onChange={this.onChange}
                        defaultValue={this.state.lastName}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-6 mx-auto">
                      <Label for="regNo">Registration number</Label>
                      <Input
                        type="String"
                        name="regNo"
                        id="regNo"
                        placeholder="Enter your reg no"
                        disabled
                        defaultValue={this.state.regNo}
                      />
                    </div>
                    <div className="col-6 mx-auto">
                      <Label for="exampleEmail">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="Enter your email"
                        disabled
                        defaultValue={this.state.email}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-6 mx-auto">
                      <Label for="faculty">Select Faculty</Label>
                      <Input
                        type="select"
                        name="faculty"
                        id="faculty"
                        onChange={this.onChange}
                        defaultValue={this.state.faculty}
                      >
                        {" "}
                        <option>Science Faculty</option>
                        <option>Engineering Faculty</option>
                        <option>Law Faculty</option>
                        <option>Art Faculty</option>
                        <option>Agri Faculty</option>
                      </Input>
                    </div>

                    <div className="col-6 mx-auto">
                      <Label for="phoneNumber">Phone Number</Label>
                      <Input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        onChange={this.onChange}
                        defaultValue={this.state.phoneNumber}
                      ></Input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <Label for="address">Address</Label>
                      <Input
                        type="textarea"
                        name="address"
                        id="address"
                        onChange={this.onChange}
                        defaultValue={this.state.address}
                      ></Input>
                    </div>
                  </div>
                </Form>
                <Button
                  className="btn-primary mt-3 fa-pull-right"
                  styles={styles.button}
                  onClick={this.onSubmit}
                  disabled={this.state.submit ? true : false}
                >
                  Update Profile
                </Button>
              </CardBody>
            </Card>
            <div className="col-12 mx-auto col-md-4 col-lg-4 text-center text-capitalize p-4 bg-top">
              <Card>
                <CardBody>
                  {" "}
                  <h5>User Details</h5>
                  <img
                    src="/avatar.png"
                    style={{ width: "20rem", height: "15rem" }}
                    className="img-fluid"
                    alt="user"
                  />
                  <h3>{this.state.firstName}</h3> <h3>{this.state.lastName}</h3>
                  <h5 className="text-muted text-uppercase">
                    {this.state.regNo}
                  </h5>
                  <p> {this.state.email}</p>
                  <h6 className="text-capitalize">{this.state.phoneNumber}</h6>
                </CardBody>
                {/* <CardImg
                top
                width=""
                src="/img/avatar.png"
                alt="Card image cap"
              /> */}
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  card: state.card,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { updateUser })(withRouter(MyAccount));
