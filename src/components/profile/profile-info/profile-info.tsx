import React, {ChangeEvent, useState} from 'react';
import styles from './profile-info.module.css';
import Spinner from '../../common/spinner/spinner';
import userPlaceholder from '../../../assets/images/placeholder.jpg'
//import ProfileStatus from './profile-status';
import ProfileStatusHooks from "./profile-status-hooks";
import ProfileDataForm from "./profile-data-form";
import { ContactsType, ProfileType } from '../../../types/types';

type PropsType = {
  isOwner: boolean;
  profile: ProfileType | null;
  status: string;
  updateUserStatus: (status: string) => void;
  saveUserPhoto: (file: File) => void;
  saveUserProfile: (formData: ProfileType) => Promise<void>;
}

const ProfileInfo: React.FC<PropsType> = ({ isOwner, profile, status, updateUserStatus, saveUserPhoto, saveUserProfile}) => {
  const [editMode, setEditMode] = useState(false);
  const activateEditMode = () => setEditMode(true);
  const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      saveUserPhoto(e.target.files[0]);
    }
  }
  const saveProfileInfo = (formData: ProfileType) => {
    // todo: remove then
    saveUserProfile(formData)
      .then(() => setEditMode(false))
      .catch(error => {
        alert(error);
      })
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

type ProfileDataPropsType = {
  profile: ProfileType;
  isOwner: boolean;
  activateEditMode: () => void;
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, activateEditMode}) => {
  const getContacts = (contacts: ContactsType) => {
    return Object.keys(contacts).map(key => {
      return <Contact key={key} contactTitle={key} contactValue={contacts[key as keyof ContactsType]}/>
    })
  }
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
        Contacts: {getContacts(profile.contacts)}
      </div>
    </div>
  );
}

type ContactPropsType = {
  contactTitle: string;
  contactValue: string;
}
const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
  return <div>{contactTitle}: {contactValue}</div>
}
export default ProfileInfo;