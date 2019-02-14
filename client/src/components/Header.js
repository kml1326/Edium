import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <a href="/" className="logo">
          Edium
          <i class="fas fa-pencil-alt" />
        </a>
      </div>
    );
  }
}
