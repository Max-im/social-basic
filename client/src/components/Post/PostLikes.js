import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  onLike,
  onUnlike,
  toggleLike,
  toggleUnlike
} from "../../store/actions/posts";

export class PostLikes extends Component {
  clickLike() {
    const { postId } = this.props.match.params;
    const { _id: userId } = this.props.auth.user;
    const theUser = this.props.posts.post.likes.find(item => item === userId);
    if (theUser) this.props.toggleLike(postId, userId);
    else this.props.onLike(postId, userId);
  }
  clickUnlike() {
    const { postId } = this.props.match.params;
    const { _id: userId } = this.props.auth.user;
    const theUser = this.props.posts.post.unlikes.find(item => item === userId);
    if (theUser) this.props.toggleUnlike(postId, userId);
    else this.props.onUnlike(postId, userId);
  }

  static propTypes = {
    onLike: PropTypes.func.isRequired,
    toggleLike: PropTypes.func.isRequired,
    toggleUnlike: PropTypes.func.isRequired,
    onUnlike: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuth } = this.props.auth;
    const { post } = this.props.posts;
    return (
      <div className="row">
        {isAuth && (
          <div className="col-md-12">
            <h3 className="mb-5 mt-5">Likes</h3>
            <div className="row">
              <div className="col-md-2">
                <p>Likes - {post.likes.length}</p>
                <button
                  className="btn btn-success btn-raised"
                  onClick={this.clickLike.bind(this)}
                >
                  Like
                </button>
              </div>
              <div className="col-md-2">
                <p>Unlikes - {post.unlikes.length}</p>
                <button
                  className="btn btn-warning btn-raised"
                  onClick={this.clickUnlike.bind(this)}
                >
                  Unlike
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { onLike, onUnlike, toggleLike, toggleUnlike }
)(withRouter(PostLikes));
