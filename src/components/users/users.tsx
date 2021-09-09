import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import queryString from 'query-string';
import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer';
import { getCurrentPage, getIsFollowing, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors';
import Paginator from "../common/paginator/paginator";
import User from "./user";
import UsersSearchForm from './users-search-form';
type QueryParamsType = {term?: string, page?: string, friend?: string}
export const Users: React.FC<{}> = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter)
  const isFollowing = useSelector(getIsFollowing)

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    
    const parsed = queryString.parse(history.location.search, {parseBooleans: true}) as QueryParamsType
    let actualPage = currentPage;
    let actualFilter = filter;

    if (parsed.page) actualPage = Number(parsed.page);
    if (parsed.term) actualFilter = {...actualFilter, term: parsed.term};

    switch (parsed.friend) {
      case 'null':
        actualFilter = {...actualFilter, friend: null};
        break;
      case 'true':
        actualFilter = {...actualFilter, friend: true};
        break;
      case 'false':
        actualFilter = {...actualFilter, friend: false};
        break;
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, [])

  useEffect(() => {
    const query: QueryParamsType = {}
    if (filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)
    history.push({
      pathname: '/users', 
      search: queryString.stringify(query)
    })
    
  }, [filter, currentPage]);

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
