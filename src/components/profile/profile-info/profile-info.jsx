import React from 'react';
import styles from './profile-info.module.css';
import Spinner from '../../common/spinner/spinner';
import userPlaceholder from '../../../assets/images/placeholder.jpg'
//import ProfileStatus from './profile-status';
import ProfileStatusHooks from "./profile-status-hooks";

const ProfileInfo = ({ profile, status, updateUserStatus }) => {
  if (!profile) {
    return <Spinner/>
  }
  return (
    <div>
      <div className={styles.content_header}>
        <img src="https://i.pinimg.com/originals/c3/e2/80/c3e28050c6c4ac02ca334ab74592e4f7.png" alt=""/>
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.profileImage}>
          <img
            src={profile.photos.large !== null ?
              profile.photos.large : userPlaceholder}
            alt=""
          />
        </div>
        <div className={styles.profileDescription}>
          <ProfileStatusHooks status={status} updateUserStatus={updateUserStatus}/>
          <div>{profile.fullName}</div>
          <div>{profile.aboutMe}</div>
          <div>Contacts: </div>
          <div>Facebook: {profile.contacts.facebook}</div>
        </div>

      </div>
    </div>
  )
}

export default ProfileInfo;