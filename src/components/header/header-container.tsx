import React, {Component} from 'react'
import Header, { MapDispatchToPropsType, MapStateToPropsType } from './header';
import {connect} from 'react-redux';
import {logout} from '../../redux/auth-reducer';
import { AppState } from '../../redux/redux-store';

class HeaderContainer extends Component<MapStateToPropsType & MapDispatchToPropsType> {
  render() {
    return <Header {...this.props}/>
  }
}
const mapStateToProps = (state: AppState) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})
const mapDispatchToProps = {
  logout
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppState>(mapStateToProps, mapDispatchToProps)(HeaderContainer);