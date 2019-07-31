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
    onRegister: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  render() {
    const { error, loading } = this.props.auth;
    return (
      <div>
        <div className="container">
          {loading && <p className="alert alert-info mb-3">Loading...</p>}
          <h3 className="mt-5 mb-5">Register</h3>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-goup">
              <label className="text-muted">
                Name
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  name="name"
                  onChange={this.onChange.bind(this)}
                />
              </label>
              {error.name && (
                <p className="alert alert-danger mb-3">{error.name}</p>
              )}
            </div>
            <div className="form-goup">
              <label className="text-muted">
                Email
                <input
                  type="text"
                  className="form-control"
                  value={this.state.email}
                  name="email"
                  onChange={this.onChange.bind(this)}
                />
              </label>
              {error.email && (
                <p className="alert alert-danger mb-3">{error.email}</p>
              )}
            </div>
            <div className="form-goup">
              <label className="text-muted">
                Password
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  name="password"
                  onChange={this.onChange.bind(this)}
                />
              </label>
              {error.password && (
                <p className="alert alert-danger mb-3">{error.password}</p>
              )}
            </div>
            <button type="submit" className="btn btn-raised btn-primary mt-3">
              Register
            </button>
          </form>

          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { onRegister }
)(withRouter(Login));
