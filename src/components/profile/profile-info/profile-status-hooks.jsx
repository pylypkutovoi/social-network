import React, {useEffect, useState} from 'react';

const ProfileStatusHooks = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  const activateEditMode = () => setEditMode(true);
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status)
  }

  const onStatusChange = (e) => setStatus(e.currentTarget.value);

  useEffect(() => {
    setStatus(props.status)
  }, [props.status]);

  return (
    <div>
      {
        editMode === false
          ?
          <div>
            <span onDoubleClick={activateEditMode}>{props.status || 'изменить статус'}</span>
          </div>
          :
          <div>
            <input
              onChange={onStatusChange}
              autoFocus={true}
              onBlur={deactivateEditMode}
              value={status}
              />
          </div>
      }
    </div>

  )
}


export default ProfileStatusHooks;