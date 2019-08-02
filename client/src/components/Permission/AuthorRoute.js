import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthorRoute = ({ component: Component, auth, posts, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuth && posts.post && posts.post.author._id === auth.user._id ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

AuthorRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(mapStateToProps)(AuthorRoute);
