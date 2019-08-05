import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getSinglePost, onDeletePost } from "../../store/actions/posts";
import defaultImg from "../../assets/post.png";
import PostLikes from "./PostLikes";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";

export class SinglePost extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.getSinglePost(postId);
  }

  deletePost(id) {
    if (!window.confirm("Are you sure?")) return;
    this.props.onDeletePost(id, this.props.history);
  }

  static propTypes = {
    posts: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getSinglePost: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired
  };

  render() {
    const { post } = this.props.posts;
    const { user, isAuth } = this.props.auth;

    return (
      <div>
        {post && (
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img
                  className="singlePost__img"
                  src={
                    post.customPhoto ? `/posts/photo/${post._id}` : defaultImg
                  }
                  alt="post"
                />
              </div>
              <div className="col-md-6">
                <h4>{post.title}</h4>
                <p>{post.body}</p>
                {post.author && (
                  <Link to={`/users/${post.author._id}`}>
                    Author - {post.author.name}
                  </Link>
                )}
                <p>Created - {new Date(post.created).toDateString()}</p>
                {post.updated && (
                  <p>Updated - {new Date(post.updated).toDateString()}</p>
                )}
                {isAuth && post.author && user._id === post.author._id && (
                  <>
                    <Link
                      className="btn btn-warning btn-raised"
                      to={`/posts/edit/${post._id}`}
                    >
                      Edit Post
                    </Link>
                    <button
                      className="btn btn-danger btn-raised"
                      onClick={this.deletePost.bind(this, post._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            <PostLikes />
            <AddComment />
            <CommentsList />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getSinglePost, onDeletePost }
)(withRouter(SinglePost));
