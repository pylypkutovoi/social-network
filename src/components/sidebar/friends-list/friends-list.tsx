import React from 'react';
import s from './friends.module.css';
import {connect} from "react-redux";
import { AppState } from '../../../redux/redux-store';
type PropsType = {
  friendsData: Array<{id: number, name: string}>
}
const FriendsList: React.FC<PropsType> = (props) => {

  const friends = props.friendsData.map(friend => {
    return <li>{friend.name}</li>
  })

  return (
    <ul className={s.friendsList}>
      {friends}
    </ul>
  );
}
const mapStateToProps = (state: AppState) => {
  return {
    friendsData: state.sidebar.friendsData
  }
};


export default connect(mapStateToProps, null)(FriendsList);