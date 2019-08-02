import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { onFollow, unFollow } from "../../store/actions/users";

export class FollowProfile extends Component {
  state = { error: null };

  toggleFollow(bool) {
    const { userId: followId } = this.props.match.params;
    const { _id: userId } = this.props.auth.user;
    if (bool) this.props.onFollow(userId, followId, this.setState.bind(this));
    else this.props.unFollow(userId, followId, this.setState.bind(this));
  }

  static propTypes = {
    unFollow: PropTypes.func.isRequired,
    onFollow: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props.users;
    const { _id: authId } = this.props.auth.user;
    const isFollow = user.followers.find(item => item._id === authId);

    return (
      <div>
        {!isFollow && (
          <button
            className="btn btn-success btn-raised mt-5"
            onClick={this.toggleFollow.bind(this, true)}
          >
            Follow
          </button>
        )}
        {isFollow && (
          <button
            className="btn btn-warning btn-raised mt-5"
            onClick={this.toggleFollow.bind(this, false)}
          >
            Unfollow
          </button>
        )}
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
  { onFollow, unFollow }
)(withRouter(FollowProfile));
