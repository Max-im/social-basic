import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/post.png";

export class PostItem extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;
    return (
      <li className="postItem">
        <div className="postItem__content">
          <img
            className="postItem__img img-thumbnail"
            src={item.customPhoto ? `/posts/photo/${item._id}` : defaultImg}
            alt="post"
          />
          <div className="postItem__wrapper">
            <h5 className="postItem__title">{item.title}</h5>
            <p className="postItem__body">{item.body}</p>
            {item.author && (
              <Link
                className="postItem__author"
                to={`/users/${item.author._id}`}
              >
                By {item.author.name}
              </Link>
            )}
            <Link
              className="btn btn-success btn-raised"
              to={`/posts/${item._id}`}
            >
              More
            </Link>
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PostItem);
