import React from 'react'
import s from './header.module.css';
import {Link} from 'react-router-dom';
import { Layout, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLogin, selectIsAuth } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';

const { Header} = Layout;

export const AppHeader: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectUserLogin);

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  }
  return (
    <Header className={s.header} style={{background: "#6babe8"}}>
      <div className={s.logo}>
        <Link to={'/'}>
          <img src="https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg" alt="header_logo" />
        </Link>
      </div>

      <div>
        {isAuth
          ? <div><span className={s.userLogin}>{login}</span> - <Button onClick={onLogout}>Sing out</Button></div>
          : <Link to={'/login'}><Button>Sing in</Button></Link>}
      </div>
    </Header>
  )

}