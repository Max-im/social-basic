import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserProfile, onUpdateProfile } from "../../store/actions/users";
import { editProfileValidation } from "../../helpers/validation";
import defaultAvatar from "../../assets/avatar.png";

export class EditProfile extends Component {
  state = { name: "", email: "", photo: null, about: "", error: null };

  componentDidMount() {
    const { userId } = this.props.match.params;
    if (!this.props.users.user) this.props.getUserProfile(userId);
    else {
      const { name, email, about } = this.props.users.user;
      this.setState({ name, email, about });
    }
  }

  componentDidUpdate(prev) {
    const { user } = this.props.users;
    const { user: prevUser } = prev.users;
    if (!prevUser && user) {
      const { name, email, about } = user;
      this.setState({ name, email, about });
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
    const { userId } = this.props.match.params;
    const { history } = this.props;
    const { email, name, photo, about } = this.state;

    const isErr = editProfileValidation(this.setState.bind(this), this.state);
    if (isErr) return;

    this.props.onUpdateProfile(
      userId,
      { email, name, photo, about },
      history,
      this.setState.bind(this)
    );
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    onUpdateProfile: PropTypes.func.isRequired
  };

  render() {
    const { user } = this.props.users;
    const { user: authUser } = this.props.auth;

    return (
      <div>
        {(user && user._id) === authUser._id && (
          <div className="container">
            <h3 className="mt-5 mb-5">Edit Profile</h3>

            {this.state.error && (
              <p className="alert alert-danger">{this.state.error}</p>
            )}
            <img
              src={user.customPhoto ? `/user/photo/${user._id}` : defaultAvatar}
              alt={user.name}
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
                  Name
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChange.bind(this)}
                  />
                </label>
              </div>
              <div className="form-goup">
                <label className="text-muted">
                  About
                  <textarea
                    name="about"
                    className="form-control"
                    value={this.state.about}
                    onChange={this.onChange.bind(this)}
                  />
                </label>
              </div>
              <div className="form-goup">
                <label className="text-muted">
                  Email
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={this.state.email}
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
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUserProfile, onUpdateProfile }
)(withRouter(EditProfile));
