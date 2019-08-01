import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../store/actions/posts";

export class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  static propTypes = {
    posts: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
  };

  render() {
    const { posts } = this.props.posts;
    return (
      <div>
        <div className="container">
          <h3>Posts</h3>
          {posts && (
            <ul className="post__list">
              {posts.map(item => (
                <li key={item._id} className="post__item">
                  <h5>{item.title}</h5>
                  <p>{item.body}</p>
                  {item.author && (
                    <Link to={`/users/${item.author._id}`}>
                      author - {item.author.name}
                    </Link>
                  )}
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
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
