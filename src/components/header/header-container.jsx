import React, {Component} from 'react'
import Header from './header';
import {connect} from 'react-redux';
import {logout} from '../../redux/auth-reducer';

class HeaderContainer extends Component{
  render() {
    return <Header {...this.props}/>
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})
const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);