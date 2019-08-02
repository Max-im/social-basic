import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import ProfileControl from "./ProfileControl";
import FollowProfile from "./FollowProfile";
import FollowersList from "./FollowersList";
import UserPosts from "../Post/UserPosts";
import CreatePost from "../Post/CreatePost";
import { getUserProfile } from "../../store/actions/users";

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

  static propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired
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
            <>
              <div className="row">
                <ProfileInfo />
                {authUser._id === user._id && (
                  <div className="col-md-6">
                    <ProfileControl />
                    <CreatePost />
                  </div>
                )}
                {authUser._id !== user._id && <FollowProfile />}
                <FollowersList />
              </div>
              <div className="row">
                <UserPosts />
              </div>
            </>
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
  { getUserProfile }
)(withRouter(Profile));
