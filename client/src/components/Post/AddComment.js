import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addComment } from "../../store/actions/posts";

export class AddComment extends Component {
  state = { text: "" };

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { postId } = this.props.match.params;
    const { _id: userId } = this.props.auth.user;
    this.props.addComment(postId, userId, this.state.text);
    this.setState({ text: "" });
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired
  };

  render() {
    const { isAuth } = this.props.auth;
    return (
      <div className="row">
        {isAuth && (
          <div className="col-md-12">
            <h3 className="mt-5 mb-5">Add Comment</h3>
            <form onSubmit={this.onSubmit.bind(this)}>
              <div>
                <textarea
                  value={this.state.text}
                  cols="100"
                  rows="10"
                  onChange={this.onChange.bind(this)}
                />
              </div>
              <button className="btn btn-primary btn-raised" type="submit">
                Add Comment
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment }
)(withRouter(AddComment));
