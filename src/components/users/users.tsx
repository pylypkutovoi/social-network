import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer';
import { getCurrentPage, getIsFollowing, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors';
import Paginator from "../common/paginator/paginator";
import User from "./user";
import UsersSearchForm from './users-search-form';

export const Users: React.FC<{}> = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter)
  const isFollowing = useSelector(getIsFollowing)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, [])

  const onPageChange = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  }

  const onFilterChange = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  }

  const onFollow = (userId: number) => {
    dispatch(follow(userId));
  }
  const onUnfollow = (userId: number) => {
    dispatch(unfollow(userId));
  }
  return (
    <div>
      <UsersSearchForm onFilterChange={onFilterChange}/>
      
      <Paginator
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />

      {
        users.map(user => <User user={user}
                                key={user.id}
                                isFollowing={isFollowing}
                                follow={onFollow}
                                unfollow={onUnfollow}
        /> )
      }
    </div>)

}
