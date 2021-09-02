import React from 'react';
import s from '../dialogs.module.css';

type PropsType = {
  text: string;
}

const MessageItem: React.FC<PropsType> = (props) => {
  return (
    <div className={s.message} >
      {props.text}
    </div>
  );
};

export default MessageItem;