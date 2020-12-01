import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Container,
  Alert
} from "reactstrap";
import Title from "../Title";
import AppNavbar from "../navbar/AppNavbar";
class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const styles = {
      button: {
        margine: 15
      }
    };
    const { values, handleChange } = this.props;
    return (
      <>
        <AppNavbar />

        <Title name="Enter" title="User details" />
        <Container>
          <Card className="col-9 mx-auto col-md-6 col-lg-8 my-3 ">
            <CardBody>
              <Form>
                <FormGroup className="row">
                  <div className="col-6">
                    <Label for="firstName">First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter First Name"
                      onChange={handleChange("firstName")}
                      defaultValue={values.firstName}
                    />
                  </div>
                  <div className="col-6">
                    <Label for="lastName">Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter last name"
                      onChange={handleChange("lastName")}
                      defaultValue={values.lastName}
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label for="regNo">Registration number</Label>
                  <Input
                    type="String"
                    name="regNo"
                    id="regNo"
                    placeholder="Enter your reg no"
                    onChange={handleChange("regNo")}
                    defaultValue={values.regNo}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Enter your email"
                    onChange={handleChange("email")}
                    defaultValue={values.email}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password "
                    onChange={handleChange("password")}
                  />
                </FormGroup>

                <FormGroup className="row">
                  <div className="col-6">
                    <Label for="faculty">Select Faculty</Label>
                    <Input
                      type="select"
                      name="faculty"
                      id="faculty"
                      onChange={handleChange("faculty")}
                      defaultValue={values.faculty}
                    >
                      <option>Science Faculty</option>
                      <option>Engineering Faculty</option>
                      <option>Law Faculty</option>
                      <option>Art Faculty</option>
                      <option>Agri Faculty</option>
                    </Input>
                  </div>
                  <div className="col-6">
                    {" "}
                    <Label for="phoneNumber">Phone Number</Label>
                    <Input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Enter Phone Number"
                      onChange={handleChange("phoneNumber")}
                      defaultValue={values.phoneNumber}
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleEmail">Address</Label>
                  <Input
                    type="textarea"
                    name="address"
                    id="address"
                    placeholder="Enter your Addrress"
                    onChange={handleChange("address")}
                    defaultValue={values.address}
                  />
                </FormGroup>
                <Button
                  className="btn-primary col-10 mt-2 ml-md-auto col-md-6 col-lg-3 mx-auto fa-pull-right"
                  styles={styles.button}
                  onClick={this.continue}
                >
                  Continue
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}
export default FormUserDetails;
