import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './TeamMember.css';
// import * as userActions from '../Actions/userActions';
class TeamMember extends React.Component {
  render() {
    const {
      team,
      // userClicked,
      history
    } = this.props;

    // console.log(history.location.pathname);
    const n = history.location.pathname.slice(6);
    // console.log(n);

    switch (n) {
      case '1':
        return (
          <div className="profile">
            <p>{team.one.firstname} {team.one.lastname}</p>
            <p>{team.one.role}</p>
            <p>{team.one.about}</p>
            <hr />
            <Link to="/team">Back to our team page.</Link>
          </div>
        );
      case '2':
        return (
          <div className="profile">
            <p>{team.two.firstname} {team.two.lastname}</p>
            <p>{team.two.role}</p>
            <p>{team.two.about}</p>
            <hr />
            <Link to="/team">Back to our team page.</Link>
          </div>
        );
      case '3':
        return (
          <div className="profile">
            <p>{team.three.firstname} {team.three.lastname}</p>
            <p>{team.three.role}</p>
            <p>{team.three.about}</p>
            <hr />
            <Link to="/team">Back to our team page.</Link>
          </div>
        );
      case '4':
        return (
          <div className="profile">
            <p>{team.four.firstname} {team.four.lastname}</p>
            <p>{team.four.role}</p>
            <p>{team.four.about}</p>
            <hr />
            <Link to="/team">Back to our team page.</Link>
          </div>
        );
      case '5':
        return (
          <div className="profile">
            <p>{team.five.firstname} {team.five.lastname}</p>
            <p>{team.five.role}</p>
            <p>{team.five.about}</p>
            <hr />
            <Link to="/team">Back to our team page.</Link>
          </div>
        );
      case '6':
        return (
          <div className="profile">
            <p>{team.six.firstname} {team.six.lastname}</p>
            <p>{team.six.role}</p>
            <p>{team.six.about}</p>
            <hr />
            <Link to="/team">Back to our team page.</Link>
          </div>
        );
      default:
        return (
          <div>
            <p>oops no such user</p>
            <hr />
            <Link to="/team">Back to our team page.</Link>
          </div>
        );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    // userClicked: state.teamReducer.userClicked,
    team: state.teamReducer.team
  };
};

// const mapDispatchToProps = (dispatch) => {
// return {
// fetchUser: (id) => dispatch(userActions.fetchUser(id))
// };
// };
export default connect(mapStateToProps)(TeamMember);
