import React from 'react';
import s from '../dialogs.module.css';
import {NavLink} from 'react-router-dom';

type PropsType = {
  id: number;
  name: string;
}

const DialogItem: React.FC<PropsType> = (props) => {
  const {name, id} = props;
  return (
    <div className={s.dialog}>
      <NavLink to={"/dialogs/" + id}>{name}</NavLink>
    </div>
  );
};

export default DialogItem;