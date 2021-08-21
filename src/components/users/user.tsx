import React from 'react';
import styles from './users.module.css';
import {NavLink} from 'react-router-dom'
import userPlaceholder from '../../assets/images/placeholder.jpg';
import { UserType } from '../../types/types';

type PropsType = {
  user: UserType
  isFollowing: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
}

const User: React.FC<PropsType> = ({user, isFollowing, follow, unfollow}) => {
  return (
    <div>
        <span>
          <div>
            <NavLink to={"/profile/" +user.id}>
              <img
                src={user.photos.small !== null ? user.photos.small : userPlaceholder}
                className={styles.userPhoto} alt="profilePhoto"
              />
            </NavLink>

          </div>
          <div>
            {
              user.followed
                ? <button
                  disabled={isFollowing.some(id => id === user.id)}
                  onClick={() => {
                  unfollow(user.id)
                } }>Unfollow</button>
                : <button
                  disabled={isFollowing.some(id => id === user.id)}
                  onClick={() => {
                  follow(user.id)
                } }>Follow</button>
            }

          </div>
        </span>
          <span>
          <span>
            <div>{user.name}</div>
            <div>{user.status}</div>
          </span>
          <span>
            <div>{"user.location.country"}</div>
            <div>{"user.location.city"}</div>

          </span>
        </span>
    </div>

    )

}

export default User;