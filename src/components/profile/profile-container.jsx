import React, {Component} from 'react'
import Profile from './profile';
import { connect } from 'react-redux';
import {getUserProfile, getUserStatus, saveUserPhoto, updateUserStatus} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../hoc/with-auth-redirect';
import {compose} from 'redux';



class ProfileContainer extends Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.myUserId;
      if (!userId) {
        this.props.history.push("/login")
      }
    }
    if (userId) {
      this.props.getUserStatus(userId);
      this.props.getUserProfile(userId);
    }
  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.userId !== this.props.match.params.userId)
    this.refreshProfile();
  }

  render() {
    return <Profile
      { ...this.props }
      isOwner={!this.props.match.params.userId}
      profile={this.props.profile}
      status={this.props.status}
      updateUserStatus={this.props.updateUserStatus}
      saveUserPhoto={this.props.saveUserPhoto}
    />;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  }
};

const mapDispatchToProps = {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  saveUserPhoto
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  //withAuthRedirect
)(ProfileContainer)

