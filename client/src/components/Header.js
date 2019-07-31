import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { signout } from "../store/actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    signout: PropTypes.func.isRequired
  };

  render() {
    const { isAuth, user } = this.props.auth;
    return (
      <header className="header">
        <div className="container">
          <ul className="mainMenu">
            <li className="mainMenu__item">
              <NavLink
                exact
                className="mainMenu__link"
                activeClassName="mainMenu__link_active"
                to="/"
              >
                API
              </NavLink>
            </li>
            <li className="mainMenu__item">
              <NavLink
                exact
                className="mainMenu__link"
                activeClassName="mainMenu__link_active"
                to="/users"
              >
                Users
              </NavLink>
            </li>
            <li className="mainMenu__item">
              <NavLink
                className="mainMenu__link"
                activeClassName="mainMenu__link_active"
                to="/posts"
              >
                Posts
              </NavLink>
            </li>
            {!isAuth && (
              <>
                <li className="mainMenu__item">
                  <NavLink
                    className="mainMenu__link"
                    activeClassName="mainMenu__link_active"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="mainMenu__item">
                  <NavLink
                    className="mainMenu__link"
                    activeClassName="mainMenu__link_active"
                    to="/signup"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {isAuth && (
              <>
                <li className="mainMenu__item">
                  <NavLink
                    className="mainMenu__link"
                    activeClassName="mainMenu__link_active"
                    to={`/users/${user._id}`}
                  >
                    {user.name}
                  </NavLink>
                </li>
                <li className="mainMenu__item">
                  <p
                    className="mainMenu__link"
                    onClick={this.props.signout.bind(this, this.props.history)}
                  >
                    Logout
                  </p>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { signout }
)(withRouter(Header));
