import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleUser } from "../store/actions/users";

export class SingleUser extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params;
    if (!this.props.users.user) this.props.getSingleUser(userId);
  }

  static propTypes = {
    getSingleUser: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
  };

  render() {
    const { error, user } = this.props.users;
    return (
      <div>
        <div className="container">
          <h3>Single User</h3>

          {error && <p>{error}</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getSingleUser }
)(withRouter(SingleUser));
