import React, { Component } from "react";
import { Button, Alert, CardBody, Card, CardFooter } from "reactstrap";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import Title from "../Title";
import AppNavbar from "../navbar/AppNavbar";

class Confirm extends Component {
  continue() {
    console.log("continued");
    //process form
    this.props.nextStep();
  }
  back = e => {
    e.preventDefault();
    this.props.prevStep();
    this.toggle(e);
  };
  submit = e => {
    console.log("submitted");
    e.preventDefault();
    this.props.onSubmit(e);
  };
  addCard = e => {
    e.preventDefault();
    this.props.onAddCard(e);
  };
  toggle = e => {
    e.preventDefault();
    this.props.toggle();
  };

  render() {
    const styles = {
      button: {
        margine: 15
      }
    };
    const {
      values: {
        firstName,
        lastName,
        regNo,
        email,
        phoneNumber,
        faculty,
        address,
        cardNumber,
        pin
      }
    } = this.props;
    return (
      <React.Fragment>
        <AppNavbar />
        <br />
        <Title name="User data" title="Confirm" />
        <div className="container">
          <MuiThemeProvider>
            <Card className="col-9 mx-auto col-md-4 col-lg-6 my-3">
              <CardBody>
                {" "}
                {this.props.msg ? (
                  <Alert color="danger">{this.props.msg}</Alert>
                ) : null}
                <List className="col-2 col-lg-7">
                  <ListItem
                    primaryText="Name"
                    secondaryText={firstName + "  " + lastName}
                  />
                  <ListItem
                    primaryText="Registration Number"
                    secondaryText={regNo}
                  />
                  <ListItem primaryText="Email" secondaryText={email} />
                  <ListItem primaryText="Faculty" secondaryText={faculty} />
                  <ListItem
                    primaryText="Canteen Card Number"
                    secondaryText={cardNumber}
                  />
                  <ListItem
                    primaryText="Phone Number"
                    secondaryText={phoneNumber}
                  />
                  <ListItem primaryText="Address" secondaryText={address} />
                </List>
                <Button
                  className=" btn-primary"
                  disabled={this.props.isAuthenticated ? true : false}
                  styles={styles.button}
                  onClick={this.back}
                >
                  Back
                </Button>
                <Button
                  className=" btn-primary ml-1"
                  styles={styles.button}
                  disabled={this.props.isAuthenticated ? true : false}
                  onClick={this.submit}
                >
                  Save User
                </Button>
              </CardBody>
            </Card>
          </MuiThemeProvider>
        </div>
      </React.Fragment>
    );
  }
}
export default Confirm;
