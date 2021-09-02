import React, {Component} from 'react'
import Profile from './profile';
import { connect } from 'react-redux';
import {
  getUserProfile,
  getUserStatus,
  saveUserPhoto,
  saveUserProfile,
  updateUserStatus
} from '../../redux/profile-reducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {compose} from 'redux';
import { AppState } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type MapStateToPropsType = {
  profile: ProfileType | null;
  status: string;
  myUserId: number | null;
  isAuth: boolean;
}
type MapDispatchToPropsType = {
  getUserProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  updateUserStatus: (status: string) => void;
  saveUserPhoto: (file: File) => void;
  saveUserProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
  userId: string;
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<PathParamsType>;


class ProfileContainer extends Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
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
  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
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

const mapStateToProps = (state: AppState) => {
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
  saveUserPhoto,
  saveUserProfile
}
export default compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ProfileContainer)
