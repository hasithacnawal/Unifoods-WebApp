//
import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Container
} from "reactstrap";

import AppNavbar from "../navbar/AppNavbar";
import Title from "../Title";

class FormCardDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    const styles = {
      button: {
        margine: 15
      }
    };
    return (
      <>
        <AppNavbar />
        <div className="container">
          <>
            <Title name="Submit Your" title="card" />
            <Card className="col-9 mx-auto col-md-4 col-lg-6 my-3">
              <br />
              <CardTitle>
                <h5>Card Login</h5>
              </CardTitle>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="cardNumber">Card Number</Label>
                    <Input
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      placeholder="Enter Card Number"
                      className="mb-3"
                      defaultValue={values.cardNumber}
                      onChange={handleChange("cardNumber")}
                    />
                    <Label for="pin">Pin</Label>
                    <Input
                      type="password"
                      name="pin"
                      id="pin"
                      placeholder="pin number"
                      className="mb-3"
                      defaultValue={values.pin}
                      onChange={handleChange("pin")}
                    />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <Container>
              <div className="row">
                <div className="col-9 mx-auto col-md-4 col-lg-6 my-3">
                  <Button
                    className="btn-primary"
                    styles={styles.button}
                    onClick={this.back}
                  >
                    Back
                  </Button>
                  <Button
                    className="btn-primary"
                    style={styles.button}
                    disabled={!values.cardNumber || !values.pin ? true : false}
                    onClick={this.continue}
                  >
                    Submit Card
                  </Button>
                  <Button
                    className="btn-primary text-capitalize"
                    styles={styles.button}
                    onClick={this.continue}
                    disabled={values.cardNumber && values.pin ? true : false}
                  >
                    Skip this step
                  </Button>
                </div>
              </div>
            </Container>
          </>
        </div>
      </>
    );
  }
}
export default FormCardDetails;
