import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../store/actions/users";

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
                  <p>name - {item.name}</p>
                  <p>email - {item.email}</p>
                  <p>created - {item.created}</p>
                  {item.updated && <p>updated - {item.updated}</p>}
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
