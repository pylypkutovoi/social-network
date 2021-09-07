import React, {Component} from 'react';
import Users from './users';
import {connect} from 'react-redux';

import {
  FilterType,
  follow, requestUsers,
  unfollow,
} from '../../redux/users-reducer';
import Spinner from '../common/spinner/spinner';
import {
  getCurrentPage,
  getIsFollowing,
  getIsLoading,
  getPageSize,
  getTotalUsersCount, getUsers, getUsersFilter,
} from "../../redux/users-selectors";
import { UserType } from '../../types/types';
import { AppState } from '../../redux/redux-store';

type MapStateToPropsType= {
  currentPage: number;
  pageSize: number;
  filter: FilterType;
  isLoading: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  isFollowing: Array<number>;

}

type MapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}

type Props = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends Component<Props>{
  componentDidMount() {
    const {currentPage, pageSize, filter} = this.props;
    this.props.requestUsers(currentPage, pageSize, filter)

  }
  onPageChange = (pageNumber: number) => {
    const {pageSize, filter} = this.props;
    this.props.requestUsers(pageNumber, pageSize, filter)
  }

  onFilterChange = (filter: FilterType) => {
    const {pageSize} = this.props;
    this.props.requestUsers(1, pageSize, filter)
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
          onPageChange={this.onPageChange}
          onFilterChange={this.onFilterChange}
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
    filter: getUsersFilter(state),
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