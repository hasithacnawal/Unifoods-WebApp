import React, { Component } from "react";
import CardLogin from "../../components/userComponents/CardLogin";
import CardUpdateByUser from "../../components/userComponents/CardUpdateByUser";

export class CardProfile extends Component {
  render() {
    return (
      <>
        <div className="container">
          <CardLogin />
        </div>
      </>
    );
  }
}

export default CardProfile;
