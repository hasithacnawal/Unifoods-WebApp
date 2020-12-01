import React, { Component } from "react";

class UserCard extends Component {
  render() {
    return (
      <div className="card card-user">
        <div className="image">
          <img src="/img/avatar.png" alt="..." />
        </div>
        <div className="content">
          <div className="author">
            <a href="#pablo">
              <img
                className="avatar border-gray"
                src="/img/avatar.png"
                alt="user_default"
              />
              <h4 className="title">
                {this.props.firstName}
                {""}
                {this.props.lastName}
                <br />
                <small>{this.props.regNo}</small>
              </h4>
            </a>
          </div>
          <p className="description text-center">{this.props.address}</p>
        </div>
        <hr />
      </div>
    );
  }
}

export default UserCard;
