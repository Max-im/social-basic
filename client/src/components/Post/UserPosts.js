import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserPosts } from "../../store/actions/posts";
import PostItem from "./PostItem";

export class CreatePost extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.getUserPosts(userId);
  }

  componentDidUpdate(prev) {
    const { userId } = this.props.match.params;
    const { userId: prevUserId } = prev.match.params;
    if (userId !== prevUserId) this.props.getUserPosts(userId);
  }

  static propTypes = {
    getUserPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired
  };

  render() {
    const { userPosts } = this.props.posts;

    return (
      <div className="col-md-12">
        <h5 className="mb-3 mt-3 centred">User Posts</h5>
        {userPosts && (
          <>
            {userPosts.length === 0 && <p>No posts has written yet</p>}
            {userPosts.length > 0 && (
              <>
                <p>
                  The user wrote {userPosts.length}{" "}
                  {userPosts.length === 1 ? "post" : "posts"}
                </p>
                <ul className="userPosts__list">
                  {userPosts.map(item => (
                    <PostItem key={item._id} item={item} />
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getUserPosts }
)(withRouter(CreatePost));
