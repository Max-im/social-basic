import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import defaultAvatar from "../../assets/avatar.png";

export class ProfileInfo extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props.users;
    return (
      <div className="col-md-6">
        <img
          src={user.customPhoto ? `/user/photo/${user._id}` : defaultAvatar}
          alt={user.name}
          className="profile__img img-thumbnail"
        />
        <p>Hello {user.name}</p>
        <p>{user.email}</p>
        <p>{user.about}</p>
        <p>Created {new Date(user.created).toDateString()}</p>
        {user.updated && <p>Updated {new Date(user.updated).toDateString()}</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  {}
)(ProfileInfo);
