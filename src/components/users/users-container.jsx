import React, {Component} from 'react';
import Users from './users';
import { connect } from 'react-redux';

import {
  follow, requestUsers,
  setCurrentPage,
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

class UsersContainer extends Component{

  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.requestUsers(currentPage, pageSize)

  }
  onPageChanged = (pageNumber) => {
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

const mapStateToProps = (state) => {
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
  setCurrentPage,
  requestUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);