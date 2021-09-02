import React from 'react';
import DialogItem from './dialog-item/dialog-item';
import MessageItem from './message-item/message-item';
import s from './dialogs.module.css';
import AddMessageForm, { AddMessageFormValues } from "./dialog-form/add-message-form";
import { InitialStateType } from '../../redux/dialogs-reducer';

type Props = {
  dialogsPage: InitialStateType;
  sendMessage: (messageText: string) => void;
}


const Dialogs: React.FC<Props> = (props) => {
  const {dialogsData, messagesData} = props.dialogsPage;

  const dialogElements = dialogsData.map(dialog => (
    <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>
  ));

  const messages = messagesData.map(message => (
    <MessageItem key={message.id}text={message.messageText}/>
  ))

  const addNewMessage = (values: AddMessageFormValues) => {
    props.sendMessage(values.newMessageBody);
  }
  return (
    <div className={s.dialogsWrapper}>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          {dialogElements}
        </div>
        <div className={s.dialogsMessages}>
          {messages}
          <AddMessageForm onSubmit={addNewMessage}/>
        </div>

      </div>
    </div>

  )
}



export default Dialogs;