import {Redirect} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import { AppState } from '../../redux/redux-store';

type MapStateToPropsType = {
  isAuth: boolean;
}
const mapStateToProps= (state: AppState) => ({
  isAuth: state.auth.isAuth
});

export const withAuthRedirect = (WrappedComponent: React.ComponentType) => {


  const RedirectComponent: React.FC<MapStateToPropsType> =  (props) => {
    const {isAuth, ...restProps} = props;
    if (!isAuth) return <Redirect to="/login"/>

    return <WrappedComponent {...restProps}/>;
  }

  return connect(mapStateToProps)(RedirectComponent)
}

