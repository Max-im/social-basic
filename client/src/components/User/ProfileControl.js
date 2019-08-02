import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onDeleteUser } from "../../store/actions/users";

export class ProfileControl extends Component {
  onDeleteProfile() {
    const { userId } = this.props.match.params;
    const { history } = this.props;
    if (!window.confirm("Are you sure?")) return;
    this.props.onDeleteUser(userId, history);
  }

  static propTypes = {
    users: PropTypes.object.isRequired,
    onDeleteUser: PropTypes.func.isRequired
  };

  render() {
    const { user } = this.props.users;
    return (
      <div>
        <Link
          to={`/users/edit/${user._id}`}
          className="btn btn-raised btn-success mr-5"
        >
          Edit
        </Link>
        <p
          className="btn btn-raised btn-danger mr-5"
          onClick={this.onDeleteProfile.bind(this)}
        >
          Delete
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { onDeleteUser }
)(ProfileControl);
