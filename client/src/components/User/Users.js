import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../store/actions/users";
import UserCard from "./UserCard";

export class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
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
                <UserCard item={item} key={item._id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
