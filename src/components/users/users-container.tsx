import React, {Component} from 'react';
import Users from './users';
import { connect, ConnectedProps } from 'react-redux';

import {
  follow, requestUsers,
  unfollow,
} from '../../redux/users-reducer';
import Spinner from '../common/spinner/spinner';
import {
  getCurrentPage,
  getIsFollowing,
  getIsLoading,
  getPageSize,
  getTotalUsersCount, getUsers,
} from "../../redux/users-selectors";
import { UserType } from '../../types/types';
import { AppState } from '../../redux/redux-store';

type MapStateToPropsType= {
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  isFollowing: Array<number>;

}

type MapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  requestUsers: (currentPage: number, pageSize: number) => void
}

type Props = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends Component<Props>{
  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.requestUsers(currentPage, pageSize)

  }
  onPageChanged = (pageNumber: number) => {
    const {pageSize} = this.props;
    this.props.requestUsers(pageNumber, pageSize)
  }

  render() {
    return (
      <>
        {this.props.isLoading ? <Spinner/> : null}
        <Users
          users={this.props.users}
          pageSize={this.props.pageSize}
          totalUsersCount={this.props.totalUsersCount}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          isFollowing={this.props.isFollowing}
        />
    </>)
  }
}

const mapStateToProps = (state: AppState): MapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isLoading: getIsLoading(state),
    isFollowing: getIsFollowing(state)
  }

}

const mapDispatchToProps  = {
  follow,
  unfollow,
  requestUsers
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {},AppState>(mapStateToProps, mapDispatchToProps)(UsersContainer);