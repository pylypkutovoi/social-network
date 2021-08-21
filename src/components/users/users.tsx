import React from 'react';
import { UserType } from '../../types/types';
import Paginator from "../common/paginator/paginator";
import User from "./user";
type Props = {
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  pageSize: number;
  totalUsersCount: number;
  users: Array<UserType>;
  isFollowing: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;

}

const Users: React.FC<Props> = ({currentPage, onPageChanged, pageSize, totalUsersCount, users, ...props}) => {
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
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