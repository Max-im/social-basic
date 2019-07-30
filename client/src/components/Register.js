import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { onRegister } from "../store/actions/auth";

export class Login extends Component {
  state = { name: "", password: "", email: "" };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onRegister(this.state, this.props.history);
    this.setState({ email: "", password: "", name: "" });
  }

  static propTypes = {
    onRegister: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <div className="container">
          <h3>Register</h3>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              value={this.state.name}
              name="name"
              placeholder="name"
              onChange={this.onChange.bind(this)}
            />
            <input
              type="text"
              value={this.state.email}
              name="email"
              placeholder="email"
              onChange={this.onChange.bind(this)}
            />
            <input
              type="password"
              value={this.state.password}
              name="password"
              placeholder="password"
              onChange={this.onChange.bind(this)}
            />
            <button type="submit">Register</button>
          </form>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { onRegister }
)(withRouter(Login));
