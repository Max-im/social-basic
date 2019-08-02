import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../store/actions/posts";
import PostItem from "./PostItem";

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
                <PostItem key={item._id} item={item} />
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
