import React, {useState} from 'react';
import styles from './profile-info.module.css';
import Spinner from '../../common/spinner/spinner';
import userPlaceholder from '../../../assets/images/placeholder.jpg'
//import ProfileStatus from './profile-status';
import ProfileStatusHooks from "./profile-status-hooks";
import ProfileDataForm from "./profile-data-form";

const ProfileInfo = ({ isOwner, profile, status, updateUserStatus, saveUserPhoto, saveUserProfile}) => {
  const [editMode, setEditMode] = useState(false);
  const activateEditMode = () => setEditMode(true);
  const onPhotoSelected = (e) => {
    if (e.target.files.length) {
      saveUserPhoto(e.target.files[0]);
    }
  }
  const saveProfileInfo = (formData) => {
    saveUserProfile(formData)
      .then(() => setEditMode(false));
  }

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
            src={profile.photos.large || userPlaceholder}
            alt=""
          />
          <div>
            {isOwner && <input type={"file"} onChange={onPhotoSelected}/>}
          </div>
        </div>

        <div className={styles.profileDescription}>

          <ProfileStatusHooks status={status} updateUserStatus={updateUserStatus}/>
          {
            editMode
            ? <ProfileDataForm onSubmit={saveProfileInfo} initialValues={profile} profile={profile}/>
            : <ProfileData
                profile={profile} isOwner={isOwner} activateEditMode={activateEditMode}/>
          }

        </div>

      </div>
    </div>
  )
}
const ProfileData = ({profile, isOwner, activateEditMode}) => {
  return (
    <div>
      {isOwner && <button onClick={activateEditMode}>Edit profile</button>}
      <div>
        <span> Full name:</span> {profile.fullName}
      </div>
      <div>
        Looking for a job: {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob &&
      <div>
        My professional skills:
        {profile.lookingForAJobDescription}
      </div>}
      <div>
        About me:
        {profile.aboutMe}
      </div>
      <div>
        Contacts: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
      })}
      </div>
    </div>
  );
}


const Contact = ({contactTitle, contactValue}) => {
  return <div>{contactTitle}: {contactValue}</div>
}
export default ProfileInfo;