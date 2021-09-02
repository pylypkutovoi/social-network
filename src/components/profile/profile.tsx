import React from 'react';
import MyPostsContainer from './my-posts/my-posts-container';
import ProfileInfo from './profile-info/profile-info';
import {ProfileType} from './../../types/types'

type PropsType = {
  isOwner: boolean;
  profile: ProfileType | null;
  status: string;
  updateUserStatus: (status: string) => void;
  saveUserPhoto: (file: File) => void;
  saveUserProfile: (profile: ProfileType) => Promise<any>

}
const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        saveUserPhoto={props.saveUserPhoto}
        saveUserProfile={props.saveUserProfile}
      />
      <MyPostsContainer />
    </div>
  )
}

export default Profile;