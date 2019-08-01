import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, withRouter, Link } from "react-router-dom";
import { getUserProfile, onDeleteUser } from "../store/actions/users";
import defaultAvatar from "../assets/avatar.png";
import FollowProfile from "./FollowProfile";
import FollowersList from "./FollowersList";

export class Profile extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params;
    if (!this.props.auth.user.user) this.props.getUserProfile(userId);
  }

  componentDidUpdate(prev) {
    const { userId } = this.props.match.params;
    const { userId: prevUserId } = prev.match.params;
    if (userId !== prevUserId) this.props.getUserProfile(userId);
  }

  onDeleteProfile() {
    const { userId } = this.props.match.params;
    const { history } = this.props;
    if (!window.confirm("Are you sure?")) return;
    this.props.onDeleteUser(userId, history);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired
  };

  render() {
    const { isAuth, user: authUser } = this.props.auth;
    const { user } = this.props.users;
    return (
      <div>
        {!isAuth && <Redirect to="/login" />}

        <div className="container">
          <h3 className="mb-5 mt-5">Profile</h3>
          {user && (
            <div className="row">
              <div className="col-md-6">
                <img
                  src={
                    user.customPhoto ? `/user/photo/${user._id}` : defaultAvatar
                  }
                  alt={user.name}
                  className="profile__img img-thumbnail"
                />
                <p>Hello {user.name}</p>
                <p>{user.email}</p>
                <p>{user.about}</p>
                <p>Created {new Date(user.created).toDateString()}</p>
                {user.updated && (
                  <p>Updated {new Date(user.updated).toDateString()}</p>
                )}
              </div>
              {authUser._id === user._id && (
                <div className="col-md-6">
                  <Link
                    to={`/users/edit/${user._id}`}
                    className="btn btn-raised btn-success mr-5"
                  >
                    Edit
                  </Link>
                  <p
                    className="btn btn-raised btn-danger mr-5"
                    onClick={this.onDeleteProfile.bind(this)}
                  >
                    Delete
                  </p>
                </div>
              )}
              {authUser._id !== user._id && <FollowProfile />}
              <FollowersList />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUserProfile, onDeleteUser }
)(withRouter(Profile));
