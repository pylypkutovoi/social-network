import React from 'react';
import s from './friends.module.css';
import {connect} from "react-redux";

const FriendsList = (props) => {

  const friends = props.friendsData.map(friend => {
    return <li>{friend.name}</li>
  })

  return (
    <ul className={s.friendsList}>
      {friends}
    </ul>
  );
}
const mapStateToProps = (state) => {
  return {
    friendsData: state.sidebar.friendsData
  }
};


export default connect(mapStateToProps, null)(FriendsList);