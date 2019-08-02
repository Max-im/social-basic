import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { onCreatePost } from "../../store/actions/posts";
import { createPostValidation } from "../../helpers/validation";

export class CreatePost extends Component {
  state = { title: "", body: "", photo: null, error: null };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onUploadPhoto(e) {
    this.setState({ photo: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();
    const satState = this.setState.bind(this);

    //   validate
    const isErr = createPostValidation(satState, this.state);
    if (isErr) return;

    const { userId } = this.props.match.params;
    const { title, body, photo } = this.state;
    this.props.onCreatePost(userId, { title, body, photo }, satState);
  }

  static propTypes = {
    onCreatePost: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <h5 className="mb-3 mt-3">Create new Post</h5>

        {this.state.error && (
          <p className="alert alert-danger">{this.state.error}</p>
        )}

        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-goup">
            <label className="text-muted">
              Picture
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={this.onUploadPhoto.bind(this)}
              />
            </label>
          </div>
          <div className="form-goup">
            <label className="text-muted">
              Title
              <input
                type="text"
                className="form-control"
                value={this.state.title}
                name="title"
                onChange={this.onChange.bind(this)}
              />
            </label>
          </div>
          <div className="form-goup">
            <label className="text-muted">
              Body
              <textarea
                className="form-control"
                value={this.state.body}
                name="body"
                onChange={this.onChange.bind(this)}
              />
            </label>
          </div>
          <button type="submit" className="btn btn-raised btn-primary mt-3">
            Create
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { onCreatePost }
)(withRouter(CreatePost));
