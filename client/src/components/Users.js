import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../store/actions/users";
import defaultAvatar from "../assets/avatar.png";

export class Users extends Component {
  componentDidMount() {
    if (!this.props.users.users) this.props.getUsers();
  }

  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
  };

  render() {
    const { users } = this.props.users;
    return (
      <div>
        <div className="container">
          <h3>Users</h3>
          {users && (
            <ul className="user__list">
              {users.map(item => (
                <li key={item._id} className="user__item">
                  <div className="user__body">
                    <img
                      src={item.avatar ? item.avatar : defaultAvatar}
                      alt={item.name}
                      className="user__img"
                    />
                    <div>
                      <p>name - {item.name}</p>
                      <p>email - {item.email}</p>
                      <p>created - {new Date(item.created).toDateString()}</p>
                      {item.updated && (
                        <p>updated - {new Date(item.updated).toDateString()}</p>
                      )}
                    </div>
                  </div>
                  <Link
                    className="btn btn-raised btn-primary"
                    to={`/users/${item._id}`}
                  >
                    Profile
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
