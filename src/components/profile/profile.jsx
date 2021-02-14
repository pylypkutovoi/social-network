import React from 'react';
import MyPostsContainer from './my-posts/my-posts-container';
import ProfileInfo from './profile-info/profile-info';

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        saveUserPhoto={props.saveUserPhoto}
      />
      <MyPostsContainer />
    </div>
  )
}

export default Profile;