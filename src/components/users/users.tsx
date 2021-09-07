import React from 'react';
import { FilterType } from '../../redux/users-reducer';
import { UserType } from '../../types/types';
import Paginator from "../common/paginator/paginator";
import User from "./user";
import UsersSearchForm from './users-search-form';
type Props = {
  currentPage: number;
  pageSize: number;
  totalUsersCount: number;
  users: Array<UserType>;
  isFollowing: Array<number>;
  onPageChange: (pageNumber: number) => void;
  onFilterChange: (filter: FilterType) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;

}

const Users: React.FC<Props> = ({currentPage, onPageChange, onFilterChange, pageSize, totalUsersCount, users, ...props}) => {
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
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
                                isFollowing={props.isFollowing}
                                follow={props.follow}
                                unfollow={props.unfollow}
        /> )
      }
    </div>)

}

export default Users;