import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { onLogin } from "../store/actions/auth";

export class Login extends Component {
  state = { email: "", password: "" };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onLogin(this.state, this.props.history);
    this.setState({ email: "", password: "" });
  }

  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <div className="container">
          <h3>Login</h3>
          <form onSubmit={this.onSubmit.bind(this)}>
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
              placeholder="password"
              name="password"
              onChange={this.onChange.bind(this)}
            />
            <button type="submit">Login</button>
          </form>
          <Link to="/signup">Register</Link>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { onLogin }
)(withRouter(Login));
