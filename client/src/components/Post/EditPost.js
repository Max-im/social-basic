import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createPostValidation } from "../../helpers/validation";
import defaultImg from "../../assets/post.png";
import { getSinglePost, updatePost } from "../../store/actions/posts";

export class EditPost extends Component {
  state = { title: "", body: "", photo: null, error: null };

  componentDidMount() {
    const { postId } = this.props.match.params;
    if (!this.props.posts.post) this.props.getSinglePost(postId);
    else {
      const { title, body } = this.props.posts.post;
      this.setState({ title, body });
    }
  }

  componentDidUpdate(prev) {
    const { post } = this.props.posts;
    const { post: prevPost } = prev.posts;
    if (!prevPost && post) {
      const { title, body } = this.props.posts.post;
      this.setState({ title, body });
    }
  }

  onUploadPhoto(e) {
    this.setState({ photo: e.target.files[0] });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { postId } = this.props.match.params;
    const { history } = this.props;
    const { photo, body, title } = this.state;
    const setState = this.setState.bind(this);

    const isErr = createPostValidation(setState, this.state);
    if (isErr) return;

    this.props.updatePost(postId, { photo, body, title }, history, setState);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    getSinglePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired
  };

  render() {
    const { post } = this.props.posts;
    const { user: authUser } = this.props.auth;

    return (
      <div>
        {post && post.author._id === authUser._id && (
          <div className="container">
            <h3 className="mt-5 mb-5">Edit Post</h3>

            {this.state.error && (
              <p className="alert alert-danger">{this.state.error}</p>
            )}

            <img
              src={post.customPhoto ? `/posts/photo/${post._id}` : defaultImg}
              alt="post"
              className="profile__img img-thumbnail"
            />

            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="form-goup">
                <label className="text-muted">
                  Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={this.onUploadPhoto.bind(this)}
                  />
                </label>
              </div>

              <div className="form-goup">
                <label className="text-muted">
                  Title
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChange.bind(this)}
                  />
                </label>
              </div>

              <div className="form-goup">
                <label className="text-muted">
                  Body
                  <textarea
                    name="body"
                    className="form-control"
                    value={this.state.body}
                    onChange={this.onChange.bind(this)}
                  />
                </label>
              </div>

              <button type="submit" className="btn btn-raised btn-primary mt-3">
                Edit
              </button>
            </form>
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
  { getSinglePost, updatePost }
)(withRouter(EditPost));
