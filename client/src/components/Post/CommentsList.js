import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import defaultPhoto from "../../assets/avatar.png";
import { onDeleteComment } from "../../store/actions/posts";

export class CommentsList extends Component {
  onDelete(commentId) {
    const { postId } = this.props.match.params;
    if (!window.confirm("Are you sure?")) return;
    this.props.onDeleteComment(commentId, postId);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func.isRequired
  };

  render() {
    const { comments } = this.props.posts.post;
    const { user } = this.props.auth;
    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="mb-5 mt-5">Comments</h3>
          {comments.length === 0 && <p>There is no comments yet...</p>}
          {comments.length > 0 && (
            <ul>
              {comments.map(item => (
                <li key={item._id} className="comment__item">
                  <img
                    className="comment__img"
                    src={
                      item.author.customPhoto
                        ? `/user/photo/${item.author._id}`
                        : defaultPhoto
                    }
                    alt={item.author.name}
                  />
                  <div>
                    <p className="comment__date">
                      {new Date(item.date).toDateString()}
                    </p>
                    <p className="comment__text">{item.text}</p>
                    {item.author._id === user._id && (
                      <p
                        className="comment__delete"
                        onClick={this.onDelete.bind(this, item._id)}
                      >
                        delete
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
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
  { onDeleteComment }
)(withRouter(CommentsList));
