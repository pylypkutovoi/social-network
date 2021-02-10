import React from 'react'
import styles from './header.module.css';
import {NavLink} from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerRaw}>
        <a href="/">
          <img src="https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg" alt="header_logo" />
        </a>

        <div>
          { props.isAuth
            ? <div>{props.login} - <button onClick={props.logout}>Sing out</button></div>
            : <NavLink to={'/login'}>Sing in</NavLink> }
        </div>
      </div>


    </header>
  )

}

export default Header;