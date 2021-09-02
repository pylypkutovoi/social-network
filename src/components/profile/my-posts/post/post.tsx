import React from 'react';
import s from './post.module.css';

type PropsType = {
  message: string;
  count: number;
}

const Post: React.FC<PropsType>= ({message, count}) => {
  return (
    <div className={s.item}>
      <img src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg" alt="avatar" />
      <div>
       {message}
      </div>
      
      <div>
        <span> {count} Likes</span>
      </div>
   
    </div>
  );
}

export default Post;