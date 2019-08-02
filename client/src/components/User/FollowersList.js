import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/avatar.png";

export class FollowersList extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props.users;
    return (
      <div>
        {user.followers.length > 0 && (
          <>
            <p>Followers - {user.followers.length}</p>
            <ul className="follower__list">
              {user.followers.map(item => (
                <li key={item._id} className="follower__item">
                  <Link to={`/users/${item._id}`}>
                    <img
                      className="follower__photo"
                      src={
                        item.customPhoto
                          ? `/user/photo/${item._id}`
                          : defaultAvatar
                      }
                      alt={item.name}
                    />
                    <p className="follower__name">{item.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {user.following.length > 0 && (
          <>
            <p>Followers - {user.following.length}</p>
            <ul className="follower__list">
              {user.following.map(item => (
                <li key={item._id} className="follower__item">
                  <Link to={`/users/${item._id}`}>
                    <img
                      className="follower__photo"
                      src={
                        item.customPhoto
                          ? `/user/photo/${item._id}`
                          : defaultAvatar
                      }
                      alt={item.name}
                    />
                    <p className="follower__name">{item.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(FollowersList);
