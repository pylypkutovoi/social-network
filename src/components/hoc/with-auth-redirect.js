import {Redirect} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';

export const withAuthRedirect = (Component) => {

  const mapStateToProps= (state) => ({
    isAuth: state.auth.isAuth
  });

  const RedirectComponent =  (props) => {
    if (!props.isAuth) return <Redirect to="/login"/>

    return <Component {...props}/>;
  }

  return connect(mapStateToProps)(RedirectComponent)
}

