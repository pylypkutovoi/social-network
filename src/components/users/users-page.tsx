import React from 'react';
import {Users} from './users';
import {useSelector} from 'react-redux';
import Spinner from '../common/spinner/spinner';
import {getIsLoading} from "../../redux/users-selectors";

export const UsersPage: React.FC<{}> = () => {

  const isLoading = useSelector(getIsLoading)
  return (
    <>
      {isLoading ? <Spinner/> : null}
      <Users/>
  </>)
}