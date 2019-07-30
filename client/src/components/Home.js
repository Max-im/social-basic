import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getApiData } from "../store/actions/home";

export class Home extends Component {
  componentDidMount() {
    if (!this.props.general.api) this.props.getApiData();
  }

  static propTypes = {
    getApiData: PropTypes.func.isRequired,
    general: PropTypes.object.isRequired
  };

  render() {
    const { api } = this.props.general;
    return (
      <div className="container">
        <h3>Api</h3>
        {api && (
          <table className="api__table" border="1">
            <thead>
              <tr>
                <th>#</th>
                <th>method</th>
                <th>path</th>
                <th>access</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              {api.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.method}</td>
                  <td>{item.path}</td>
                  <td>{item.access}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general
});

export default connect(
  mapStateToProps,
  { getApiData }
)(Home);
